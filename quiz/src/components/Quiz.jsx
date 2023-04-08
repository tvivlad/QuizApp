import React from 'react'
import classes from '../styles/quiz.module.css'
import {useNavigate} from 'react-router-dom'
import { deleteQuiz } from '../http/quizAPI'
//export function Quiz(props) {
export function Quiz({quiz,showMode}) {  
  const navigate = useNavigate()  
  async function getQuestions(qId, event){
    //console.log("Клик на карточке!!! :", qId)
    //navigate(`/quizzes/${qId}`);
    navigate(`/quizzes/${qId}`)
  }  
  async function deleteSelectedQuiz(quizId, event){ 
    try{
      if (window.confirm('Вы действительно хотите удалить этот тест?')) {
      const response = await deleteQuiz(quizId)          
      }    
    }catch (e){
      console.log(e)
      alert(e.response.data.message)  
    } 
  }
  function editQuiz(quizId, event) {
    navigate(`/myquizzes/${quizId}`)
  }
  return ( 
    <div className={classes.quizBlock} >
        {showMode&&<button onClick={editQuiz.bind(null,quiz.id)} style={{marginRight:'10px'}}> Редактировать</button>}
        {showMode&&<button onClick={deleteSelectedQuiz.bind(null,quiz.id)}> Удалить</button>}
        <h1 className={classes.quizName}>{quiz.name}</h1>
        <div className={classes.quizImgBlock}>
            <img className={classes.quizImg} src={"http://localhost:5000/"+quiz.quizImage}></img>
        </div>
        <button onClick={getQuestions.bind(null, quiz.id)}> Начать</button>         
    </div>
  )
}
