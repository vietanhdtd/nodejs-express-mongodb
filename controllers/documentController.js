const Document = require('../models/document')
const { cloudinary, cloudinary_upload_config } = require('../middleware/upload')

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

const addDocument = async (req, res, next) => {
  const user = req.user
  try {
    const result = await cloudinary.uploader.upload(req.file.path, cloudinary_upload_config)
    const doc = new Document({
      title: req.body.title,
      description: req.body.description,
      file: {
        path: result.secure_url,
        originalname: req.file.originalname,
        public_id: result.public_id,
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
  } catch (error) {
    res.status(400).json({ error: 'Upload file failed' })
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

const updateDocument = async (req, res, next) => {
  const user = req.user
  try {
    const docs = await Document.findById(req.body.id);
    await cloudinary.uploader.destroy(docs.file.public_id)
    const result = await cloudinary.uploader.upload(req.file.path, cloudinary_upload_config)

    const newDocs = {
      title: req.body.title,
      description: req.body.description,
      file: {
        path: result.secure_url,
        originalname: req.file.originalname,
        public_id: result.public_id,
        size: req.file.size
      },
      userId: user._id
    }

    Document.findByIdAndUpdate(req.body.id, newDocs, { new: true }).then(response => {
      res.json({
        message: 'Update documents success',
        response
      })
    }).catch(e => res.json({ error: e }))

  } catch (error) {
    res.json(error)
  }

}

module.exports = {
  getDocuments,
  addDocument,
  deleteDocuments,
  updateDocument
}
