const express = require('express')
const router = express.Router()
const db = require('./database')

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
router.post('/api/savePic', function (req, res) {
  console.log(req)
  console.log("---------------")
  console.log(req.body)
  console.log("---------------")
  new db.photos(req.body.picInfo).save(function (err) {
    if (err) {
      res.status(500).send()
      return
    }
    res.send()
  })
})

module.exports = router