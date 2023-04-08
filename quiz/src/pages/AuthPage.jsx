import React,{useState, useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CustomInput from '../components/UI/CustomInput/CustomInput'
import classes from '../styles/authAndRegPage.module.css'
import { REGISTRATION_ROUTE } from '../utils/consts'
import { login } from '../http/userAPI'
import Context from '../context.js'

export function AuthPage() {
  const {user, setUser}=useContext(Context)
  const [email, setEmail]=useState('')
  const [password, setPassword]= useState('')
  const navigate=useNavigate();
    const auth=async(event) =>{
      try {
        event.preventDefault()   
        const userData=await login(email, password)
        setUser({email:userData.email, isAuth:true, id:userData.id}) 
        console.log('Содержимое user :', user)
        navigate('/quizzes')
      } catch(e){
          console.log('Ошибка :', e)
          alert(e.response.data.message)
      }
    }

  return (
    <div className={classes.authContainer}>
      <form className={classes.authForm}>
          <h1 className={classes.authFormHeader}>Авторизация</h1>
          <CustomInput 
              placeholder='Ваш email...'
              style={{width:'80%', margin:'10px'}} 
              value={email} 
              onChange={event=>setEmail(event.target.value)}
          />
          <CustomInput 
              placeholder='Ваш пароль...'
              type={'password'}
              style={{width:'80%', margin:'10px'}}
              value={password}
              onChange={event=>setPassword(event.target.value)}
          />

          <div className={classes.btnBlock}>
              <div>
                 <Link className={classes.linkStyle} to={REGISTRATION_ROUTE}> Зарегистрироваться</Link>                 
              </div>
              <button className={classes.authBtn} onClick={auth}> Войти</button>
          </div>         

      </form>
    </div>
  )
}
