// @flows
const express = require('express')
const Comment = require('../models/comment')
const router = express.Router()

// 添加评论
router.post('/add', (req, res) => {
  if (!req.body.username) {
    res.json({ success: false, message: '未登录' })
  } else {
    var newComment = new Comment({
      post: req.body.postId,
      author: req.body.username,
      content: req.body.content
    })
    // 存储
    newComment.save((err) => {
      if (err) {
        return res.json({ success: false, message: '评论失败!' })
      }
      res.json({ success: true, message: '评论成功!' })
    })
  }
})
// 获取
router.get('/get', (req, res) => {
  Comment.find({ 'post': req.query.postId }).sort({ _id: -1 }).exec().then((comment) => {
    return res.json(comment)
  })
})

module.exports = router
