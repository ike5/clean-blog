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

const customMiddleware = (req, res, next) => {
    console.log("Custom middleware called...")
    next()
}
app.use(customMiddleware)

const fileUpload = require('express-fileupload')
app.use(fileUpload())

const validateMiddleware = (req, res, next) => {
    if(req.files == null || req.body.title == null || req.body.description == null){
        console.log('Something went wrong...')
        return res.redirect('/posts/new/')
    }
    next()
}
app.use('/posts/store/', validateMiddleware)



const PORT = 4000
app.listen(PORT, () => { // #A3
    console.log(`App listening on port ${PORT}`)
})


app.get('/', async (req, res) => {
    const blogposts = await BlogPost.find({})
    res.render('index', {
        blogposts
    })
    // console.log(blogposts)
})

app.get('/post/:id', async (req, res) => {
    const blogpost = await BlogPost.findById(req.params.id)
    res.render('post', {
        blogpost
    })
})


const indexPageController = require('./controllers/indexPage')
app.get('/index', indexPageController)

const newPostController = require('./controllers/newPost')
app.get('/posts/new', newPostController)


const BlogPost = require('./models/BlogPost')

app.post('/posts/store', async (req, res) => {
    let image = req.files.image
    image.mv(path.resolve(__dirname, 'public/img', image.name), async (error) => {
        await BlogPost.create({
            ...req.body,
            image: '/img/' + image.name
        })
        res.redirect('/')
    })
})

// app.post('/posts/store', async (req,res) =>{
//     await BlogPost.create(req.body, (error, blogpost) =>{
//         res.redirect('/posts/new')
//     })
// })



