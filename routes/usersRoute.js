const express = require('express')
const UserController = require('../controllers/usersController')

const router = express.Router()

router.get('/', UserController.getUsers)
router.post('/create', UserController.registerUser)
router.post('/update', UserController.updateUser)
router.post('/login', UserController.login)
router.delete('/delete/:id', UserController.deleteUser)

module.exports = router
