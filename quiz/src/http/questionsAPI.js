import {host, authHost} from '../http/index.js'

export const  getQuestions = async(quizId)=> {
    const response= await host.get(`${process.env.REACT_APP_API_URL}api/question/${quizId}`)
    return response
}

export const addQuestions= async(data)=>{
    console.log("Отправляемые данные : ", data)
    const response= await host.post(`${process.env.REACT_APP_API_URL}api/question`, data)
    return response
}