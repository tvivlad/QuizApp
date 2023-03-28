import {Question, Answer} from '../models.js'
export function create() {
    
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

