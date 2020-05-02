const express = require('express') // #A1
const path = require('path') // 

const app = new express() // #A2
const ejs = require('ejs') // #B1
app.set('view engine', 'ejs') // #B2
app.use(express.static('public')) // #A4

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true }) //it doesn't matter what I put!

const PORT = 4000
app.listen(PORT, () => { // #A3
    console.log(`App listening on port ${PORT}`)
})


app.get('/', (req, res) => { // #A5
    res.render('index')  // #B3
})

app.get('/index', (req, res) => { // #A6
    res.render('index')
})

app.get('/about', (req, res) => { // #A7
    res.render('about')
})

app.get('/contact', (req, res) => { // #A8
    res.render('contact')
})

app.get('/post', (req, res) => { // #A9
    res.render('post')
})

app.get('/posts/new', (req, res) => {
    res.render('create')
})

app.post('/posts/store', (req, res) => {
    console.log(req.body)
    res.redirect('/')
})

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))