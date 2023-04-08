import {host, authHost} from './index.js'
import jwt_decode from 'jwt-decode'

export const registration=async(email, password)=>{
    const response=await host.post('api/user/registration', {email:email, password:password, role:3})
    localStorage.setItem(response.data.token)
    return jwt_decode('token',response.data.token)
}

export const login=async(email, password)=>{
    const response=await host.post('api/user/login', {email:email, password:password})
    localStorage.setItem('token',response.data.token)
    return jwt_decode(response.data.token)
    
}

export const check=async()=>{
    const {data}=await authHost.get('api/user/auth')
    console.log('привет из функции check :', data)
    localStorage.setItem('token',data.token)
    return jwt_decode(data.token)
}