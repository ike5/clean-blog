/*
********************************************************
Posting Website
********************************************************
[info] Initialization
npm init
npm install express
npm install nodemon --save-dev

#0 Adjust package.json "scripts" to include:
    "start":"nodemon index.js"

[info] 'npm install' can be run to add all dependencies later.


#1 Create index.js file
#2 const express = require('express')
#3 const app = new express()

#4 app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})

#4 Create 'public' folder in root

#5 app.use(express.static('public'))

#6 Serve all static assets from 'public' folder. Move all:
.html files
css, img, js, vendor, etc.

**************************************************************
Website should work from here
**************************************************************

[info] Should serve files with specific routes using 'app.get'

#7 Create 'pages' folder in root
#8 Move all .html files from public here

[info] Set up routes by registering a 'get' route to serve home
HTML when browser asks.

#9 const path = require('path') //underneath const express

[info] Resolve all paths to 'pages' folder. For every '/' requested 'pages/index.html'

#10 app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/index.html'))
})


*************************************************************
Templating Engines EJS
*************************************************************

#1 npm install ejs --save

#2 +index.js under const app
const ejs = require('ejs')
app.set('view engine', 'ejs')

[info] Send/respond views to user via res.render('index'). Will
look in a 'views' folder for file called 'index.ejs'.

#3 Replace res.sendFile() with res.render()
app.get('/', (req, res) => { // #A5
    res.render('index') // #B3
})

#4 Render app.get as above for: about, contact, and post

#5 Rename 'pages' root folder to 'views'

#6 Rename:
'index.html' extention to 'index.ejs'
'about.html' extension to 'about.ejs'
'contact.html' extension to 'contact.ejs'
'post.html' extension to 'post.ejs'


#7 Create subfolder 'layouts' inside 'views' folder

#8 Extract <head>, <nav>, <footer>, and <script> HTML from index.ejs
into new files: 'header.ejs', 'navbar.ejs', 'footer.ejs', and 'scripts.ejs'

#9 In place of extracted sections use: (path relative to template)
<%- include('layouts/header') %>
<%- include('layouts/footer') %>
<%- include('layouts/navbar') %>
<%- include('layouts/scripts') %>


*************************************************************
Using MongoDB and Mongoose
*************************************************************
Download MongoDB Stable release
Download Mongo Compass Community edition

[info] Install Mongoose to talk to MongoDB from Node
#1 npm install mongoose

#2 +index.js
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true})


[info] Define a model
#3 Create 'models' folder in root directory
#4 In 'models' create 'BlogPost.js'

#5 +BlogPost.js
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title: String,
    body: String
})

// Access the database via mongoose.model()
[info] Use singular; Mongoose will create BlogPosts <--
const BlogPost = mongoose.model('BlogPost', BlogPostSchema)
module.exports = BlogPost


**********************************************************************
CRUD (Create, Read, Update, Delete) operations via Mongoose
**********************************************************************

[indo] Create test file in root directory: 'text.js'
#1 +text.js
const mongoose = require('mongoose')
const BlogPost = require('./models/BlogPost')
mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true })

BlogPost.create({
    title: "The Mythbusters Guide to the Galaxy",
    body: "If you have been here a while you might want to wait a little longer."
}, (error, blogpost) => {
    console.log(error, blogpost)
})

// ***********************************************************************
// Reading Data from MongoDB using Mongoose
// ***********************************************************************

[info] Select all documents
[info] Pass empty document as query (in first argument) in [find] method:

BlogPost.find({}, (error, blogpost) => {
    console.log(error, blogpost)
})


[info] Select all with specific title
BlogPost.find({
    title: 'Harry Potter'
}, (error, blogpost) => {
    console.log(error, blogpost)
})

[info] Select all with 'The' in title
BlogPost.find({
    title: /The/
}, (error, blogpost) => {
    console.log(error, blogpost)
})

[info] in SQL '/' acts as '%' wildcard

[info] Find specific post by id
var id = "laskdjflkj32l3jrl23kj23";
BlogPost.findById(id, (error, blogpost) => {
    console.log(error, blogpost)
})

// ***********************************************************************
// Updating Records from MongoDB using Mongoose
// ***********************************************************************
[info] Update Record
var id = "laksdjlfkaj2232"
BlogPost.findByIdAndUpdate(id, {
    title: "Blah updated title record"
}, (error, blogpost) => {
    console.log(error, blogpost)
})

// ***********************************************************************
// Delete Single Record from MongoDB using Mongoose
// ***********************************************************************

[info] Delete Single record
var id = "laksjdkflas"
BlogPost.findByIdAndDelete(id, (error, blogpost) => {
    console.log(error, blogpost)
})


*********************************************************************
Back to Business
*********************************************************************

#1 Create 'create.ejs' inside of 'views' folder
#2 Copy contents of 'contact.ejs' to 'create.ejs'
#3 Change <h1> of 'create.ejs' to say "Create New Post"

[info] Register route for 'create.ejs'
#4 +index.js
app.get('/posts/new', (req, res) => {
    res.render('create')
})

#5 [info] Add 'New Post' list item to the navbar.ejs navigation
<li class="nav-item">
    <a class="nav-link" href="/posts/new">New Post</a>
</li>

#6 Make sure all hrefs point to absolute references '/'
href="/blah/route/blash"

#7 Adjust forms to POST
<form action="/posts/store" method="POST">

DO NOT FORGET TO ADD name="title" to input
 <div class="control-group">
    <div class="form-group floating-label-form-group controls">
        <label>Title</label>
        <input type="text" class="form-control" placeholder="Title" id="title" name="title" required
                data-validation-required-message="Please enter a title.">
        <p class="help-block text-danger"></p>
        </div>
    </div>


[info] Handle the POST request
#8 +index.js
app.post('/posts/store', (req, res) => {
    console.log(req.body)
    res.redirect('/')
})

[info] Need to enable middleware body-parser for the above to parse from req.body
#9 [info] Install body-parser
npm install body-parser

#10 +index.js
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


****************************************************
Saving Posts to the Database
****************************************************

#1 +index.js
...
const BlogPost = require('./models/BlogPost')
...
app.post('/posts/store', (req, res) => {
    BlogPost.create(req.body, (error, blogpost) => {
        res.redirect('/')
    })
})

[info] Ensure that BlogPostSchema includes the actual names
of the form fields.
#2 Change BlogPostSchema in BlogPost.js --> remove 'body: String'
and add 'description: String'


*****************************************************
Database stuff additional
*****************************************************
[info] Use asynchronous calls to avoid callback hell
#1 Modify app.post to this: +index.js
app.post('/posts/store', async (req, res) => {
    await BlogPost.create(req.body)
    res.redirect('/')
})

**************************
Display List of Blog Posts
**************************

[info] Use BlogPost's find() method whenver homepage requested
#1 Modify app.get('/') +index.js
app.get('/', async (req, res) => {
    const blogposts = await BlogPost.find({})
    res.render('index', {
        blogposts: blogposts
    })
})

or alternatively (shorthand)

app.get('/', async (req, res) => {
    const blogposts = await BlogPost.find({})
    res.render('index', {
        blogposts
    })
    console.log(blogposts) -- to see all the stored blogposts
})


[info] Loop through posts to display via index.ejs
#2 index.ejs
    <% for(var i = 0; i < blogposts.length; i++){%> <----------
        <div class="post-preview">
          <h2 class="post-title">
            <%= blogposts[i].title %>               <----------
          </h2>

          <h3 class="post-subtitle">
            <%= blogposts[i].description %>         <----------
          </h3>
          </a>
          <p class="post-meta">Posted by
            <a href="#">Start Bootstrap</a>
            on September 24, 2019</p>
        </div>
        <hr>
    <% } %>                                         <----------

[info] how the above should look like in index.ejs
<!-- Main Content -->
  <div class="container">
    <div class="row">
      <div class="col-lg-8 col-md-10 mx-auto">
        <% for(var i = 0; i < blogposts.length; i++){%>
        <div class="post-preview">
          <h2 class="post-title">
            <%= blogposts[i].title %>
          </h2>
          <h3 class="post-subtitle">
            <%= blogposts[i].description %>
          </h3>
          </a>
          <p class="post-meta">Posted by
            <a href="#">Start Bootstrap</a>
            on September 24, 2019</p>
        </div>
        <hr>
        <% } %>

        <!-- Pager -->
        <div class="clearfix">
          <a class="btn btn-primary float-right" href="#">Older Posts &rarr;</a>
        </div>
      </div>
    </div>
  </div>


[info] Add href route of blogpost. (Get single pages for blogpost route)
  <% for(var i = 0; i < blogposts.length; i++){%>
        <div class="post-preview">
          <a href="/post/<%= blogposts[i]._id %>">     <--------------------
          ...
          </a> (right before </div>)


************************
Search and display
************************

[info] Add this to search titles for /title/ (ex)
BlogPost.find({
    title: /title/
}, (error, blogpost) => {
    console.log(error, blogpost)
})

#1 Add the above to app.get() to form this:

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

**********************
Single Blog Post Page
**********************
[info] change app.get('/post...) to:
[info] :id parameter represents a wildcard
#1 +index.js
app.get('/post/:id', async(req, res) =>{
    const blogpost = await BlogPost.findById(req.params.id)
    res.render('post', {
        blogpost
    })
})


(ex) Print out the params object in route
app.get('/post/:id', async (req, res) => {
    console.log(req.params)
})


#2 Use findById with params and render it to 'post.ejs'
app.get('/post/:id', async (req, res) => {
    const blogpost = await BlogPost.findById(req.params.id)
    res.render('post', {
        blogpost
    })
})
#3 +post.ejs  Add the following
<div class="post-heading">
    <h1>
        <%= blogpost.title %>               <----------
    </h1>
    <h2 class="subheading">
        <%= blogpost.description %>         <----------
    </h2>
        <span class="meta">Posted by<a href="#">Start Bootstrap</a> on August 24, 2019</span>
</div>


 <!-- Post Content -->
  <article>
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-md-10 mx-auto">
          <%= blogpost.description %>              <----------------
        </div>
      </div>
    </div>
  </article>

******************************************************
Adding Fileds to Schema
******************************************************
#1 +/models/BlogPost.js
const BlogPostSchema = new Schema({
    title: String,
    description: String,
    username: String,
    datePosted: {   //can declare property type with an object
                    //like this because we need the 'default' 
        type: Date,
        default: new Date()
    }
})

[info] Add username and date
#2 +index.ejs, +post.ejs
 <p class="post-meta">Posted by
    <a href="#"><%= blogposts[i].username %></a>
    on <%= blogposts[i].datePosted.toDateString() %>
</p>

<span class="meta">Posted by
    <a href="#"><%= blogpost.username %></a>
    on <%= blogpost.datePosted.toDateString() %>
</span>

********************
Uploading Images
********************
#1 npm install express-fileupload --save
#2 Add file upload field in post +create.ejs
...
<form action="/posts/store" method="POST" enctype="multipart/form-data" > (add enctype)
...
<div class="control-group">                                             <---add
    <div class="form-group floating-label-form-group controls">         <---add
        <label>Image</label>                                            <---add
        <input type="file" name="image" id="image" class="form-control"><---add
    </div>                                                              <---add
</div>                                                                  <---add

#3 +index.js 
// add anywhere near top
const fileUpload = require('express-fileupload')
app.use(fileUpload())

//modify previous app.post('/posts/store...)
app.post('/posts/store', async (req, res) => {
    let image = req.files.image
    image.mv(path.resolve(__dirname, 'public/img', image.name), async (error) => {
        await BlogPost.create(req.body)
        res.redirect('/')
    })
})

**********************************
Saving Uploaded images to Database
**********************************
#1 +BlogPost.js
const BlogPostSchema = new Schema({
...
image: String
...

#2 +index.js
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
*/