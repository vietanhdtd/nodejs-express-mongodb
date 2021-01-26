const express = require('express')
const DocumentController = require('../controllers/documentController')
const Authenticate = require('../middleware/auth')

const router = express.Router()

router.get('/', Authenticate, DocumentController.getDocuments)
router.post('/add', Authenticate, DocumentController.addDocument)
router.delete('/delete', Authenticate, DocumentController.deleteDocuments)

module.exports = router
