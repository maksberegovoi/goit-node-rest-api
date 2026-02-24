import fs from 'fs/promises'
import { jest, describe, beforeEach, it, expect } from '@jest/globals'
jest.unstable_mockModule('../../../../db/models/index.js', () => ({
    User: { findOne: jest.fn(), update: jest.fn() }
}))
const { authController } =
    await import('../../../../controllers/authController.js')

describe('AuthController -> updateAvatar', () => {
    let req, res

    beforeEach(() => {
        req = {
            user: { id: '123' },
            file: { path: 'temp/test.jpg', originalname: 'test.jpg' }
        }
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        jest.spyOn(fs, 'rename').mockResolvedValue()
        jest.spyOn(fs, 'unlink').mockResolvedValue()

        authController.authService.updateAvatar = jest.fn().mockResolvedValue()
    })

    it('update avatar successfully', async () => {
        await authController.updateAvatar(req, res)

        expect(fs.rename).toHaveBeenCalled()
        expect(authController.authService.updateAvatar).toHaveBeenCalledWith(
            '123',
            expect.stringContaining('/avatars/123_test.jpg')
        )
        expect(res.status).toHaveBeenCalledWith(200)
    })

    it('delete temp file if error', async () => {
        authController.authService.updateAvatar.mockRejectedValue(
            new Error('DB Error')
        )

        await expect(authController.updateAvatar(req, res)).rejects.toThrow(
            'DB Error'
        )

        expect(fs.unlink).toHaveBeenCalledWith('temp/test.jpg')
    })
})
