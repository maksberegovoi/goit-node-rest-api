import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: 'smtp.ukr.net',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

export const sendVerificationEmail = async (email, token) => {
    const verifyLink = `http://localhost:3000/api/auth/verify/${token}`

    await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: 'Email verification',
        html: `<a href="${verifyLink}">Verify email</a>`
    })
}
