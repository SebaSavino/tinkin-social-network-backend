exports.devLogger = function (id, content, level = 'info') {
  if (process.env.ENVIRONMENT !== 'prod') {
    const logger = level === 'info' ? console.info : console.error

    if (content) {
      if (Array.isArray(content)) {
        content.forEach(log => log && logger(id, log))
      } else {
        logger(id, content)
      }
    } else {
      logger(id)
    }
  }
}
