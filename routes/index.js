const router = require('koa-router')()
const ApiService = require('../service/swaggerService')
const path = require('path')
const fs = require("fs")


  // 定义模型 可以公用 schema $ref
  /**
   * @swagger
   * definitions:
   *   Login:
   *     required:
   *       - username
   *       - password
   *     properties:
   *       username:
   *         type: string
   *       password:
   *         type: string
   *       path:
   *         type: string
   */


  //  tags 可以理解成借口分类  parameters 参数
  /**
   * @swagger
   * /login:
   *   post:
   *     description: 用户登入
   *     tags: [用户登入模块]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: password
   *         description: 用户密码.
   *         in: formData
   *         required: true
   *         type: string
   *       - name: username
   *         description: 用户名.
   *         in: formData
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: 登入成功
   *         schema:
   *           type: object
   *           $ref: '#/definitions/Login'
   *   
   */




// 配置文件查找/api/doswagger/check
router.get('/api/doswagger/checkfiles', async (ctx, next) => {
  await ApiService.checkConfigFileService(ctx,next)
})
// 配置文件执行
router.get('/api/doswagger/execConfig', async (ctx, next) => {
  await ApiService.execFile(ctx,next)
})

router.get('/api/doswagger/fileFiles', async (ctx, next) => {
  await ApiService.checkHttpFileService(ctx,next)
})


// 文件下载
router.get('/api/doswagger/download/:filePath/:fileName', async (ctx, next) => {
  // 设置头类型, 如果不设置，会直接下载该页面
  // ctx.type = 'html';
  // 读取文件
  let {filePath,fileName} = ctx.params;
  // let {pathfile} = ctx.query
  const pathUrl = path.join(`workdir/http/${filePath}/${fileName}`);
  ctx.body = fs.createReadStream(pathUrl);

});
// 文件查看
router.get('/api/doswagger/lookupfile', async (ctx, next) => {
  await ApiService.lookupConfig(ctx,next)
})
//获取swaggertag
router.get('/api/doswagger/getSwaggerTag', async (ctx, next) => {
  await ApiService.getSwaggerTag(ctx,next)
})


// swagger配置文件增加url

router.post('/api/doswagger/editFile', async (ctx, next) => {
  await ApiService.editFile(ctx,next)
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
