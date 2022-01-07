const path = require('path')
const router = require('express').Router()
const fs = require('fs')

const rootDirectory = require('../util/path')

const data

//router home
router.get('/', (req, res, next) => {
    res.sendFile(path.join(rootDirectory, 'views', 'index.html'))
})


//route write-message
router.get('/write', (req, res, next) => {
    res.sendFile(path.join(rootDirectory, 'views', 'write-message.html'))
})

//route read-message
router.get('/read', (req, res, next) => {
    fs.readFile('lect-01.txt','utf8', (err,data)=>{
        if (err) throw err
        res.render('read-message', {message:data})
    })
    
    // res.sendFile(path.join(rootDirectory, 'views', 'read-message.html'))
})

//route post /message (manage submit form)
router.post('/message', (req, res, next) => {
    const message = req.body.message
    fs.writeFile('lect-01.txt', message, (err) => {
    if (err) throw err
    res.statusCode = 302
    res.redirect('/read-message')
})

})



module.exports = router