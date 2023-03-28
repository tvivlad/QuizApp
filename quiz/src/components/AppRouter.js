import React, { Component,useContext } from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import {authRoutes, publicRoutes } from '../routes'
import { LOGIN_ROUTE } from '../utils/consts'
import Context from '../context'


export default function AppRouter() {
  const {user, setUser}= useContext(Context)
 
  return (
    <div>
      {/* AppRouter */}
      <Routes>
        {user.isAuth&&authRoutes.map(({path, Component})=>
            <Route key={path} path={path} element={Component}/>       
       )} 
        {publicRoutes.map(({path, Component})=>
            <Route key={path} path={path} element={Component}/>       
       )}
            <Route path="*" element={<Navigate to={LOGIN_ROUTE} replace />} />

{/*         <Route path="/main" element={<MainPage/>}/>
            <Route path="/quizzes" element={<QuizzesPage/>}/>
            <Route path="quizzes/:id" element={<QuestionsPage/>}/>
            <Route path="myquizzes/" element={<MyQuizzesPage/>}/>
            <Route path="/about" element={<AboutPage/>}/> */}
      </Routes>
    </div>
  )
}
