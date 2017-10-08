const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/photobook')

const photoSchem = new mongoose.Schema({
    title: String,
    date: String,
    color: String,
    labels: Array,
    path: String,
})

const adminUser = new mongoose.Schema({
    name: String,
    password: String,
})

const Models = {
    photos: mongoose.model('photo',photoSchem),
    admin: mongoose.model('admin',adminUser)
}

module.exports = Models