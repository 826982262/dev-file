const router = require('koa-router')()
const ApiService = require('../service/swaggerService')

// 配置文件查找/api/doswagger/check
router.get('/api/doswagger/checkfiles', async (ctx, next) => {
  await ApiService.checkConfigFileService(ctx,next)
})
// 配置文件执行
//配置文件修改
// 配置文件删除

// 配置文件上传
router.post('/api/doswagger/upload', async (ctx, next) => {
  await ApiService.uploadFile(ctx,next)

});


module.exports = router
