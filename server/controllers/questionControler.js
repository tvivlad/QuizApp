import {Question, Answer} from '../models.js'

export function create(req, res) {
  console.log('Данные пришедшие на сервер', req.body)
    try {
      Question.create({
        text:req.body.question.text,
        imageUrl:req.body.question.imageUrl?req.body.question.imageUrl:null,
        quizId:req.body.question.quizId
      }).then(question=> {
          console.log('Результат создания вопроса :', question)  
          for (let answer of req.body.answers){         
            //let answer =req.body.answers[0]
            console.log('добавляемый ответ :', answer)

            Answer.create({
              answer:answer.answer, 
              correct: answer.correct,
              imageUrl: answer.imageUrl?answer.imageUrl:null,
              questionId: question.id,
              quizId: question.quizId
            }).then(answer=>{
                console.log('Добавленный ответ : ', answer)  
            })
          }
          
        res.status(200).json(question)
      }) 
    } catch (e){
      console.log(e)  
    }
 

}

export async function getAll(req, res){
  const questionsWithAnswers={}
  questionsWithAnswers.questions= await Question.findAll({
        where:{
            quizId:req.query.quizId
        },
        raw:true
  })

  questionsWithAnswers.answers= await Answer.findAll({
    where:{quizId:req.query.quizId},
    raw:true    
  })
    console.log('Вопросы и ответы к ним :', questionsWithAnswers)
    res.send(questionsWithAnswers)
}

export async function  getQuizQuestions(req, res){  
  const questionsWithAnswers={}
  questionsWithAnswers.questions= await Question.findAll({
        where:{
            quizId:req.params.quizId
        },
        raw:true
  })

  questionsWithAnswers.answers= await Answer.findAll({
    where:{quizId:req.params.quizId},
    raw:true    
  })
    console.log('Вопросы и ответы к ним :', questionsWithAnswers)
    res.send(questionsWithAnswers)
}

