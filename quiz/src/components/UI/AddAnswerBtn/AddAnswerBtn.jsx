import React from 'react'
import classes from './AddAnswerBtn.module.css'
export default function AddAnswerBtn(props) {
  return (
    <button className={classes.addAnswerBtn} {...props}>+</button>
  )
}
