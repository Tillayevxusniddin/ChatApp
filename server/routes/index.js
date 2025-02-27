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
    route.get('/contacts', authMiddleware, userController.getContacts)
    route.get('/messages/:contactId', authMiddleware, userController.getMessage)

    route.post('/message', authMiddleware, userController.createMessage)
    route.post('/message-read', authMiddleware, userController.messageRead)
    route.post('/contact', authMiddleware, userController.createContact)
    route.post('/reaction', authMiddleware, userController.createReaction)
    route.post('/send-otp', authMiddleware ,userController.sendOtp)

    route.put('/message/:messageId', authMiddleware, userController.updateMessage)
    route.put('/profile', authMiddleware, userController.updateProfile)
    route.put('/email', authMiddleware, userController.updateEmail)

    route.delete('/message/:messageId', authMiddleware, userController.deleteMessage)
    route.delete('/', authMiddleware, userController.deleteUser)
})


module.exports = router;

