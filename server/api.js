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

module.exports = router