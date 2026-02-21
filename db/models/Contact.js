import { sequelize } from '../db.js'
import { DataTypes } from 'sequelize'

export const Contact = sequelize.define('contacts', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    favorite: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})
