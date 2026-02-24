import { jest, describe, it, expect } from '@jest/globals'
jest.unstable_mockModule('../../../../db/models/index.js', () => ({
    User: { findOne: jest.fn(), update: jest.fn() },
    Contact: {}
}))
const { authController } =
    await import('../../../../controllers/authController.js')

describe('AuthController -> check', () => {
    it('return right user data', () => {
        const req = {
            user: {
                email: 'test@test.com',
                name: 'Tester',
                subscription: 'pro',
                password: '123123123'
            }
        }
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        authController.check(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({
            user: {
                email: 'test@test.com',
                name: 'Tester',
                subscription: 'pro'
            }
        })
    })
})
