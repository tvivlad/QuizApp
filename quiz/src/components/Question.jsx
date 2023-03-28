import React,{useState} from 'react'
import {Answer} from './Answer'
import classes from '../styles/question.module.css'
export function Question({question, index, answerList, onResult}) {
  const [answers, setAnswers]=useState([answerList]) 
  const [showCorrect, setShowCorrect] = useState(false)
  let SelectedAnswerId=null;
  function updateAnsView (correctAns){
    setShowCorrect(true)
    setAnswers(answerList)
    onResult(correctAns)
  }  
  return (
    <div className={classes.questionCard}>
        <h2 className={classes.questionName}>Вопрос {index+1}</h2>    
        <span className={classes.questionText}>{question.text}</span>
        {question.imageUrl&&<img className={classes.questionImg} src={"http://localhost:5000/"+question.imageUrl}/>}
        {answerList.map((answer,index)=>{
            return <Answer answerItem={answer} key={answer.id} showCorrectAns={showCorrect}  ansIndex={index+1} onChange={updateAnsView}/>
        })}
    </div>
  )
}
