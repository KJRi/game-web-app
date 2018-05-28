// @flows
const express = require('express')
const Post = require('../models/post')
const router = express.Router()

// 发帖
router.post('/create', (req, res) => {
  if (!req.body.username) {
    res.json({ success: false, message: '未登录' })
  } else {
    var newPost = new Post({
      author: req.body.username,
      title: req.body.title,
      content: req.body.content,
      tag: req.body.tag
    })
    newPost.save((err) => {
      if (err) {
        return res.json({ success: false, message: '发帖失败!' })
      }
      res.json({ success: true, message: '发帖成功!' })
    })
  }
})
// 获取all帖子
router.get('/all', (req, res) => {
  Post.find({}).sort({ _id: -1 }).exec().then((posts) => {
    return res.json(posts)
  }
)
})
// 根据值获取帖子
router.get('/get', (req, res) => {
  if (req.query.tag) {
    Post.find({ 'tag': req.query.tag }).sort({ _id: -1 }).exec().then((posts) => {
      return res.json(posts)
    })
  } else if (req.query.postId) {
    Post.findById(req.query.postId).exec().then((posts) => {
      return res.json(posts)
    })
  } else if (req.query.author) {
    Post.find({ 'author': req.query.author }).sort({ _id: -1 }).exec().then((posts) => {
      return res.json(posts)
    })
  } else if (req.query.title) {
    var reg = new RegExp(req.query.title)
    Post.find({ 'title': reg }).sort({ _id: -1 }).exec().then((posts) => {
      return res.json(posts)
    })
  } else {
    Post.find({}).sort({ _id: -1 }).exec().then((posts) => {
      return res.json(posts)
    })
  }
})
module.exports = router
