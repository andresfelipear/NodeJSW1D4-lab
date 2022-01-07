// const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const admin = require('./routes/admin')
const path = require('path')
const rootDirectory = require('./util/path')


const app = express()
app.set('view engine', 'ejs')

//middleware

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static('./public')) //serve files statically
app.use(admin)
app.use((req,res,next) => {
    res.status(404).sendFile(path.join(rootDirectory, 'views', '404.html'))
})


app.listen(8000)

