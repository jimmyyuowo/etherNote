/**
 * 应用入口文件
 */
const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')

// import models
var controller = require('./controllers/controller')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// routes
app.post('/signup', controller.signup)
app.post('/signin', controller.signin)
app.get('/getNote/:username', controller.getNote)
app.post('/updateNote/:username', controller.updateNote)
app.get('/getUserCount', controller.getUserCount)
app.use('/', express.static(path.join(__dirname, 'public')))

// run
app.listen(3000, () => console.log('Example app listening on port 3000!'))
