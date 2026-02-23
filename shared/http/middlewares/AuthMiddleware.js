import ApiError from '../errors/api-error.js'
import jwt from 'jsonwebtoken'
import { User } from '../../../db/models/index.js'

export const AuthMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw ApiError.unauthorized()
        }

        const token = authHeader.split(' ')[1]

        if (!token) throw ApiError.unauthorized()

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const { userId } = decoded

        const user = await User.findByPk(userId)
        if (!user) throw ApiError.unauthorized()

        const isValidToken = user.token === token
        if (!isValidToken) throw ApiError.unauthorized()

        req.user = user
        next()
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            throw ApiError.unauthorized('Invalid token')
        }
        if (error instanceof jwt.TokenExpiredError) {
            throw ApiError.unauthorized('Token expired')
        }
        throw error
    }
}
