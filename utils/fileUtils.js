const fs = require("fs")
const crypto = require('crypto');
var path = require('path');
const {WORKDIR,SWAGGERJSONFILE,HTTP} = require('../config/config.default.js');

//查找目录存在文件
let checkConfigFile = (WORKDIR)=>{ 

    let arr = new Array()    
    // 判断配置文件目录存在
    if(!fs.existsSync(`${WORKDIR}/swagger`)){
        console.log(`swagger config dir doesn't exist,init create`)
     fs.mkdirSync(`${WORKDIR}/swagger`)
    }
    // 查找文件
    let fileNames = fs.readdirSync(`${WORKDIR}/swagger`)
    let swaggerConfigchecksum = getCheckSum(SWAGGERJSONFILE)
    fileNames.forEach(Element =>{
        let swagger = fs.readdirSync(`${WORKDIR}/swagger/${Element}`)
        let chacksum = getCheckSum(`${WORKDIR}/swagger/${Element}/${swagger}`)
        let statu = checkSumEqueir(chacksum,swaggerConfigchecksum)==true?'active':'inactive'
        let  data = {id: `${Element}/${swagger}`,tag: Element,swagger: `${Element}/${swagger}`,checksum: chacksum,status: statu}
        arr.push(data)
    }
    )
    return arr;
}


let findDir = (path)=>{
    let dirNames = fs.readdirSync(path)
    return dirNames
}


let findFile = (path)=>{
    let arr = new Array()    

    let fileNames = fs.readdirSync(path)
    if(fileNames!=''){
        fileNames.forEach(Element =>{
            let files = fs.readdirSync(`${path}/${Element}`)
            if(files!=''){
                files.forEach(file =>{
                    let  data = {id: `${Element}/${file}`,tag: Element,filePath: `${Element}/${file}`}
                    arr.push(data)

                })
            }

        })

    }
    return arr;

}
let getCheckSum=(file) =>{
    var stat = fs.lstatSync(file)
    if(fs.existsSync(file)&&stat.isFile()){
    var fileStream = fs.readFileSync(file,'utf-8');
    var fsHash = crypto.createHash('md5');
    fsHash.update(fileStream);
    let fileCheckSum = fsHash.digest('hex');
    return fileCheckSum;
    }else {
        return null;
    }

}

    // 比对
let checkSumEqueir = (str1,str2)=>{
    // console.log(`str1:${str1}`)
    // console.log(`str2:${str2}`)
    if(str1==str2){
        return true;
    }
    return false;
}


let lookupSwaggerFile = (filePath)=>{

    return new Promise(
        function (resolve, reject) {
    if(!fs.existsSync(`${WORKDIR}/swagger/${filePath}`)){
        ctx.throw({success: false,code: 500, message: "文件不存在"})
    }
        let data = fs.readFileSync(`${WORKDIR}/swagger/${filePath}`,'utf-8');
        resolve(data)        
    
 } )
}



module.exports = { findDir,findFile,getCheckSum ,checkConfigFile,checkSumEqueir,lookupSwaggerFile}