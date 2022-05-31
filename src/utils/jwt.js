const jwt = require('jsonwebtoken')

exports.generateToken = (payload, expiresIn) => jwt.sign(
  payload,
  process.env.SECRET_KEY,
  {
    expiresIn
  }
)
