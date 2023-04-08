import React from 'react'
import classes from './AddQuestionBtn.module.css'
export default function AddQuestionBtn({onClick}) {
  return (
    <button className={classes.addBtn} onClick={onClick}>+</button>
  )
}
