import ApiError from "../error/ApiError.js"
import bcrypt from 'bcrypt'
import {User} from '../models.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import path from 'path'
const __dirname=path.resolve()
dotenv.config({path:__dirname+'/.env'})

const generateJWT= function (id, email, role){
    // В метод sign первым параметром передаем центральную часть токена payload, вторым - секретный ключ
    return jwt.sign(
            {id, email, role}, 
            process.env.SECRET_KEY,
            {  expiresIn: '24h'}            
        )
}

export async function registration (req, res, next) {
    try {
        const {email, password, role}=req.body
        console.log('запрос, пришедший на cервер', email, ' Роль : ', role)  

        if (!email || !password) {
            return next(ApiError.badRequest('Не верный логин или пароль')) 
        }
        const candidate= await User.findOne({where:{email}})
        if (candidate) {
            return next(ApiError.badRequest('Этот email занят другим пользователем'))
        }
        const hashPassword= await bcrypt.hash(password, 5)
        const newUser= await User.create({email, role, password:hashPassword})
        
        const token = generateJWT(newUser.id, newUser.email, newUser.role)
        res.json({token})

    } catch (e) {
        console.log("Произошла ошибка : ", e)
    }
}

export async function login (req, res, next) {
    const{email, password}=req.body
    const user=await User.findOne({where:{email}})
    if (!user) {
        return next(ApiError.internalError('Пользователь с таким email не найден'))
    }

    let comparePassword=bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
        return next(ApiError.internalError('Неверный пользователь или пароль'))
    }
    const token=generateJWT(user.id, user.email, user.role)
    return res.json({token})
}

export function check (req, res, next) {
/*     const {id}=req.query
    if (!id) {
        // return для того, чтобы код далее не выполнялся
        return next (ApiError.badRequest('Не указан Id пользователя'))
    } 
    res.send({message:'ALL RIGHT'})*/
    const token = generateJWT(req.user.id, req.user.email, req.user.role)
    return res.json({token})
}