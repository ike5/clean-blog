/**
 * ********************************************************
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
<% - include('layouts/header') %>
<% - include('layouts/footer') %>
<% - include('layouts/navbar') %>
<% - include('layouts/scripts') %>


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
mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true})

BlogPost.create({
    title: "The Mythbusters Guide to the Galaxy",
    body: "If you have been here a while you might want to wait a little longer."
})
*/
