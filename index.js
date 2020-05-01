const express = require('express')

const app = new express()


const PORT = 4000
app.listen(PORT, () =>{
    console.log(`App listening on port ${PORT}`)
})