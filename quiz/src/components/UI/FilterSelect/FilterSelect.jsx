import React,{useContext} from 'react'
import classes from './FilterSelect.module.css'
//import Context from '../../../context'

export default function FilterSelect({options, defaultValue, onChange, value}) {
 // const {onFilter, selectedFilter}=useContext(Context)
  return (
    <select 
        className={classes.selectStyle} 
        value={value} 
        onChange={event=>{  
            onChange(event.target.value)}}           
    >
        <option value="" defaultValue={defaultValue} disabled>{defaultValue}</option>
        {options.map(option=>        
            <option value={option.value} key={option.value}>{option.name}</option>
        )}    
    </select>
  )
}
