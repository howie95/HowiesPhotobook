const mongoose = require('mongoose')
mongoose.Promise = global.Promise 
mongoose.connect('mongodb://localhost:27017/photobook')

const photoSchem = new mongoose.Schema({
    title: String,
    date: String,
    color: String,
    labels: String,
    path: String,
})

const adminUser = new mongoose.Schema({
    name: String,
    password: String,
})

const Models = {
    photos: mongoose.model('photo',photoSchem),
    admins: mongoose.model('admin',adminUser)
}

module.exports = Models