const passport = require('passport')
const GithubStrategy = require('passport-github').Strategy

const  GITHUB_CONFIG =
{
  clientID: '325c9a0fb44c6710cff4',
  clientSecret: 'd1500b41331b0ae9e469db51afd2232f69876882',
  callbackURL: 'http://localhost:9090/api/user/github/callback'
}



module.exports = () => {

  passport.serializeUser((user, cb) => cb(null, user)) //仅有id被保存在里面
  passport.deserializeUser((obj, cb) => cb(null, obj))


  passport.use(new GithubStrategy(GITHUB_CONFIG,
    function(accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
    } ))
}
