const mongoo = require('mongoose')

const Schema = mongoo.Schema

const DocumentsSchema = new Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  file: {
    type: Object,
    required: true
  },
  userId: {
    type: String,
  }
}, {
  timestamps: true
})

const Document = mongoo.model('docs', DocumentsSchema)

module.exports = Document
