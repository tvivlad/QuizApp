import {Quiz} from '../models.js'
import ApiError from '../error/ApiError.js'
import * as uuid from 'uuid'
import path from 'path'
export function create(req, res) {
  try{  
      console.log('Запрос с фронта получен метод create', req.body)
      console.log('Файл полученный с клиента : ', req.files)
      const {imgFile} = req.files

      let filename=uuid.v4()+imgFile.name   
      const quizImagesPath=path.resolve(path.resolve(),'uploads/quizImages',filename)
      imgFile.mv(quizImagesPath)
      
      Quiz.create({
        name:req.body.quizName,
        quizImage: 'uploads/quizImages/' + filename,
        isTest: req.body.quizType,  
        createDate:new Date(),
        userId: req.body.userId,
        description: req.body.quizDescription,    
        showInList: req.body.visibleQuiz
      }).then(result=> console.log('Созданная запись в базе', result))
      res.sendStatus(200)
  }catch (e){
    console.log('Ошибка на quizController', e)
  }
}

export function getAll(req, res){
  console.log('Запрос с параметром getAll: ', req.query.userId)
  if (req.query.userId){      
      Quiz.findAll({
        where:{
          userId:req.query.userId
        },
        raw:true
        }).then(result=>{
      console.log("Результат запроса экзаменационных тестов :", result)
      res.send(result)
      })
  } else {
      Quiz.findAll({raw:true}).then(result=>{
      console.log("Результат запроса экзаменационных тестов :", result)
      res.send(result)
      })
  }
}

