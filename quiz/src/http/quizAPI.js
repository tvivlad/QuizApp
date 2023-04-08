import {host, authHost} from './index.js'
import jwt_decode from 'jwt-decode'

export const addQuiz=async(formData)=>{
    const response=await authHost.post('api/quiz', formData)    
    return response
}

export const getAllQuizzes=async(userIdParam)=>{   
    if (!userIdParam) userIdParam=''                                                                                                                                                                                                                                                                                                                                                                                                                 
    const response=await host.get(`api/quiz${userIdParam}`)    
    return response
}

export const getOneQuiz=async(quizId)=>{  
    const response= await host.get(`${process.env.REACT_APP_API_URL}api/quiz/${quizId}`)
    return response    
}

export const deleteQuiz = async (quizId) =>{
    const response=await authHost.delete(`api/quiz/${quizId}`)
    return response
}

