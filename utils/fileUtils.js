const fs = require("fs")
const crypto = require('crypto');
var path = require('path');
const {WORKDIR,SWAGGERJSONFILE} = require('../config/config.default.js');

//查找目录存在文件
let checkConfigFile = (WORKDIR)=>{ 

    let arr = new Array()    
    // 判断配置文件目录存在
    if(!fs.existsSync(WORKDIR)){
        console.log(`swagger config dir doesn't exist,init create`)
     fs.mkdirSync(WORKDIR)
    }
    // 查找文件
    let fileNames = fs.readdirSync(WORKDIR)

    let swaggerConfigchecksum = getCheckSum(SWAGGERJSONFILE)

    fileNames.forEach(Element =>{
        let swagger = fs.readdirSync(`${WORKDIR}/${Element}`)
        let chacksum = getCheckSum(`${WORKDIR}/${Element}/${swagger}`)
        let statu = checkSumEqueir(chacksum,swaggerConfigchecksum)==true?'active':'inactive'
        let  data = {tag: Element,swagger: `${Element}/${swagger}`,checksum: chacksum,status: statu}
        arr.push(data)
    }
    )
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
    console.log(`str1:${str1}`)
    console.log(`str2:${str2}`)
    if(str1==str2){
        return true;
    }
    return false;
}

module.exports = { getCheckSum ,checkConfigFile,checkSumEqueir}