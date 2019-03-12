const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TagSchema =  new Schema({
  tag:{type:String,required:true},
  front:{type:Boolean,default:false}
})

module.exports = mongoose.model('Tag',TagSchema)
