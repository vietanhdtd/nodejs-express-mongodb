const mongoo = require('mongoose')

const Schema = mongoo.Schema

const UserSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String
  },
  password: {
    type: String,
  },
  phone: {
    type: String
  },
}, {
  timestamps: true
})

const User = mongoo.model('users', UserSchema)

module.exports = User
