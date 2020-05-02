const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title: String,
    description: String,
    username: String,
    datePosted: {/* can declare property type with an object
    like this because we need the 'default' */
        type: Date,
        default: new Date()
    }
})

// Access the database via mongoose.model()
const BlogPost = mongoose.model('BlogPost', BlogPostSchema)

module.exports = BlogPost