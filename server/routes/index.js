const authContoller = require('../controllers/auth.contoller')
const userController = require('../controllers/user.controller')
const authMiddleware = require('../middlewares/auth.middleware')

const router = require('express').Router()

require('express-group-routes')

router.group('/auth', route => {
    route.post('/login', authContoller.login)
    route.post('/verify', authContoller.verify)
})

router.group('/user', route => {
    route.get('/contacts', userController.getContacts)
    route.get('/messages/:contactId', userController.getMessage)

    route.post('/message', userController.createMessage)
    route.post('/message-read', userController.messageRead)
    route.post('/contact', userController.createContact)
    route.post('/reaction', userController.createReaction)
    route.post('/send-otp', authMiddleware ,userController.sendOtp)

    route.put('/message/:messageId', userController.updateMessage)
    route.put('/profile', authMiddleware, userController.updateProfile)
    route.put('/email', authMiddleware, userController.updateEmail)

    route.delete('/message/:messageId', userController.deleteMessage)
    route.delete('/', authMiddleware, userController.deleteUser)
})


module.exports = router;

