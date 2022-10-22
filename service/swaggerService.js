let co = require('co');//异步控制器
const fs = require("fs")
const path = require('path')
const {WORKDIR,SWAGGERJSONFILE,HTTP} = require('../config/config.default.js');
const {getCheckSum,checkConfigFile,checkSumEqueir,findFile} = require('../utils/fileUtils')
const {item} = require('../model/item')
// 配置文件查找
let checkConfigFileService = async (ctx, next) => {
    let {pageNum,pageSize} = ctx.query
    let arr = new Array()    
    var items = checkConfigFile(WORKDIR);

    let res = await co(function* (){
            if(items ==null){
                ctx.throw({success: false,code: 400, message: "配置文件不存在"})
            }
     let pages =  Math.ceil(items.length/pageSize)
     let records = new Array()    
     for(let i=(pageNum-1)*pageSize;i< pageNum*pageSize;i++){
        records.push(items[i])
        if(items[i+1]==null){
            break
        }
     }

    console.log(pages)
    var result = {
        data: {
            
            current: pageNum,
            records: items,
            total: items.length,
            pages: pages,
            size: pageSize
        },
        code: 200,      
        success: true,
    }
    return result
 })
    ctx.body = res
} 



// http文件查找
let checkHttpFileService = async (ctx, next) => {
    let {pageNum,pageSize} = ctx.query
    let arr = new Array()    

    //查找文件
    var items = findFile(HTTP);
    let res = await co(function* (){
            if(items ==null){
                ctx.throw({success: false,code: 400, message: "文件不存在"})
            }

     let pages =  Math.ceil(items.length/pageSize)
     let records = new Array()    
     for(let i=(pageNum-1)*pageSize;i< pageNum*pageSize;i++){
        records.push(items[i])
        if(items[i+1]==null){
            break
        }
     }

    console.log(pages)
    var result = {
        data: {
            current: pageNum,
            records: items,
            total: items.length,
            pages: pages,
            size: pageSize
        },
        code: 200,      
        success: true,
    }
    return result
 })
    ctx.body = res
} 



// 执行文件
let execFile = async (ctx, next) =>{
    var {swagger} = ctx.query
    console.log(swagger)
     let res = await co(function* (){
         var data = fs.readFileSync(`${WORKDIR}/${swagger}`);
                 fs.writeFile(SWAGGERJSONFILE, data, function (err) {
                     if (err) {
                     ctx.throw({success: false,code: err.code, message: err.message}) }
                 })
                 return result={success: true,code: 200, message: "执行成功"}
     })
     ctx.body = res
 }
 




// 文件上传
let uploadFile= async (ctx, next) => {
    const file = ctx.request.files.file; // 获取上传文件
    let res = await co(function* (){
    const type = file.originalFilename.split('.').pop();  
    if(type!='json'){
        ctx.throw({success: false,code: 502, message: "文件类型错误"})
    }
    const reader = fs.createReadStream(file.filepath);
    let filePath = path.join(WORKDIR) + `/${file.originalFilename}`;
    const upStream = fs.createWriteStream(filePath);
    reader.pipe(upStream);
    return result = {success: true,code: 200, message: "上传成功",file: file.originalFilename};
    })
    ctx.body = res
}


let deleteFile = async (ctx, next) =>{
    var {deleteFileName} = ctx.request.body
    if(deleteFile==''){
        ctx.throw({success: false,code: 500, message: "参数不能为空"})
    }
    if(deleteFileName.split('.').pop()!='json'){
        ctx.throw({success: false,code: 500, message: "参数不规范"})
    }
     let res = await co(function* (){
        if(!fs.existsSync(`${WORKDIR}/${deleteFileName}`)){
            ctx.throw({success: false,code: 500, message: "文件不存在"})
        }
        fs.unlink(`${WORKDIR}/${deleteFileName}`, function(err){
            if (err) {
                ctx.throw({success: false,code: err.code, message: err.message}) 
            }
        })
        return result={success: true,code: 200, message: "删除成功"}
     })
     ctx.body = res
 }


let lookupConfig =async (ctx, next)=>{

    var {filePath} = ctx.query

    if(!fs.existsSync(`${WORKDIR}/http/${filePath}`)){
        ctx.throw({success: false,code: 500, message: "文件不存在"})
    }
    let res = await co(function* (){
        var data = fs.readFileSync(`${WORKDIR}/http/${filePath}`,'utf-8');
        console.log(data)
        return result = {success: true,code: 200, message: "读取成功",data: data}
    })
    ctx.body = res
}

module.exports = { checkHttpFileService,checkConfigFileService,uploadFile ,execFile ,deleteFile,lookupConfig}