const express = require('express')
const mongoo = require('mongoose')
const morgan = require('morgan')
const bodyparser = require('body-parser')

const UserRoute = require('./routes/usersRoute')
const DocumentRoute = require('./routes/documentRoute')



mongoo.connect(`mongodb+srv://vietanhdtd:${process.env.MONGO_PASSWORD}@cluster0.icth6.mongodb.net/tony-nguyen?retryWrites=true&w=majority`, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})

const db = mongoo.connection

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
