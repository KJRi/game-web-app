// @flow
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserInfoSchema = new Schema({
  username: {
    type: String,
    unique: true,
    require: true
  },
  description: {
    type: String,
    default: 'lets put a smile on your face!'
  },
  birthday: {
    type: String
  },
  location: {
    type: Array
  },
  headerImg: {
    type: String,
    default: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
  }
})

module.exports = mongoose.model('UserInfo', UserInfoSchema)
