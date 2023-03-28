import React from 'react'
import Quizzes from '../modules/Quizzes'
import QuizCreation from '../modules/QuizCreation'

export function MyQuizzesPage() {
  return (
    <>
      <QuizCreation/>
      <Quizzes forDeveloper={1}/>
    </>

  )
}
