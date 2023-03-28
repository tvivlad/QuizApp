import React from 'react'
import classes from '../styles/quiz.module.css'
import {useNavigate} from 'react-router-dom'
//export function Quiz(props) {
export function Quiz({quiz}) {  
  const navigate = useNavigate()  
  async function getQuestions(qId, event){
    //console.log("Клик на карточке!!! :", qId)
    //navigate(`/quizzes/${qId}`);
    navigate(`/quizzes/${qId}`)
  }  
  return ( 
    <div className={classes.quizBlock} >
        <h1 className={classes.quizName}>{quiz.name}</h1>
        <div className={classes.quizImgBlock}>
            <img className={classes.quizImg} src={"http://localhost:5000/"+quiz.quizImage}></img>
        </div>
        <button onClick={getQuestions.bind(null, quiz.id)}> Начать</button> 
        
    </div>
  )
}
