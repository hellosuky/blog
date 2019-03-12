const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BlogSchema =  new Schema({
  title:{type:String,required:true},
  description:{type:String,required:true},
  created_time:{type:Date,default:new Date()},
  view_count:{type:Number,default:0},
  likes:[{type:mongoose.Schema.ObjectId,ref:'User'}],
  collects:[{type:mongoose.Schema.ObjectId,ref:'User'}],
  tags:[{type:mongoose.Schema.ObjectId,ref:'Tag'}],
  isPublish:{type:Boolean,default:false},
  comments:[
    {
      user_id:{type:mongoose.Schema.ObjectId,ref:'User'},
      content:{type:String,required:true},
      created_time:{type:Date,default:new Date()}
    }
  ],
  cover:{type:String}
})


module.exports = mongoose.model('Blog',BlogSchema)
