const express = require('express')
const Router = express.Router()
const Tag = require('../schemas/tag.schemas')

//add tags
Router.post('/addtag',function(req,res){
  let {content} = req.body
  Tag.findOne({'tag':content},function(err,doc){
    if(doc){
      res.json({code:1,msg:"该标签已存在"})
    }else{
      let newTag = new Tag({'tag':content})
      newTag.save().then(function(tag){
        Tag.find({},function(e,d){
          if(!e){
            res.json({code:0,data:d,msg:'标签新增成功'})
          }
        })
      })
  }
  })
})

//delete tags
Router.post('/deletetag',function(req,res){
  let {id} = req.body
  Tag.deleteOne({'_id':id},function(err,doc){
    if(err){
      res.json({code:1,msg:'服务端出错'})
    }else{
      Tag.find({},function(e,d){
        if(e){
          res.json({code:1,msg:'服务端出错'})
        }else{
          res.json({code:0,data:d,msg:'删除标签成功'})
        }
      })
    }
  })
})

//set as front tag
Router.post('/settag',function(req,res){
  let {id,front} = req.body
  Tag.findOne({'_id':id},function(err,doc){
    if(err){
      res.json({code:1,msg:'服务端出错'})
    }else{
      Tag.updateOne({'_id':id},{'front':front})
      .then(function(item){
        Tag.find({},function(e,d){
          if(e){
            res.json({code:1,msg:'服务端出错'})
          }else{
            res.json({code:0,data:d,msg:'修改标签成功'})
          }
        })
      })
    }
  })
})

//get tag
Router.get('/tags',function(req,res){
  Tag.find({},function(err,doc){
    if(err){
      res.json({code:1,msg:'服务端出错'})
    }else{
      res.json({code:0,data:doc})
    }
  })
})
module.exports = Router
