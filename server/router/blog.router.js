const express = require('express')
const Router = express.Router()
const Blog = require('../schemas/blog.schemas')
const User = require('../schemas/user.schemas')

Router.get('/blogs',function(req,res){
  let {search,category,page,front} = req.query
  if(search){
    Blog.find({"title":new RegExp(search),"isPublish":true})
    .select('title created_time view_count comments cover likes collects description')
    .limit(10).skip(10 * (page - 1))
    .exec(function(err,results){
      res.json({code:0,data:results,msg:'搜索返回成功'})
    })
  }else if(category){
    Blog.find({"tags":{$in:[category]},"isPublish":true})
    .select('title created_time view_count comments cover likes collects description')
    .limit(10).skip(10 * (page - 1))
    .exec(function(err,results){
      res.json({code:0,data:results,msg:'搜索返回成功'})
    })
  }else if(category && search){
      Blog.find({"tags":{$in:[category]},"title":new RegExp(search),"isPublish":true})
      .select('title created_time view_count comments cover likes collects description')
      .limit(10).skip(10 * (page - 1))
      .exec(function(err,results){
        res.json({code:0,data:results,msg:'搜索返回成功'})
      })
  }else if(front){
    Blog.find({"isPublish":true})
    .select('title created_time view_count comments cover likes collects description')
    .limit(10).skip(10 * (page - 1))
    .exec(function(err,results){
      res.json({code:0,data:results,msg:'搜索返回成功'})
    })
  }else{
    Blog.find({})
    .select('title created_time view_count comments isPublish')
    .limit(10).skip(10 * (page - 1))
    .exec(function(err,results){
      res.json({code:0,data:results,msg:'搜索返回成功'})
    })
  }
})

Router.post('/addblog',function(req,res){
  let {title,content,selectedTags,url,isPublish} = req.body
  let newBlog = new Blog({title,'description':content,'tags':selectedTags,'cover':url,isPublish})
  newBlog.save().then(function(blog){
      res.json({code:0,msg:'博客新增成功'})
    })
})


Router.post('/deleteblog',function(req,res){
  let {blog_id} = req.body
  Blog.deleteOne({'_id':blog_id}).then(function(blog){
      res.json({code:0,msg:'博客删除成功'})
  })
})

Router.post('/updateblog',function(req,res){
  let {blog_id,title,content,selectedTags,url,isPublish} = req.body
  Blog.updateOne({'_id':blog_id},{title,'description':content,'tags':selectedTags,'cover':url,isPublish})
  .then(function(blog){
    res.json({code:0,msg:'博客修改成功'})
  })
})

Router.get('/detail',function(req,res){
  let {id} = req.query
  Blog.findOne({'_id':id}).populate({path:'comments.user_id',select:'name avatar -_id'})
  .exec(function(err,doc){
    if(err){
      res.json({code:1,msg:'客户端出错'})
    }else{
      res.json({code:0,data:doc,msg:'博客细节已获取'})
    }
  })
})

Router.get('/latest',function(req,res){
  Blog.find({"isPublish":true}).sort('created_time').select('title')
  .limit(5).exec(function(err,results){
    res.json({code:0,data:results,msg:'搜索返回成功'})
  })
})

Router.get('/addview',function(req,res){
  let {id} = req.query
  Blog.updateOne({'_id':id},{'$inc':{'view_count':1}},function(e,d){
    res.json({code:0,msg:'浏览数添加成功'})
  })
})

Router.get('/changelikes',function(req,res){
  let {id,like} = req.query
  if(like === 'true'){
   Blog.updateOne({'_id':id},{$push:{'likes':req.session.user_id}},function(e,d){
     User.updateOne({'_id':req.session.user_id},{$push:{'likes':id}},
     function(err,doc){
       if(err){
         res.json({code:1,msg:'服务端出错'})
         return
       }
       res.json({code:0,msg:'点赞成功'})
     })
   })
 }else{
   Blog.updateOne({'_id':id},{$pull:{'likes':req.session.user_id}},function(e,d){
     User.updateOne({'_id':req.session.user_id},{$pull:{'likes':id}},
     function(err,doc){
       if(err){
         res.json({code:1,msg:'服务端出错'})
         return
       }
       res.json({code:0,msg:'取消点赞成功'})
     })
   })
 }
})

Router.get('/changecollects',function(req,res){
  let {id,collect} = req.query
  if(collect === 'true'){
   Blog.updateOne({'_id':id},{$push:{'collects':req.session.user_id}},function(e,d){
     User.updateOne({'_id':req.session.user_id},{$push:{'collects':id}},
     function(err,doc){
       if(err){
         res.json({code:1,msg:'服务端出错'})
         return
       }
       res.json({code:0,msg:'收藏成功'})
     })
   })
 }else{
   Blog.updateOne({'_id':id},{$pull:{'collects':req.session.user_id}},function(e,d){
     User.updateOne({'_id':req.session.user_id},{$pull:{'collects':id}},
     function(err,doc){
       if(err){
         res.json({code:1,msg:'服务端出错'})
         return
       }
       res.json({code:0,msg:'取消收藏成功'})
     })
   })
 }
})

Router.post('/addcomments',function(req,res){
  let {blog_id,content} = req.body
  Blog.updateOne({'_id':blog_id},{$push:{comments:{'user_id':req.session.user_id,'content':content}}},function(e,d){
    if(e){
      res.json({code:1,msg:'服务端出错'})
      return
    }
    User.updateOne({'_id':req.session.user_id},{$push:{comments:{'_id':blog_id}}},function(err,doc){
      if(e){
        res.json({code:1,msg:'服务端出错'})
        return
      }
      Blog.findOne({'_id':blog_id})
      .populate({path:'comments.user_id',select:'name avatar -_id'})
      .select('title created_time view_count comments cover likes collects description')
      .exec(function(err,doc){
        if(err){
          res.json({code:1,msg:'服务端出错'})
          return
        }
        res.json({code:0,data:doc,msg:"添加评论成功"})
      })
    })
})
})

Router.post('/deletecomments',function(req,res){
  let {blog_id,comment_id} = req.body
  Blog.updateOne({'_id':blog_id},{$pull:{comments:{'_id':comment_id}}},function(e,d){
    if(e){
      res.json({code:1,msg:'服务端出错'})
      return
    }
    Blog.findOne({'_id':blog_id})
    .populate({path:'comments.user_id',select:'name avatar -_id'})
    .select('title created_time view_count comments cover likes collects description')
    .exec(function(err,doc){
      if(err){
        res.json({code:1,msg:'服务端出错'})
        return
      }
      res.json({code:0,data:doc,msg:"删除评论成功"})
    })
  })
})

Router.get('/viewmost',function(req,res){
  Blog.find({}).sort({'view_count':-1}).limit(5).exec(function(err,results){
    if(err){
      res.json({code:1,msg:'服务端出错'})
      return
    }
    res.json({code:0,data:results})
  })
})
module.exports = Router
