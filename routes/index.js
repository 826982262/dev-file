const router = require('koa-router')()
const ApiService = require('../service/swaggerService')

// 配置文件查找/api/doswagger/check
router.get('/api/doswagger/checkfiles', async (ctx, next) => {
  await ApiService.checkConfigFileService(ctx,next)
})
// 配置文件执行
router.post('/api/doswagger/execConfig', async (ctx, next) => {
  await ApiService.execFile(ctx,next)
})

//配置文件修改
router.post('/api/doswagger/deleteFile', async (ctx, next) => {
  await ApiService.deleteFile(ctx,next)
})


// 配置文件查看
router.post('/api/doswagger/lookupConfig', async (ctx, next) => {
  await ApiService.lookupConfig(ctx,next)
})


// 配置文件上传
router.post('/api/doswagger/upload', async (ctx, next) => {
  await ApiService.uploadFile(ctx,next)

});


module.exports = router
