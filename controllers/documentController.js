const Document = require('../models/document')
const jwt = require('jsonwebtoken')

const getDocuments = (req, res, next) => {
  const user = req.user
  Document.find({
    userId: user._id
  }).then(response => {
    res.json({
      message: 'success',
      response
    })
  }).catch(e => res.json({ error: e }))
}

const addDocument = (req, res, next) => {
  const user = req.user
  if (req.file && req.file.path) {
    console.log('req: ', req.body);
    const doc = new Document({
      title: req.body.title,
      description: req.body.description,
      file: req.file.path,
      userId: user._id
    })

    doc.save().then(response => {
      res.json({
        message: 'Create Document success',
        response
      })
    }).catch(e => res.json({ error: e }))
  }
}

const deleteDocuments = (req, res, next) => {
  Document.findByIdAndDelete(req.params.id).then(response => {
    res.json({
      message: 'Delete document success',
      response
    })
  }).catch(e => res.json({ error: e }))
}

// const updateUser = (req, res, next) => {
//   const user = {
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password,
//     phone: req.body.phone
//   }

//   User.findByIdAndUpdate(req.body.id, { $set: user }).then(response => {
//     res.json({
//       message: 'Update user success',
//       response: user
//     })
//   }).catch(e => res.json({ error: e }))
// }

module.exports = {
  getDocuments,
  addDocument,
  deleteDocuments
}
