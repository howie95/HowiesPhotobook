const express = require('express')
const fs = require('fs')
const path = require('path')
const router = require('./server/api')
const app = express()

const resolve = file => path.resolve(__dirname, file)

app.use('/dist', express.static(resolve('./dist')))
app.use(router)

app.get('*', function (req, res) {
  let html = fs.readFileSync(resolve('./' + 'index.html'), 'utf-8')
  res.send(html)
})

app.listen(3000, function () {
  console.log('Photobook服务端已经在3000端口启动')
})