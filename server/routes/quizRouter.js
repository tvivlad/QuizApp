import Router from 'express'
const router=new Router()
import * as quizController from '../controllers/quizControler.js'
import checkRole from '../middleware/checkRoleMiddleware.js'

router.post('/',checkRole(2), quizController.create)
router.get('/', quizController.getAll)
router.get('/:id',quizController.getOneQuiz)
router.delete('/:id',checkRole(2),quizController.deleteQuiz)

export default router