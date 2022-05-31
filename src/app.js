const mongoose = require('mongoose'),
  compression = require('compression'),
  routes = require('./routes/router'),
  helmet = require('helmet'),
  morgan = require('morgan'),
  cors = require('cors'),
  express = require('express')

function startApp() {
  app = express()

  app.use(express.urlencoded({extended:false}))
  app.use(express.json())
  app.use(compression())
  app.use(helmet())
  app.use(cors())

  if (process.env.ENVIRONMENT !== 'prod') {
    app.use(morgan('dev'))
  }

  app.use(routes)

  const port = process.env.PORT || 5005
  app.listen(port, () => console.info(`> http://localhost:${port}`))
}

function closeApp(error) {
  console.error(error)
  process.exit(1)
}

mongoose.connect(process.env.MONGODB_URI).then(startApp).catch(closeApp)
