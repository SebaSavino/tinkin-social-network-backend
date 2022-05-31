const router = require('express').Router()
const users = require('./usersRoutes')
const prefix = '/api/v1'

router.use(`${prefix}/users`, users)

module.exports = router
