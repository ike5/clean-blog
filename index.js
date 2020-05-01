const express = require('express') // #A1
const path = require('path') // 

const app = new express() // #A2
const ejs = require('ejs') // #B1
app.set('view engine', 'ejs') // #B2
app.use(express.static('public')) // #A4

const PORT = 4000
app.listen(PORT, () => { // #A3
    console.log(`App listening on port ${PORT}`)
})


app.get('/', (req, res) => { // #A5
    res.render('index')  // #B3
})

app.get('/index', (req, res) => { // #A6
    res.sendFile(path.resolve(__dirname, 'pages/index.html'))
})

app.get('/about', (req, res) => { // #A7
    res.sendFile(path.resolve(__dirname, 'pages/about.html'))
})

app.get('/contact', (req, res) => { // #A8
    res.sendFile(path.resolve(__dirname, 'pages/contact.html'))
})

app.get('/post', (req, res) => { // #A9
    res.sendFile(path.resolve(__dirname, 'pages/post.html'))
})

// Do I need an extra get for about and about.html? Yes unless 
// you change the href links in index.html

// app.get('/index.html', (req, res) => { // #6
//     res.sendFile(path.resolve(__dirname, 'pages/index.html'))
// })

// app.get('/about.html', (req, res) => { // #7
//     res.sendFile(path.resolve(__dirname, 'pages/about.html'))
// })

// app.get('/contact.html', (req, res) => { // #8
//     res.sendFile(path.resolve(__dirname, 'pages/contact.html'))
// })

// app.get('/post.html', (req, res) => { // #9
//     res.sendFile(path.resolve(__dirname, 'pages/post.html'))
// })