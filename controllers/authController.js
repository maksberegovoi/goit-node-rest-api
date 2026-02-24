import AuthService from '../services/authService.js'
import { loginSchema, registrationSchema } from '../schemas/authSchema.js'
import path from 'path'
import fs from 'fs/promises'

const avatarsDir = path.resolve('public', 'avatars')

class AuthController {
    constructor() {
        this.authService = new AuthService()
    }

    register = async (req, res) => {
        const data = await registrationSchema.validateAsync(req.body)

        const user = await this.authService.registration(data)

        res.status(201).json({ user })
    }

    login = async (req, res) => {
        const data = await loginSchema.validateAsync(req.body)
        const userData = await this.authService.login(data)

        res.json(userData)
    }

    logout = async (req, res) => {
        const user = req.user
        await this.authService.logout(user)

        res.sendStatus(204)
    }
    check = (req, res) => {
        const { email, name, subscription } = req.user

        res.status(200).json({
            user: {
                email,
                name,
                subscription
            }
        })
    }

    updateAvatar = async (req, res) => {
        const { id } = req.user
        const { path: tempUpload, originalname } = req.file

        const filename = `${id}_${originalname}`
        const resultUpload = path.resolve(avatarsDir, filename)

        try {
            await fs.rename(tempUpload, resultUpload)

            const avatarURL = `/avatars/${filename}`

            await this.authService.updateAvatar(id, avatarURL)

            res.status(200).json({
                avatarURL
            })
        } catch (error) {
            await fs.unlink(tempUpload)
            throw error
        }
    }
}

export const authController = new AuthController()
