// @flow
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GameSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  headImg: {
    type: String,
    require: true
  },
  imageUrl: {
    type: Array,
    require: true
  },
  content: {
    type: String,
    require: true
  },
  tag: {
    type: String,
    require: true
  }
})

module.exports = mongoose.model('Game', GameSchema)
