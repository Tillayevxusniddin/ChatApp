const authContoller = require('../controllers/auth.contoller')

const router = require('express').Router()

require('express-group-routes')

router.group('/auth', route => {
    route.post('/login', authContoller.login)
    route.post('/verify', authContoller.verify)
})

// router.group('/user', route => {
//     route.get('/contacts', userController.getAllContacts)
// })


module.exports = router;

