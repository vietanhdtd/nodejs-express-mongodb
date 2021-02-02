const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const getUsers = (req, res, next) => {
  User.find().then(response => {
    res.json({
      message: 'success',
      response
    })
  }).catch(e => res.json({ error: e }))
}

const registerUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (error, hashedPassword) => {
    if (error) {
      return res.json({ error })
    }

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      phone: req.body.phone
    })

    user.save().then(response => {
      res.json({
        message: 'Create user success',
        response
      })
    }).catch(e => res.json(e))

  })
}

const deleteUser = (req, res, next) => {
  User.findByIdAndDelete(req.params.id).then(() => {
    res.json({
      message: 'Delete user success'
    })
  }).catch(e => res.json({ error: e }))
}

const updateUser = (req, res, next) => {
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone
  }

  User.findByIdAndUpdate(req.body.id, user, { new: true }).then(response => {
    res.json({
      message: 'Update user success',
      response
    })
  }).catch(e => res.json({ error: e }))
}

const login = (req, res, next) => {
  const userName = req.body.userName
  const password = req.body.password

  User.findOne({ $or: [{ phone: userName }, { email: userName }] }).then(user => {
    if (user) {
      bcrypt.hash(password, user.password, (error, result) => {
        if (error) {
          return res.json({ error })
        }
        if (result !== user.password) {
          return res.json({
            message: 'Password does not match',
          })
        } else {
          const token = jwt.sign({ user }, 'AzQ,PI)0(', {})
          return res.json({
            message: 'Login successfully',
            token,
            user,
          })
        }
      })
    }
  })
}

// const logout = (req,)

module.exports = {
  getUsers,
  registerUser,
  deleteUser,
  updateUser,
  login
}
