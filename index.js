const express = require('express') // #1
const path = require('path') // 

const app = new express() // #2
app.use(express.static('public')) // #4

const PORT = 4000
app.listen(PORT, () => { // #3
    console.log(`App listening on port ${PORT}`)
})


app.get('/', (req, res) => { // #5
    res.sendFile(path.resolve(__dirname, 'pages/index.html'))
})

app.get('/index', (req, res) => { // #6
    res.sendFile(path.resolve(__dirname, 'pages/index.html'))
})

app.get('/about', (req, res) => { // #7
    res.sendFile(path.resolve(__dirname, 'pages/about.html'))
})

app.get('/contact', (req, res) => { // #8
    res.sendFile(path.resolve(__dirname, 'pages/contact.html'))
})

app.get('/post', (req, res) => { // #9
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