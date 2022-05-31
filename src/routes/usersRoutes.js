const router = require('express').Router()
const controller = require('../controllers/usersController')

router.post('', controller.postUser)

module.exports = router
