import Router from 'express'
import { AuthMiddleware } from '../shared/http/middlewares/AuthMiddleware.js'
import { authController } from '../controllers/authController.js'
import { upload } from '../shared/http/middlewares/upload.js'

const authRouter = Router()

authRouter.post('/login', authController.login)
authRouter.post('/register', authController.register)
authRouter.post('/logout', AuthMiddleware, authController.logout)
authRouter.get('/current', AuthMiddleware, authController.check)
authRouter.patch(
    '/avatars',
    AuthMiddleware,
    upload.single('avatar'),
    authController.updateAvatar
)

export default authRouter
