const express = require('express')
const path = require('path')
const multer = require('multer')
const fs = require('fs')
const Router = express.Router()

const storage = multer.diskStorage({
   destination: "upload/",
   filename: function(req, file, cb){
      cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
   }
})

const upload = multer({
   storage: storage,
   limits:{fileSize: 1000000},
})

Router.post('/cover',upload.single('cover'),function(req,res){
  res.json({code:0,data:req.file})
})

Router.post('/delete',function(req,res){
  let {url} = req.body
  console.log(url)
  fs.unlink(url,(err) => {
    if (err) throw err;
  console.log('path/file.txt was deleted');
  })
})
module.exports = Router
