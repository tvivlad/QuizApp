import Sequelize from 'sequelize'
import dotenv from 'dotenv'
import path from 'path'
const __dirname=path.resolve()
dotenv.config({path:__dirname+'/.env'})
export const seq=new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'mysql',
        host:process.env.DB_HOST,
        port:process.env.DB_PORT,
        define:{  
            timestamps: false // отключаем поля createdAt и прочее 
        }
    });


export function getUsers(req, res){
  User.findAll({raw:true}).then(result=>{
    console.log("Результат запроса пользователей :", result)
    res.send(result)
  })
}
export function getQuizzes(req, res){
  console.log('Запрос с параметром : ', req.query.userId)

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

export  function getQuestions(req, res){
  Question.findAll({
        where:{
            quizId:req.query.quizId
        },
        raw:true
    }).then(result=>{
    console.log("Результат запроса по вопросам :", result)
    res.send(result)
  })
}

export  function getAnswers(req, res){
  
}

export function addNewQuiz(req, res) {
  console.log('Запрос с фронта получен')
  console.log('Файл полученный с клиента : ', req.file)
  console.log('Имя файла полученного с клиента : ', req.file.path)
  console.log('Описание нового теста : ', req.body.quizDescription)
  /*console.log('Данные из запроса! : ', req.body.quizName) */
  Quiz.create({
    name:req.body.quizName,
    quizImage: 'uploads/quizImages/' + req.file.filename,
    isTest: req.body.quizType,  
    createDate:new Date(),
    userId: req.body.userId,
    description: req.body.quizDescription,    
    showInList: req.body.visibleQuiz
  }).then(result=> console.log('Созданная запись в базе', result))
  res.sendStatus(200).send({message:'ok'})
}