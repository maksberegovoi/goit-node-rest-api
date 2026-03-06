import { sequelize } from '../db.js'
import { DataTypes } from 'sequelize'

export const User = sequelize.define('users', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    subscription: {
        type: DataTypes.ENUM,
        values: ['starter', 'pro', 'business'],
        defaultValue: 'starter'
    },
    avatarURL: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    verify: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    verificationToken: {
        type: DataTypes.STRING
    }
})
