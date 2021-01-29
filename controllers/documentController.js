const Document = require('../models/document')
const { cloudinary } = require('../middleware/upload')

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
    console.log('req: ', req);
    const doc = new Document({
      title: req.body.title,
      description: req.body.description,
      file: {
        path: req.file.path,
        originalname: req.file.originalname,
        public_id: req.file.filename,
        size: req.file.size
      },
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
  Document.findByIdAndDelete(req.body.id).then(response => {
    cloudinary.uploader.destroy(response.file.public_id)
    res.json({
      message: 'Delete document success',
      // response
    })
  }).catch(e => res.json({ error: e }))
}

const updateDocument = (req, res, next) => {
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone
  }

  User.findByIdAndUpdate(req.body.id, { $set: user }, { new: true }).then(response => {
    cloudinary.uploader.destroy(response.file.public_id)
    res.json({
      message: 'Update user success',
      response
    })
  }).catch(e => res.json({ error: e }))
}

module.exports = {
  getDocuments,
  addDocument,
  deleteDocuments,
  updateDocument
}
