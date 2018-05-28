// @flow
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FavSchema = new Schema({
  username: {
    type: String,
    require: true
  },
  gameId: {
    type: String,
    require: true
  }
})

module.exports = mongoose.model('Fav', FavSchema)
