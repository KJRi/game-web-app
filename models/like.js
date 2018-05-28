// @flow
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LikeSchema = new Schema({
  author: {
    type: String,
    require: true
  },
  post: {
    type: String,
    require: true
  }
})

module.exports = mongoose.model('Like', LikeSchema)
