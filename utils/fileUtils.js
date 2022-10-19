const fs = require("fs")
const crypto = require('crypto');
var path = require('path');

//查找目录存在文件
let checkConfigFile = (WORKDIR)=>{ 

    console.log(fs.existsSync(WORKDIR))
// 判断配置文件目录存在
    if(!fs.existsSync(WORKDIR)){
        console.log(`swagger config dir doesn't exist,init create`)
     fs.mkdirSync(WORKDIR)
    }
    // 查找文件
    let fileNames = fs.readdirSync(WORKDIR)

    return fileNames;
}

let getCheckSum=(file) =>{
    var fileStream = fs.readFileSync(file,'utf-8');
    var fsHash = crypto.createHash('md5');
    fsHash.update(fileStream);
    let fileCheckSum = fsHash.digest('hex');
    return fileCheckSum;
}

    // 比对
let checkSumEqueir = (str1,str2)=>{

    if(str1==str2){
        return true;
    }
    return false;
}

module.exports = { getCheckSum ,checkConfigFile,checkSumEqueir}