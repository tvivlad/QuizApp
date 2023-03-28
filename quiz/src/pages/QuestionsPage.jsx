import axios from 'axios';
import React,{useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {Question} from '../components/Question'
import {CompleteButton} from '../components/CompleteButton'

export  function QuestionsPage() {
  const [questions, setQuestions]= useState([]) 
  const [answers, setAnswers] = useState([])
  const params=useParams();  
  const [score, setScore] = useState(0)
  async function  getQuestions(){
    const {data}= await axios.get(`http://localhost:5000/api/question/?quizId=${params.id}`)
    console.log("Полученные с сервера вопросы", data)
    setQuestions(data.questions)
    setAnswers(data.answers)
    // const resAnswers= await axios.get(`http://localhost:5000/getAnswers/?quizId=${params.id}`)
    // console.log("Полученные с сервера вопросы", resAnswers.data)
  }  
  function receiveResult(correctAns){
    if (correctAns)
      setScore(score+1)
    console.log('Промежуточный результат: ', score)
  }

  function onComplete() {
    alert("Поздравляем вы завершили тест!!! Ваш результат : "+ score+ " баллов")
  }

  useEffect(()=>{
    console.log("useEffect в компонент Question")
    getQuestions()
  },[])
  return (
    <div >
        {questions.map((question,  index)=>{
            return <Question question={question} index={index} key={question.id} answerList={answers.filter((answer)=>{
                if (answer.questionId==question.id){
                    console.log(`Варианты ответа на вопрос ${question.id}`, answer.answer)
                    return answer
                }                     
            })} onResult={receiveResult}/>
        })}
        <CompleteButton onComplete={onComplete}/>
    </div>
  )
}
