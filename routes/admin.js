const path = require('path')
const router = require('express').Router()
const fs = require('fs')

const rootDirectory = require('../util/path')

const data = []

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
    fs.readFile('notes.txt', 'utf8', (err, data) => {
        let notes = []

        if(!err){
            try{
                notes = JSON.parse(data)
            }catch(e){
                fs.writeFileSync("wishes.txt", [])
                notes = []
            }
        }
        data = notes

        res.render('read-message', { data: notes })
    })
})

//route post /message (manage submit form)
router.post('/notes', (req, res, next) => {
    let notes = {
        name: req.body.name,
        note: req.body.note
    }
    data.push(notes)
    fs.writeFile('notes.txt', JSON.stringify(data), (err) => {
        if (err) throw err
        res.status(302).redirect('/')
    })

})



module.exports = router