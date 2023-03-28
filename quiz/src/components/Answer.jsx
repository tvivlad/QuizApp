import React from 'react'
import classes from '../styles/answer.module.css'
export function Answer({ansIndex, answerItem, showCorrectAns, onChange}) {
  const ansClasses=[classes.answerItem]
  //(answerItem.id==selectedAnsId)?ansClasses.push(classes.answerText):null
 /*  ansClasses.push(classes.answerText)  
  const ansText=ansClasses.join(' ')
  console.log("Классы :", ansText) */
  return (
    <div className={classes.ansItem}> 
        <span >{ansIndex}.</span> 
        <input type="checkBox" onChange={()=>onChange(answerItem.correct)}/> 
        <span className={classes.ansItem}>{answerItem.answer} </span> 
        <span>  {showCorrectAns&&((answerItem.correct)?<span>✔️</span>:<span>&#10060;</span>)}</span>
    </div>
  )
}
