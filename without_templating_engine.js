
/**
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

*****************************************
Website should work from here
*****************************************

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
*/
