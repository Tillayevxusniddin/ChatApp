const BaseError = require("../errors/base.error")
const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')

module.exports = async function (req, res, next) {
    try {
        const authorization = req.headers.authorization;

        if (!authorization || !authorization.startsWith("Bearer ")) {
            return next(BaseError.Unauthorized());
        }

        const token = authorization.split(' ')[1];
        if (!token) {
            return next(BaseError.Unauthorized());
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            return next(BaseError.Unauthorized("Token noto‘g‘ri yoki eskirgan"));
        }

        const user = await userModel.findById(decoded.userId);
        if (!user) {
            return next(BaseError.Unauthorized("Foydalanuvchi topilmadi"));
        }

        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};
