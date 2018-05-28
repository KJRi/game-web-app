// @flow
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
  author: {
    type: String,
    require: true
  },
  post: {
    type: String,
    require: true
  },
  content: {
    type: String,
    require: true
  },
  commentTime: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('Comment', CommentSchema)
