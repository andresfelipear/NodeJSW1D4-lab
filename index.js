// const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const admin = require('./routes/admin')


const app = express()
app.set('view engine', 'ejs')

//middleware

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static('./public')) //serve files statically
app.use(admin)



app.listen(8000)

