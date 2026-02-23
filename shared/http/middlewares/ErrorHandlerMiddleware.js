import ApiError from '../errors/api-error.js'
import Joi from 'joi'
import { ValidationError as sequelizeValidationError } from 'sequelize'

const errorHandlerMiddleware = (err, req, res, _next) => {
    if (err instanceof ApiError) {
        return res.status(err.status).json({ message: err.message })
    }

    if (err instanceof Joi.ValidationError) {
        return res.status(400).json({
            message: err.message
        })
    }

    if (err instanceof sequelizeValidationError) {
        return res.status(400).json({
            message: err.message
        })
    }

    console.log(err)
    return res.status(500).json({
        message: 'Unexpected error'
    })
}

export default errorHandlerMiddleware
