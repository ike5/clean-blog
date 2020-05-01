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

// Select all documents
BlogPost.find({}, (error, blogpost) => {
    console.log(error, blogpost)
})

// Select specific titles
BlogPost.find({
    title: 'Harry Potter'
}, (error, blogpost) => {
    console.log(error, blogpost)
})

// [info] Select all with 'The' in title
BlogPost.find({
    title: /The/
}, (error, blogpost) => {
    console.log(error, blogpost)
})

var id = "laksjdlfkajl23lk2j3l4j"

// [info] Find specific post by id
BlogPost.findById(id, (error, blogpost) => {
    console.log(error, blogpost)
})

// [info] Update Record
BlogPost.findByIdAndUpdate(id, {
    title: "Blah updated title record"
}, (error, blogpost) => {
    console.log(error, blogpost)
})

// [info] Delete Single record
BlogPost.findByIdAndDelete(id, (error, blogpost) => {
    console.log(error, blogpost)
})