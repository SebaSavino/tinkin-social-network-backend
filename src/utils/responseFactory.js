// TODO: metrics, create an admin-dashboard 

exports.good = function (data, statusCode = 200, message = 'success') {

  return {
    statusCode,
    message,
    data
  }
}

exports.bad = function (error, statusCode = 500, message = 'error') {

  return {
    statusCode,
    message,
    error
  }
}
