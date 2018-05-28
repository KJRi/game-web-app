// @flow
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
  author: {
    type: String,
    require: true
  },
  title: {
    type: String,
    require: true
  },
  content: {
    type: String,
    require: true
  },
  postTime: {
    type: Date,
    default: Date.now()
  },
  tag: {
    type: String,
    require: true
  }
})

module.exports = mongoose.model('Post', PostSchema)
