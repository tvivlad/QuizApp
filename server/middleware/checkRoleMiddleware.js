import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import path from 'path'
const __dirname=path.resolve()
dotenv.config({path:__dirname+'/.env'})

export default function (role){
    return  function (req,res,next) {
        if (req.method ==='OPTIONS') {
            next()
        }        
        try {
            const token=req.headers.authorization.split(' ')[1] // Bearer asdf;lkj; в нашем случае используется схема Bearer            
            if(!token) {
                return res.status(401).json({message:'Не авторизован пользователь'})
            }
            const decoded= jwt.verify(token, process.env.SECRET_KEY)
            if (decoded.role !== role){                
                return res.status(403).json({message:"У Вас нет доступа"})
            }
            req.user=decoded    
            next() // для вызова следующего в цепочке middleware 
        }catch(e){
            res.status(401).json({message: 'Пользователь не авторизован'})
        }
    }
}
   