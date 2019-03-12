const express = require('express')
const Router = express.Router()
const utils = require('utility')
const passport = require('passport')
const User = require('../schemas/user.schemas')

//encrypt pwd
function encryptPwd(pwd){
    const salt = '&*()TREbdbgbfjsrgknfewnf肥婷很可爱'
    return utils.md5(utils.md5(pwd + salt))
}

Router.post('/login',function(req,res){
  let {username,pwd} = req.body
  User.findOne({'name':username,'pwd':encryptPwd(pwd)},{pwd:0},(err,doc) => {
    if(err){
      res.json({code:1,msg:'该用户不存在'})
      return
    }
      req.session.user_id = doc._id
      res.json({code:0,data:doc,msg:'登录成功'})
  })
})

Router.post('/register',function(req,res){
  let {username,pwd} = req.body
  User.findOne({'name':username},{pwd:0},(err,doc) => {
    if(doc){
      res.json({code:1,msg:'该账号已被注册'})
    }else{
      let newUser = new User({'name':username,'pwd':encryptPwd(pwd)})
      newUser.save(function(err,doc){
        req.session.user_id = doc._id
        res.json({code:0,data:doc,msg:'注册成功'})
      })
    }
  })
})

Router.get('/auth',function(req,res){
  if(req.session.user_id){
    User.findOne({'_id':req.session.user_id},(err,doc) =>{
      if(doc){
        res.json({code:0,data:doc,msg:'登录成功'})
      }else{
        res.json({code:1,msg:'登录失败'})
      }
    })
  }else{
    res.json({code:0,msg:'没有登录状态',data:{}})
  }
})

Router.get('/logout',function(req,res){
  if(req.session.user_id){
    req.session.destroy(function(err){
      if(err){
        res.json({code:1,msg:'服务端出错'})
        return
      }
      res.clearCookie('sessionId')
      res.json({code:0,msg:'退出成功'})
    })
  }
})

Router.get('/all',function(req,res){
  User.find({}).select('name type')
  .exec(function(err,results){
    if(err){
      res.json({code:1,msg:'服务端出错'})
      return
    }
    res.json({code:0,data:results})
  })
})

Router.post('/delete',function(req,res){
  let {id} = req.body
  User.deleteOne({'_id':id})
  .exec(function(err,results){
    if(err){
      res.json({code:1,msg:'服务端出错'})
      return
    }
    User.find({}).select('name type')
    .exec(function(err,results){
      if(err){
        res.json({code:1,msg:'服务端出错'})
        return
      }
      res.json({code:0,data:results,msg:'用户删除成功'})
    })
  })
})

Router.post('/type',function(req,res){
  let {id,type} = req.body
  User.updateOne({'_id':id},{'type':type})
  .exec(function(err,results){
    User.find({}).select('name type')
    .exec(function(err,results){
      if(err){
        res.json({code:1,msg:'服务端出错'})
        return
      }
      res.json({code:0,data:results,msg:'用户修改成功'})
    })
  })
})


Router.get('/github', (req, res, next) => {
  req.session.socketId = req.query.socketId
  next()
}, passport.authenticate('github'))

Router.get('/github/callback',  passport.authenticate('github'), (req, res) => {
  const io = req.app.get('io') //在get中就能获得io
  User.findOne({'mapToApp':req.user.username},function(err,doc){
    if(err){
      res.json({code:1,msg:'服务端出错'})
      return
    }
    if(doc){
      io.in(req.session.socketId).emit('github', doc)
    }else{
      let newUser = new User({'name':'用户_'+Date.now().toString(36),'mapToApp':req.user.username})
      newUser.save(function(err,doc){
        req.session.user_id = doc._id
        io.in(req.session.socketId).emit('github', doc)
      })
    }
  })

})


module.exports = Router
