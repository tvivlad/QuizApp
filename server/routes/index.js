import Router from 'express'
const router=new Router()

import userRouter from './userRouter.js'
import quizRouter from './quizRouter.js'
import questionRouter from './questionRouter.js'

router.use('/user', userRouter)
router.use('/quiz', quizRouter)
router.use('/question', questionRouter)

export default router