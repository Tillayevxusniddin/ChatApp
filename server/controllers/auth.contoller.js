const BaseError = require("../errors/base.error");
const userModel = require("../models/user.model");

class AuthContoller {
    async login(req, res, next) {
        try {
            const { email } = req.body;
            const existUser = await userModel.findOne({ email })
            if (existUser) {
                throw BaseError.BadRequest('User already exist', [{email: "User already exist"}])
            }
            const createdUser = await userModel.create({ email })
            res.status(201).json(createdUser)
        } catch ( error ) {
            next(error)
        }
    }

    async verify(req, res, next) {
        try {
            const {email, otp} = req.body;
            res.json({ email, otp})
        } catch (error) {
            
        }
    }
}

module.exports = new AuthContoller()