// @flows
const express = require('express')
const Fav = require('../models/fav')
const router = express.Router()

// 添加点赞
router.post('/add', (req, res) => {
  if (!req.body.username) {
    res.json({ success: false, message: '未登录' })
  } else {
    var newLike = new Fav({
      gameId: req.body.gameId,
      username: req.body.username
    })
    // 存储
    newLike.save((err) => {
      if (err) {
        return res.json({ success: false, message: '收藏失败!' })
      }
      res.json({ success: true, message: '收藏成功!' })
    })
  }
})
// 删除点赞
router.post('/delete', (req, res) => {
  if (!req.body.username) {
    res.json({ success: false, message: '未登录' })
  } else {
    var newLike = {
      gameId: req.body.gameId,
      username: req.body.username
    }
    // 删除
    Fav.remove(newLike, (err) => {
      if (err) {
        return res.json({ success: false, message: '取消收藏失败!' })
      }
      res.json({ success: true, message: '取消收藏成功!' })
    })
  }
})
// 获取用户点赞
router.get('/getByUser', (req, res) => {
  Fav.find({ 'username': req.query.username }).sort({ _id: -1 }).exec().then((like) => {
    return res.json(like)
  })
})

// 查看是否点赞过
router.get('/getBy', (req, res) => {
  Fav.find({ 'gameId': req.query.gameId, 'username': req.query.username }).sort({ _id: -1 }).exec().then((like) => {
    return res.json(like)
  })
})

module.exports = router
