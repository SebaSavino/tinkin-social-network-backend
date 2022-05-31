const bcrypt = require('bcrypt')

const { postUserSchema } = require('../validations/usersValidations')
const { sendVerificationEmail } = require('../utils/mailer')
const { generateToken } = require('../utils/jwt')
const { devLogger } = require('../utils/logger')
const User = require('../models/userModel')

module.exports = class UsersService {

  static async registerNewUser(values) {
    try {
      const { error } = postUserSchema.validate(values)

      if (error) {
        const details = error.details.map(e => e.message.replace(/\"/g, ''))
        return { error: details }
      }

      const usernameTaken = await User.find({ userName: values.userName })

      if (usernameTaken.length > 0) {
        return { error: `Username ${values.userName} is already registered` }
      }

      const emailTaken = await User.find({ email: values.email })

      if (emailTaken.length > 0) {
        return { error: `Email ${values.email} is already registered` }
      }

      const passwordHash = await bcrypt.hash(values.password, 10)
      delete values.password

      const result = await User.create({ ...values, passwordHash })

      const user = result._doc
      delete user.passwordHash
      delete user.__v

      const emailVerificationToken = generateToken({ id: user._id }, '1d')
      const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`

      sendVerificationEmail(values.email, values.firstName, url)
      const accessToken = generateToken({ id: user._id }, '7d')
      return { ...user, accessToken }
    } catch (error) {
      devLogger('[users-service|register|error]', error, 'error')
      return { error: error.message }
    }
  }
}
