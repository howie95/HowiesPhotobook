const express = require('express')
const router = express.Router()
const db = require('./database')
const multer = require('multer')
const check = require('./admincheck').checkAdmin

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './static')
  }, 
  filename: function (req, file, cb) {
    let fileFormat = (file.originalname).split(".")
    cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1])
  }
})  
const upload = multer({ storage:storage })

//获取所有图片
router.get('/api/photoList', function (req, res) {
  let page = parseInt(req.query.page)
  let pages = parseInt(req.query.pages)
  let skips = (page-1)*pages
  let photos = db.photos.find({}).sort({_id: -1}).skip(skips).limit(pages)
  photos.exec(function (err, docs) {
    if (err) {
      console.error(err)
      return
    }
    res.json(docs)
  })
})

//保存图片并把信息写入数据库
router.post('/api/savePic',upload.single('file'),function (req, res) {
  let picInfo = req.body
  picInfo.labels = []
  picInfo.path = req.file.filename
  new db.photos(picInfo).save(function (err) {
    if (err) {
      res.status(500).send()
      return
    }
    res.send()
  })
})

//检查是否存在账号
router.get('/api/hasadmin', function (req, res) {
  db.admins.find({}, function (err, docs) {
    if (err) {
      console.error(err)
      return
    }
    if(docs.length==0){
      res.json(0)
    }else{
      res.json(1)
    }
  })
})
//管理员注册
router.post('/api/signUp',function (req, res) {
  new db.admins(req.body).save(function (err) {
    if (err) {
      res.status(500).send()
      return
    }
    res.send()
  })
})
//管理员登陆
router.post('/api/signIn',function (req, res) {
  db.admins.findOne(req.body,function(err,doc){
    if(err){
      res.json({
        status:"1",
      })
    }else{
      if(doc){
        res.cookie("admin",doc.name,{
          path:'/',
          maxAge:1000*60*60*2
        })
        res.json({
          status:"0",
          result:{
            name:doc.name,
          }
        })
      }else{
        res.json({
          status:"2",
        })
      }
    }
  })
})
//管理员登出
router.post('/api/signout',function (req, res) {
  res.cookie("admin","",{
    path:'/',
    maxAge:-1
  })
  res.json({
    status:"0"
  })
})

module.exports = router