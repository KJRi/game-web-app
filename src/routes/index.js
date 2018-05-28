// @flow
// We only need to import the modules necessary for initial render
import Home from './Home'
import Personal from './Personal'
import Circle from './Circle'
import Detail from './Detail'
import Login from './Login'
import Register from './Register'
import EditPost from './EditPost'
import EditUserInfo from './EditUserInfo'
import TagPost from './TagPost'
import Post from './Post'
import Game from './Game'
import MyLike from './MyLike'
import MyFollow from './MyFollow'
import MyFav from './MyFav'
import GameDetail from './GameDetail'
// Force import during development to enable Hot-Module Replacement
// not need ?

export default {
  myLike: MyLike,
  gameDetail: GameDetail,
  myFav: MyFav,
  myFollow: MyFollow,
  post: Post,
  game: Game,
  editUserInfo: EditUserInfo,
  tagPost: TagPost,
  register: Register,
  editPost: EditPost,
  login: Login,
  home: Home,
  circle: Circle,
  personal: Personal,
  detail: Detail
}
