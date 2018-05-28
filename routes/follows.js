// @flows
const express = require('express')
const Follow = require('../models/follow')
const router = express.Router()

// 添加关注
router.post('/add', (req, res) => {
  if (!req.body.username) {
    res.json({ success: false, message: '未登录' })
  } else {
    var newFollow = new Follow({
      follow: req.body.follow,
      username: req.body.username
    })
    // 存储
    newFollow.save((err) => {
      if (err) {
        return res.json({ success: false, message: '关注失败!' })
      }
      res.json({ success: true, message: '关注成功!' })
    })
  }
})
// 取消关注
router.post('/delete', (req, res) => {
  if (!req.body.username) {
    res.json({ success: false, message: '未登录' })
  } else {
    var newFollow = {
      follow: req.body.follow,
      username: req.body.username
    }
    // 删除
    Follow.remove(newFollow, (err) => {
      if (err) {
        return res.json({ success: false, message: '取消关注失败!' })
      }
      res.json({ success: true, message: '取消关注成功!' })
    })
  }
})
// 获取用户关注
router.get('/getByUser', (req, res) => {
  Follow.find({ 'username': req.query.username }).sort({ _id: -1 }).exec().then((Follow) => {
    return res.json(Follow)
  })
})
// 查看是否关注过
router.get('/getBy', (req, res) => {
  Follow.find({ 'follow': req.query.follow, 'username': req.query.username })
  .sort({ _id: -1 }).exec().then((Follow) => {
    return res.json(Follow)
  })
})

module.exports = router
