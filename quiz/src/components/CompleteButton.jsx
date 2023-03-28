import React from 'react'
import classes from '../styles/completeButton.module.css'
export function CompleteButton({onComplete}) {
  return (

    <div className={classes.completeBtn} onClick={()=>onComplete()}>Завершить тест</div>
  )
}
