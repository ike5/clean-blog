const express = require('express')

const app = new express()
app.use(express.static('public'))

const PORT = 4000
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})