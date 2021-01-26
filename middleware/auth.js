const jwt = require('jsonwebtoken')

function Authenticate(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1] // Bearer + token
    const { user } = jwt.verify(token, 'AzQ,PI)0(')

    req.user = user
    next()
  }
  catch (e) {
    res.json({
      message: 'Token invalid'
    })
  }
}

module.exports = Authenticate
