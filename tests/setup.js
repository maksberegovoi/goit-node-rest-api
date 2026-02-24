import { jest } from '@jest/globals'

jest.unstable_mockModule('../db/db.js', () => ({
    sequelize: {
        define: jest.fn(),
        authenticate: jest.fn()
    }
}))
