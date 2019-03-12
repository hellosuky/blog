const proxy = require('http-proxy-middleware')

module.exports = function(app){
  app.use(
    proxy('/api/**',{
      target:'http://localhost:9090/',
      changeOrigin:true
    })
  ),
  app.use(
    proxy('/upload/**',{
      target:'http://localhost:9090/',
      changeOrigin:true
    })
  )
}
