import { Router } from "express"
import * as questionsCtrl from '../controllers/questions.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/
router.get('/', questionsCtrl.index)

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, questionsCtrl.create)
router.delete('/:id', checkAuth, questionsCtrl.deleteOne)
router.put('/:id', questionsCtrl.update)

export { router }