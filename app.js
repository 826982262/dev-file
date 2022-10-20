const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
// const {MAX_FILE_SIZE} = require('./config/config.default.js');
const logger = require('koa-logger')
const koaBody = require('koa-body');
const { koaSwagger } = require('koa2-swagger-ui');

const error = require('koa-json-error')
const index = require('./routes/index')
// const swagger = require('./routes/swagger')

// error handler
onerror(app)
app.use(koaBody());
app.use(error())
app.use(json())
app.use(logger())

app.use(require('koa-static')(__dirname + '/public'))

// app.use(swagger.routes(), swagger.allowedMethods())

app.use(koaSwagger({
  routePrefix: '/swagger/index.html',
  swaggerOptions: {
    url: '/swagger.json',
  },
}),
)


// 文件上传
// app.use(koaBody({
//     multipart: true,
//     formidable: {
//         maxFileSize: MAX_FILE_SIZE    // 设置上传文件大小最大限制，默认2M
//     }
// }));




app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
