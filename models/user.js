const mongoo = require('mongoose')

const Schema = mongoo.Schema

const validateEmail = function (email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

const UserSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'User email required'],
    unique: true,
    validate: [validateEmail, 'Please fill a valid email address'],
  },
  password: {
    type: String,
  },
  phone: {
    type: String,
    required: [true, 'User phone number required'],
    unique: true
  },
}, {
  timestamps: true
})

const User = mongoo.model('users', UserSchema)

module.exports = User
