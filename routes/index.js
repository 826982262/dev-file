const router = require('koa-router')()
const ApiService = require('../service/swaggerService')


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

// //配置文件修改
// router.post('/api/doswagger/deleteFile', async (ctx, next) => {
//   await ApiService.deleteFile(ctx,next)
// })


// // 配置文件查看
// router.post('/api/doswagger/lookupConfig', async (ctx, next) => {
//   await ApiService.lookupConfig(ctx,next)
// })


// // 配置文件上传
// router.post('/api/doswagger/upload', async (ctx, next) => {
//   await ApiService.uploadFile(ctx,next)

// });


module.exports = router
