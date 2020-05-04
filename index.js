const express = require('express')
const app = new express()
const ejs = require('ejs')
const fileUpload = require('express-fileupload')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const PORT = 4000

mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true })

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())

const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const validateMiddleware = require('./middleware/validationMiddleware')

app.use('/posts/store', validateMiddleware)

app.get('/post/:id', getPostController)
app.get('/', homeController)
app.get('/posts/store', storePostController)
app.get('/posts/new', newPostController)

app.listen(PORT, () => { console.log(`App listening on port ${PORT}`) })