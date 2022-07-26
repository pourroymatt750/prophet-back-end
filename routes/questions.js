import { Router } from "express"
import * as questionsCtrl from '../controllers/questions.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, questionsCtrl.create)

export { router }