import Joi from 'joi'

export const registrationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).required()
})

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

export const emailSchema = Joi.object({
    email: Joi.string().email().required()
})
