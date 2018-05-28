// @flows
const express = require('express')
const Game = require('../models/game')
const router = express.Router()

// 获取all游戏
router.get('/all', (req, res) => {
  Game.find({}).sort({ _id: -1 }).exec().then((Games) => {
    return res.json(Games)
  }
)
})
// 根据值获取游戏
router.get('/get', (req, res) => {
  if (req.query.tag) {
    Game.find({ 'tag': req.query.tag }).sort({ _id: -1 }).exec().then((Games) => {
      return res.json(Games)
    })
  } else if (req.query.GameId) {
    Game.findById(req.query.GameId).exec().then((Games) => {
      return res.json(Games)
    })
  } else if (req.query.name) {
    var reg = new RegExp(req.query.name)
    Game.find({ 'name': reg }).sort({ _id: -1 }).exec().then((Games) => {
      return res.json(Games)
    })
  } else {
    Game.find({}).sort({ _id: -1 }).exec().then((Games) => {
      return res.json(Games)
    })
  }
})
module.exports = router
