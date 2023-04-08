import React, { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { getOneQuiz } from '../http/quizAPI'
import classes from '../styles/quizEditPage.module.css'
import EditQuestion from '../components/EditQuestion'
import { addQuestions, getQuestions } from '../http/questionsAPI'
import AddQuestionBtn from '../components/UI/AddQuestionBtn/AddQuestionBtn'


export default function QuizEditPage() {
  const [quizInfo, setQuizInfo] = useState({})
  const [questions, setQuestions]= useState([])
  const [answers, setAnswers] = useState([]) 
  const params=useParams()


  async function getQuizInfo (){
    const resGeneralInfo= await getOneQuiz(params.id)   
    console.log("результат запроса общая инфо:", resGeneralInfo.data) 
    setQuizInfo(resGeneralInfo.data)
  }

  async function getQuestionsInfo(){
    const {data}= await getQuestions(params.id)
    const questionsWithStatus=data.questions.map(question=>{
      question.status='loaded'      
      return question
    })
    const answersWithStatus=data.answers.map(answer=>{
      answer.status='loaded'
      return answer
    })
    setQuestions(questionsWithStatus)
    setAnswers(answersWithStatus)  
  }

  function scrollToEndPage(){
    window.scrollTo(0, document.body.scrollHeight)
  }

  function addNewQuestion() {
    const newId=Date.now()
    const newQuestion= {
      id: newId, 
      text: 'Введите свой вопрос...', 
      imageUrl: null, 
      quizId: params.id, 
      status: 'created',
    }
    setQuestions([...questions, newQuestion])
    console.log('Объект добавлен в массив', questions)    

    //скролим страницу вниз для того чтобы увидеть блок с новым вопросом
    setTimeout(() => {
      scrollToEndPage()
    }, 1000);    
  }

  function deleteQuestion(questionId, event) {
    console.log('удаляем вопрос с id : ', questionId)
    const modifiedQuestions=questions.filter(question=>question.id!==questionId)
    setQuestions(modifiedQuestions)
  }
  
  async function saveQuestion(newQuestion, questionText, answers){

    if (newQuestion.status=='created') {
      newQuestion.text=questionText
      console.log('id вопроса: ', newQuestion, ' текст вопроса: ', questionText ,' Ответы: ',  answers)
      const {data}=await addQuestions({question:newQuestion, answers:answers})
      console.log('Вернувшиеся с сервера данные : ', data)
      
      const modifiedQuestions=questions.map(question=>{
        if (question.id==newQuestion.id) {
            question.status='loaded'
        }
        return question  
      })
      setQuestions(modifiedQuestions)
    }
    
  }

  useEffect(()=>{        
    getQuizInfo()
    getQuestionsInfo()
  },[])
  return (
    <>
      <div className={classes.quizInfo}>
        <div className={classes.quizInfoText}>Название: {quizInfo.name}</div>
        <div className={classes.quizInfoText}>Описание: {quizInfo.description}</div>
        <div className={classes.quizInfoText}>Дата создания: {quizInfo.createDate}</div>
      </div>
      {console.log('Вопросы : ' ,questions)}
      {console.log('Вопросы : ' ,answers)}
      {console.log('TimeStamp :',new Date().valueOf())}
      {<div>
        {questions.map(question=>{         
            return <EditQuestion  question={question} 
                                  key={question.id} 
                                  loadedAnswers={answers.filter(answer=>answer.questionId==question.id)} 
                                  onQuestionDelete={deleteQuestion.bind(null, question.id)}
                                  onSaveQuestion={saveQuestion}
                   />
        })}
      </div>}
      <AddQuestionBtn onClick={addNewQuestion}/>
    </>    
  )
}
