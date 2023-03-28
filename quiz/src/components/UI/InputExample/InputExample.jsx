import React from 'react'
import classes from './InputExample.module.css'

const inputStyle={
  input:{
    border: '1px solid black',
    borderRadius: 4,
    width:300
  }
}

export default function InputExample({defautValue, value, onType}) {
  return (
    <div class={classes.input}>
        <input 
            type="text"   
            value={value} 
            placeholder={defautValue}          
            onChange={event=>onType(event.target.value)}
            style={inputStyle} 
        />
    </div>
  )
}
