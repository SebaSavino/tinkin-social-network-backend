const { readFileSync } = require('fs')
const { join } = require('path')

const nodemailer = require('nodemailer')
const { google } = require('googleapis')

const { devLogger } = require('./logger')

const {
  EMAIL,
  MAILLING_ID,
  MAILLING_SECRET,
  MAILLING_REFRESH
} = process.env

const { OAuth2 } = google.auth
const redirectUrl = 'https://developers.google.com/oauthplayground'
const auth = new OAuth2(MAILLING_ID, MAILLING_SECRET, MAILLING_REFRESH, redirectUrl)

exports.sendVerificationEmail = function (email, name, url) {
  let html = readFileSync(join(__dirname, '..', 'mails', 'account-verification.html'), 'utf8')
  html = html.replace('{{name}}', name).replace('{{redirect}}', url)

  auth.setCredentials({ refresh_token: MAILLING_REFRESH })
  const accessToken = auth.getAccessToken()

  const smpt = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      accessToken,
      user: EMAIL,
      clientId: MAILLING_ID,
      clientSecret: MAILLING_SECRET,
      refreshToken: MAILLING_REFRESH,
    }
  })

  const options = {
    subject: "Tinkin account verification",
    from: EMAIL,
    to: email,
    html
  }

  smpt.sendMail(options, function (error) {
    if (error) {
      devLogger('[mailer|send-verification|error]', error, 'error')
    }
  })
}
