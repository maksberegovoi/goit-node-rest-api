import Router from 'express'
import { AuthMiddleware } from '../shared/http/middlewares/AuthMiddleware.js'
import { authController } from '../controllers/authController.js'

const authRouter = Router()

authRouter.post('/login', authController.login)
authRouter.post('/register', authController.register)
authRouter.post('/logout', AuthMiddleware, authController.logout)
authRouter.get('/current', AuthMiddleware, authController.check)

export default authRouter
