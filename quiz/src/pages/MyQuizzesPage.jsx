import React,{useContext} from 'react'
import Quizzes from '../modules/Quizzes'
import QuizCreation from '../modules/QuizCreation'
import Context from '../context.js'

export function MyQuizzesPage() {
  const {user}=useContext(Context)
  console.log(' MyQuizzes  user.id: ', user)
  return (
    <>
      <QuizCreation/>
      <Quizzes forDeveloper={user.id}/>
    </>

  )
}
