import React,{useContext} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import navStyle from '../styles/nav.module.css'
import Context from '../context'
import { LOGIN_ROUTE } from '../utils/consts'


export function Navigation() {
  const {user, setUser}=useContext(Context)
  const navigation=useNavigate()
  function logOut(){
    setUser({email:'',isAuth:false})
  } 
  return (
    <>
      <div className={navStyle.navBar}>
        <span>
            <Link to="/main" className={navStyle.LinkStyle}>Main</Link>
            <Link to="/quizzes" className={navStyle.LinkStyle}> Quizzes </Link>
            <Link to="/myquizzes" className={navStyle.LinkStyle}> My Quizzes </Link>
            <Link to="/about" className={navStyle.LinkStyle}> About </Link>
        </span>    
        {/* <span className={navStyle.LinkStyle}> Quizzes</span> */}
        {user.isAuth&&<button style={{margin:'10px 70px'}} onClick={()=>logOut()}> Выйти</button>}
        {!user.isAuth&&<button style={{margin:'10px 70px'}} onClick={()=>navigation(LOGIN_ROUTE)}> Авторизоваться</button>}
    </div>
    <div className={navStyle.navBarStaticBlock}>
    
    </div>      
    </>

    
  )
}
