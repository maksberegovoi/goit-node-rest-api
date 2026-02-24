import { jest, describe, beforeEach, it, expect } from '@jest/globals'
import { registrationSchema } from '../../../../schemas/authSchema.js'

jest.unstable_mockModule('../../../../db/models/index.js', () => ({
    User: {
        findByPk: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn()
    },
    Contact: {
        findAll: jest.fn(),
        create: jest.fn()
    }
}))

const { authController } =
    await import('../../../../controllers/authController.js')

describe('AuthController -> register', () => {
    let req, res

    beforeEach(() => {
        req = {
            body: { email: 'asd@gmail.com', password: 'asd123', name: 'Maxim' }
        }
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        jest.spyOn(registrationSchema, 'validateAsync').mockResolvedValue(
            req.body
        )
        authController.authService.registration = jest.fn()
    })

    it('create user and return 201 (Created)', async () => {
        const mockUser = {
            name: 'username',
            email: 'new@user.com',
            subscription: 'starter'
        }
        authController.authService.registration.mockResolvedValue(mockUser)

        await authController.register(req, res)

        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.json).toHaveBeenCalledWith({ user: mockUser })
    })
})
