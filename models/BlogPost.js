const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title: String,
    body: String
})

// Access the database via mongoose.model()
const BlogPost = mongoose.model('BlogPost', BlogPostSchema) 

module.exports = BlogPost