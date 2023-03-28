import React,{useContext} from 'react'
import classes from './SortSelect.module.css'
//import Context from '../../../context'

export default function SortSelect({options, defaultValue, value, onChange}){
 // const {onChange, selectedSort}=useContext(Context)
  return (
     <select 
        className={classes.selectStyle}
        value={value} 
        onChange={event=>{
          //console.log('отправляемый параметр :', event.target.value)
        onChange(event.target.value)           
        }}    
        >
        <option value="" defaultValue={defaultValue} disabled >{defaultValue}</option>
        {options.map(option=>
            <option value={option.value} key={option.value}>
                {option.name}
            </option>
        )}
    </select> 
  )
}
