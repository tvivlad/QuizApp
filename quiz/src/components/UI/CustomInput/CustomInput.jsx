import React,{useContext} from 'react'
import classes from './CustomInput.module.css'

export default function CustomInput(props) {
  return (
    <input 
        type="text" 
        className={classes.searchInput} 
        {...props} 
    />
  )
}
