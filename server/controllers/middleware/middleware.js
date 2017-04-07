function middleware () {
  return function (req, res, next) {
    let bool = false
    if (bool) {
      req.message = 'hello world'
      next()
    } else {
      res.status(500)
      next(new Error('this is an error object'))
    }
  }
}

module.exports = middleware
