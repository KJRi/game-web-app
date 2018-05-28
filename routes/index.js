// @flow
module.exports = (app) => {
  app.use('/api', require('./users')) // 在所有users路由前加/api
  app.use('/info', require('./userinfos'))
  app.use('/post', require('./posts'))
  app.use('/comment', require('./comments'))
  app.use('/like', require('./likes'))
  app.use('/follow', require('./follows'))
  app.use('/game', require('./games'))
  app.use('/fav', require('./favs'))
}
