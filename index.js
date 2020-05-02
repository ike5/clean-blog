const express = require('express') // #A1
const path = require('path') // 

const app = new express() // #A2
const ejs = require('ejs') // #B1
app.set('view engine', 'ejs') // #B2
app.use(express.static('public')) // #A4

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true }) //it doesn't matter what I put!

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const PORT = 4000
app.listen(PORT, () => { // #A3
    console.log(`App listening on port ${PORT}`)
})


// app.get('/', async (req, res) => {
//     const blogposts = await BlogPost.find({})
//     res.render('index', {
//         blogposts
//     })
//     console.log(blogposts)
// })

app.get('/', async (req, res) => {
    const blogposts = await BlogPost.find({
        title: /title/
    }, (error, blogpost) => {
        console.log(error, blogpost)
    })
    res.render('index', {
        blogposts
    })
    console.log(blogposts)
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

app.get('/post/:id', async (req, res) => {
    const blogpost = await BlogPost.findById(req.params.id)
    res.render('post', {
        blogpost
    })
})


app.get('/posts/new', (req, res) => {
    res.render('create')
})


const BlogPost = require('./models/BlogPost')

app.post('/posts/store', async (req, res) => {
    await BlogPost.create(req.body)
    res.redirect('/')
})

