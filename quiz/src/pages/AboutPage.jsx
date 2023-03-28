import React,{useState} from 'react'
import InputExample from '../components/UI/InputExample/InputExample'

const classes={
  div:{
    /* paddingTop:140, */
    marginTop:140,
    backgroundColor: 'lime',
    color:'red'
  }    
}



export function AboutPage() {
  const [value, setValue]=useState('')
  return (
    <div style={classes.div}>
        <h2>{value}</h2>
         <InputExample 
            defaultValue={'Пример инпута...'} 
            value={value} 
            onType={value=>setValue(value)}
        />         
    </div>
  )
}
