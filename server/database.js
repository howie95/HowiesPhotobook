const mongoose = require('mongoose')
mongoose.Promise = global.Promise 
mongoose.connect('mongodb://localhost:27017/photobook',{useMongoClient: true},function(err){
    if(err){console.log("数据库连接失败！")}
    else{console.log("数据库连接成功！")}
})

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