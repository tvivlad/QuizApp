import Router from 'express'
import * as questionController from '../controllers/questionControler.js'
const router=new Router()

router.post('/', questionController.create)
router.get('/', questionController.getAll)

export default router