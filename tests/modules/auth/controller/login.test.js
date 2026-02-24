import { jest, describe, beforeEach, it, expect } from '@jest/globals'

jest.unstable_mockModule('../../../../db/models/index.js', () => ({
    User: { findOne: jest.fn(), update: jest.fn() },
    Contact: {}
}))

jest.unstable_mockModule('../../../../schemas/authSchema.js', () => ({
    loginSchema: {
        validateAsync: jest.fn()
    },
    registrationSchema: {}
}))

const { loginSchema } = await import('../../../../schemas/authSchema.js')
const { authController } =
    await import('../../../../controllers/authController.js')

describe('AuthController -> login', () => {
    let req, res

    beforeEach(() => {
        req = {
            body: { email: 'test@example.com', password: 'password123' }
        }
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        jest.clearAllMocks()
    })

    it('return user and status 200 (OK)', async () => {
        const mockUserData = {
            token: 'fake-jwt-token',
            user: { email: 'test@example.com', subscription: 'starter' }
        }

        loginSchema.validateAsync.mockResolvedValue(req.body)

        authController.authService.login = jest
            .fn()
            .mockResolvedValue(mockUserData)

        await authController.login(req, res)

        expect(loginSchema.validateAsync).toHaveBeenCalledWith(req.body)
        expect(authController.authService.login).toHaveBeenCalledWith(req.body)
        expect(res.json).toHaveBeenCalledWith(mockUserData)
    })

    it('throw error due to invalid validation', async () => {
        const validationError = new Error('Validation failed')
        loginSchema.validateAsync.mockRejectedValue(validationError)

        await expect(authController.login(req, res)).rejects.toThrow(
            'Validation failed'
        )

        expect(authController.authService.login).not.toHaveBeenCalled()
    })
})
