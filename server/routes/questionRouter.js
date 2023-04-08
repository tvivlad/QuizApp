import Router from 'express'
import * as questionController from '../controllers/questionControler.js'
const router=new Router()

router.post('/', questionController.create)
router.get('/', questionController.getAll)
router.get('/:quizId', questionController.getQuizQuestions)


export default router