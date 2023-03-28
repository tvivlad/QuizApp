import React,{useState, useContext} from 'react'
import { Link } from 'react-router-dom'
import CustomInput from '../components/UI/CustomInput/CustomInput'
import classes from '../styles/authAndRegPage.module.css'
import { LOGIN_ROUTE } from '../utils/consts'
import {registration} from '../http/userAPI.js'
import Context from '../context.js'

export function RegPage() {  
  const {user, setUser}=useContext(Context)
  const [email, setEmail]=useState('')
  const [password, setPassword]=useState('')

  const signIn=async(event) =>{
    event.preventDefault()
    const userData=await registration(email, password)
    console.log('Ответ от сервера при регистрации', userData)
    setUser({email:userData.email, isAuth:true})      
    console.log('содержимое user : ', user)
  }

  return (
    <div className={classes.authContainer}>
      <form className={classes.authForm}>
          <h1 className={classes.authFormHeader}>Регистрация</h1>
          <CustomInput 
              placeholder='Ваш имя...'
              style={{width:'80%', margin:'10px'}} 
              /*  value={quizName} */
              /* onChange={event=>setQuizName(event.target.value) }*/
          />
          <CustomInput 
              placeholder='Ваша фамилия...'
              style={{width:'80%', margin:'10px'}} 
              /*  value={quizName} */
              /* onChange={event=>setQuizName(event.target.value) }*/
          />

          <CustomInput 
              placeholder='Ваш email...'
              style={{width:'80%', margin:'10px'}} 
              value={email} 
              onChange={event=>setEmail(event.target.value)}
          />
          <CustomInput 
              placeholder='Ваш пароль...'
              style={{width:'80%', margin:'10px'}} 
              value={password}
              onChange={event=>setPassword(event.target.value)}
          />

          <div className={classes.btnBlock}>
              <div>
                 <Link className={classes.linkStyle} to={LOGIN_ROUTE}> Авторизоваться</Link>                 
              </div>
              <button className={classes.regBtn} onClick={signIn}> Зарегистироваться</button>
          </div>       

      </form>
    </div>
  )
}
