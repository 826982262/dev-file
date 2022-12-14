const router = require('koa-router')()
const ApiService = require('../service/fileService')
const path = require('path')
const fs = require("fs")




//文件查找
router.get('/api/js/v1/:path/findfiles', async (ctx, next) => {
  await ApiService.findfiles(ctx,next)
})





// //配置文件修改
// router.post('/api/doswagger/deleteFile', async (ctx, next) => {
//   await ApiService.deleteFile(ctx,next)
// })




// // 配置文件上传
// router.post('/api/doswagger/upload', async (ctx, next) => {
//   await ApiService.uploadFile(ctx,next)

// });


module.exports = router
