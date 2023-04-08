import React,{useState} from 'react'

export default function AnswerEditBlock({answer, onTextBlur, onRadioCheck, editing, onDelete}) {
  const [value, setValue]=useState(answer.answer)  
  const [correct, setCorrect]=useState(answer.correct)
   
  return (
    <li>
        <span>{!editing&&<span>{value}</span>}</span>        
        {editing&&<input
                    type='radio'
                    name='rad'
                    value={correct}              
                    onChange={(e)=>{
                            setCorrect(e.target.value)
                            onRadioCheck(answer.id)    
                    }}
                  />}

        {editing&&<input 
                    type="text" 
                    value={value} 
                    placeholder={answer.answer}
                    onChange={(e)=>setValue(e.target.value)}
                    onBlur={()=>onTextBlur(answer.id, value)}
                  />}

        {editing&&<span>{answer.id}</span>}
        {editing&&<button onClick={onDelete}>&#10060;</button>}  
    </li>
  )
}
