// @flow
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserFollowSchema = new Schema({
  username: {
    type: String,
    require: true
  },
  follow: {
    type: String,
    require: true
  }
})

module.exports = mongoose.model('Follow', UserFollowSchema)
