import React from 'react'
import classes from './CustomButton.module.css'
export default function CustomButton({value, onClick, children}) {
  return (
    <button class={classes.customBtn} onClick={onClick}>
        {value} {children}
    </button>
  )
}
