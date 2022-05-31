const { good, bad } = require('../utils/responseFactory')
const service = require('../services/usersService')
const { devLogger } = require('../utils/logger')

module.exports = class UsersController {

  static async postUser(req, res) {

    try {
      const body = req.body
      const data = await service.registerNewUser(body)

      if (data.error) {
        const response = bad(data.error, 400)
        return res.status(response.statusCode).json(response)
      }

      const response = good(data, 201)
      return res.status(response.statusCode).json(response)
    } catch (error) {
      devLogger('[users-controller|post|error]', error.toString(), 'error')

      const response = bad(error.toString())
      return res.status(response.statusCode).json(response)
    }
  }

}
