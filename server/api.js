const express = require('express')
const router = express.Router()
const db = require('./database')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './static')
  }, 
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".")
    cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1])
  }
})  
const upload = multer({ storage:storage })

//获取所有图片
router.get('/api/photoList', function (req, res) {
  db.photos.find({}, function (err, docs) {
    if (err) {
      console.error(err)
      return
    }
    res.json(docs)
  })
})

//保存图片
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

module.exports = router