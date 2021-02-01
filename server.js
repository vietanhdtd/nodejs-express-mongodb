require("dotenv").config();
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyparser = require('body-parser')
const { sendResponse } = require('./helper/helpers')
const fetchComic = require('./app/blogtruyen')
const UserRoute = require('./routes/usersRoute')
const DocumentRoute = require('./routes/documentRoute')



mongoose.connect(process.env.MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})

const db = mongoose.connection

db.once('open', () => {
  console.log('db connectiion open');
})

const app = express()
app.use(morgan('dev'))
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

const PORT = process.env.PORT || '3000'

app.listen(PORT, () => {
  console.log('serve ruuning with ' + PORT);
})

app.use('/api/user', UserRoute)
app.use('/api/document', DocumentRoute)

app.use('/crawl', (_, res) => {
  sendResponse(res)(fetchComic());
})
