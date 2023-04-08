import React,{useState} from 'react'
import classes from '../styles/quizEditPage.module.css'
import AnswerEditBlock from './AnswerEditBlock'
import AddAnswerBtn from './UI/AddAnswerBtn/AddAnswerBtn'
export default function EditQuestion({question, loadedAnswers,  onQuestionDelete, onSaveQuestion}) {
  const [editing, setEditing]=useState(false)
  const [value, setValue] = useState(question.text)
  const [answers, setAnswers] = useState(loadedAnswers)


  function addBlankAnswer(){
    const blankAnswer={
      id:Date.now(), 
      answer: 'Ответ...', 
      imageUrl: null, 
      correct: 0, 
      questionId: question.id, 
      quizId:question.quizId, 
      status: "created"
    }
    setAnswers([...answers, blankAnswer])
  }

  function addNewAnswer(answerId, answerText){
    const changedAnswers=answers.map(answer=>{
      if (answer.id==answerId) {
        answer.answer=answerText
      }
      return answer
    })
    setAnswers(changedAnswers)
  }
  
  function setCorrectAnswer(answerId){
    const changedAnswers=answers.map(answer=>{
      if (answer.id==answerId) {     
          answer.correct=1       
      }else {
          answer.correct=0
      }
      return answer
    })
    setAnswers(changedAnswers)
  }

  function deleteAnswer (answerId) {
    const changedAnswers=answers.filter(answer=>answer.id!==answerId)    
    setAnswers(changedAnswers)
  }

  function changeEditState() {
    if (editing) {
      alert('Идет сохранение вопроса ждите...')
      onSaveQuestion(question, value, answers)      
    }   
    setEditing(!editing)
  }

  return (
    <div className={classes.questionInfo}>
        <button onClick={onQuestionDelete} style={{alignSelf:'end'}}>&#10060;</button>
        <h3>
          {!editing&&<span >{value}</span>} 
          {editing&&<input 
                      type="text" 
                      value={value} 
                      placeholder={question.text}
                      onChange={e=>setValue(e.target.value)}
                    />}
          <button onClick={changeEditState}>&#9998;</button>
        </h3>
        <ul style={{listStyleType:'none'}}>
          {!editing&&answers.map(answer=>{
               return <li key={answer.id}><span>{answer.answer}</span></li> 
          })}  
          {editing&&answers.map(answer=>{
              return <AnswerEditBlock 
                        key={answer.id} 
                        answer={answer} 
                        editing={editing}
                        onTextBlur={addNewAnswer}
                        onRadioCheck={setCorrectAnswer}
                        onDelete={deleteAnswer.bind(null, answer.id)}
                     />                    
                     })
          } 
        </ul>  
        {editing&&<AddAnswerBtn onClick={addBlankAnswer}/>}
    </div>
  )
}
