const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')
const BaseError = require('../errors/base.error')
const otpModel = require('../models/otp.model')

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMPT_PASS
            },
        })
    }

    async sendOtp( to ) {
        const otp = Math.floor(1000 + Math.random() * 900000)
        console.log(otp)

        const hashedOtp = await bcrypt.hash(otp.toString(), 10)
        await otpModel.create({ email: to, otp: hashedOtp, expireAt: new Date(Date.now() + 5 * 60 * 1000) })

        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: `OTP for verification ${new Date().toLocaleString()}`,
            html: `
                <h1>Your OTP is ${otp} </h1>
            `
        })
    }
    async verifyOtp(email, otp) {
        const otpData = await otpModel.find({email})
        if (!otpData) throw BaseError.BadRequest('otp Not found')
        const currentOtp = otpData[otpData.length - 1]
        if (!currentOtp) throw BaseError.BadRequest('otp Not found')
        
        if (currentOtp.expireAt < new Date()) {
            throw BaseError.BadRequest('Your otp is expired')
        }
        const isValid = await bcrypt.compare(otp.toString(), currentOtp.otp)
        if (!isValid) throw BaseError.BadRequest('Invalid otp entered')
        await otpModel.deleteMany({email})
        return true
    }
}

module.exports = new MailService()