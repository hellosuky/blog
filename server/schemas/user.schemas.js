const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema =  new Schema({
  name:{type:String,required:true},
  pwd:{type:String},
  likes:[{type:mongoose.Schema.ObjectId,ref:'Blog'}],
  collects:[{type:mongoose.Schema.ObjectId,ref:'Blog'}],
  type:{type:String,default:'client'},
  avatar:{type:String},
  description:{type:String},
  mapToApp:{type:String}
})

module.exports = mongoose.model('User',UserSchema)
