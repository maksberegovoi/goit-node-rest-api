import { User } from '../db/models/index.js'
import ApiError from '../shared/http/errors/api-error.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import apiError from '../shared/http/errors/api-error.js'
import gravatar from 'gravatar'

class AuthService {
    async registration(data) {
        const { name, email, password } = data
        const existing = await User.findOne({
            where: { email }
        })
        if (existing)
            throw ApiError.conflict('User with this email has already exist')

        const avatarURL = gravatar.url(
            email,
            { s: '250', d: 'identicon' },
            true
        )

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            avatarURL
        })

        return {
            userId: user.id,
            email: user.email,
            name: user.name,
            subscription: user.subscription
        }
    }

    async login(data) {
        const { email, password } = data

        const user = await User.findOne({
            where: { email }
        })
        if (!user) throw ApiError.unauthorized('Incorrect email or password')

        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword)
            throw apiError.unauthorized('Incorrect email or password')

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        })
        await user.update({
            token
        })

        return {
            token,
            user: {
                userId: user.id,
                email: user.email,
                name: user.name,
                subscription: user.subscription
            }
        }
    }

    async logout(user) {
        await user.update({
            token: null
        })
    }

    async updateAvatar(userId, avatarURL) {
        const user = await User.findByPk(userId)
        if (!user) throw ApiError.unauthorized()

        await user.update({ avatarURL })
    }
}

export default AuthService
