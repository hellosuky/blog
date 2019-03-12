const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')
const http = require('http')
const socketio = require('socket.io')
const compression = require('compression')
const passportInit = require('./utils/passport.init')
const UserRouter = require('./router/user.router')
const TagRouter = require('./router/tag.router')
const BlogRouter = require('./router/blog.router')
const UploadRouter = require('./router/upload.router')

const server = http.Server(app) //将app和socket链接一起
app.use(bodyParser.json({limit:'50mb'}))
app.use(bodyParser.urlencoded({limit:'50mb',extended:true,parameterLimit:50000}))
app.use(cookieParser('sessionId'))
app.use(compression())
app.use(session({
  secret:'sessionId',
  cookie:{maxAge:60*60*60*1000*60},
  resave:true,
  saveUninitialized: true
}))
app.use(passport.initialize()) //initialize passport
passportInit()
app.use('/upload',express.static('upload'))


//路由管理
app.use('/api/user',UserRouter)
app.use('/api/tag',TagRouter)
app.use('/api/blog',BlogRouter)
app.use('/upload',UploadRouter)

//connect socket.io
const io = socketio(server)
app.set("io",io) //设定储存值嘻嘻

//connect to mongodb
mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb+srv://suky:suky@cluster0-lvdtm.mongodb.net/test?retryWrites=true', {useNewUrlParser: true})
mongoose.connection.on('connected',() => console.log('mongodb is now connected'))

const PORT =process.env.PORT || 9090
server.listen(PORT,() => console.log(`we are now listening to ${PORT}`))
