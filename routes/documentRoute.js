const express = require('express')
const DocumentController = require('../controllers/documentController')
const Authenticate = require('../middleware/auth')
const upload = require("../services/upload")

const router = express.Router()

router.get('/', Authenticate, DocumentController.getDocuments)
router.post('/add', Authenticate, upload.single('file'), DocumentController.addDocument)
router.delete('/delete', Authenticate, DocumentController.deleteDocuments)

module.exports = router
