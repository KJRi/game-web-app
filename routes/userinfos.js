// @flows
const express = require('express')
const UserInfo = require('../models/userinfo')
const project = require('../config/project.config')
const router = express.Router()

// 存储、更改资料
router.post('/editInfo', (req, res) => {
  if (!req.body.username) {
    res.json({ success: false, message: '未登录' })
  } else {
    var newUserInfo = {
      description: req.body.description,
      birthday: req.body.birthday,
      location: req.body.location,
      headerImg: req.body.imageUrl
    }
    // 存储用户信息
    UserInfo.update({ username: req.body.username }, newUserInfo, {
      upsert: true
    }, (err) => {
      if (err) {
        return res.json({ success: false, message: '储存信息失败!' })
      }
      res.json({ success: true, message: '成功存储信息!' })
    })
  }
})
// 用户名读取资料
router.get('/get', (req, res) => {
  UserInfo.findOne({ 'username': req.query.username }, (err, info) => {
    if (err) {
      throw err
    }
    return res.json(info)
  })
})

module.exports = router
