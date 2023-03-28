import React from 'react'
import classes from './CustomTextArea.module.css'
export default function CustomTextArea(props) {
  return (
    <textarea 
        class={classes.textArea}
        {...props}    
    ></textarea>
  )
}
