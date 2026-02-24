import { jest, describe, beforeEach, it, expect } from '@jest/globals'
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

describe('AuthController -> logout', () => {
    let req, res

    beforeEach(() => {
        req = {
            user: { id: 1, email: 'asd@gmail.com' }
        }
        res = {
            sendStatus: jest.fn(),
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        authController.authService.logout = jest.fn().mockResolvedValue()
    })

    it('service method has been called', async () => {
        await authController.logout(req, res)

        expect(authController.authService.logout).toHaveBeenCalledTimes(1)
        expect(authController.authService.logout).toHaveBeenCalledWith(req.user)
    })

    it('method return 204 (No Content)', async () => {
        await authController.logout(req, res)

        expect(res.sendStatus).toHaveBeenCalledTimes(1)
        expect(res.sendStatus).toHaveBeenCalledWith(204)
        expect(res.json).toHaveBeenCalledTimes(0)
        expect(res.status).toHaveBeenCalledTimes(0)
    })
})
