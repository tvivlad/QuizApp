import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import express from 'express'
import fileUpload from 'express-fileupload'
import {seq} from './service/db.js'
import router from './routes/index.js'
import { errorHandler } from './middleware/errorHandlerMiddleware.js'
import pkg from 'cors'
import { uploadRes } from './middleware/fileUploadMiddleware.js'
const {cors}=pkg
const app=express()

//console.log(photos)
/* const middleware=function cors(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
} */

//app.use(uploadRes.single('file')) // для загрузки файлов через multer
app.use(pkg())
app.use(express.json())
app.use(fileUpload({}))
//app.use(middleware)

app.use('/api', router)

// делаем папку статической для обращения из клиента напрямую
app.use('/uploads', express.static('uploads')) 
// middleware для обработки
app.use(errorHandler)






function example(req,res){
    res.send(photos);
}

function mainPage(req, res){
    res.status(200).send("<h1>Main Page</h1>")
}

app.get("/", mainPage)
app.get("/example", example)
/* app.get("/getQuizzes",db.getQuizzes)
app.get("/getUsers", db.getUsers)
app.get("/getQuestions", db.getQuestions)
app.get("/getAnswers", db.getAnswers)
app.post("/addNewQuiz", uploadRes.single('file'), db.addNewQuiz) */

const PORT=process.env.PORT /* || 5000 */



const start = async () => {
    try {
        seq.authenticate()
        seq.sync(/* {force:true} */).then(result=>{
            console.log("test succesful");
        })
        app.listen(PORT, console.log(`Server has been started on port № ${PORT}`))
    } catch(e){
        console.log('Ошибка : ',e)
    }   
}

start()



