const fs = require("fs")
const crypto = require('crypto');
var path = require('path');
const axios = require('axios')
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
    let result = new Array() 
    let filepath= readdirectory(path,arr)

    console.log(filepath)
    if(filepath!=''){
        filepath.forEach(file =>{
           let fileName =file.toString().substring(file.toString().lastIndexOf("/")+1,file.toString().length)
        //    console.log(files.toString())
            let  data = {filePath: `${file}`,fileName: fileName}
            result.push(data)

        })
    }
    return result;

}


function readdirectory(dir,arrs){
    let arr = arrs
    let files = fs.readdirSync(dir)
    files.forEach((item)=>{
    let filepath1 = `${dir}/${item}`
    let stat = fs.statSync(filepath1)
    if(stat.isFile()){
        arr.push(filepath1)
    }else{
    readdirectory(filepath1,arr)
    }
     
    } )
    return arr
    }



 let fileForEach = (path)=>{
    let arr = new Array()   
    let fileNames = fs.readdirSync(path)
    console.log(fileNames)
    if(fileNames!=''){
        fileNames.forEach(Element =>{
            arr.push(fs.statSync(`${path}/${Element}`,(stats)=>{
                console.log(stats.isFile())
                if(stats.isFile()){
                    console.log(`file:${path}/${Element}`)
                    return `${path}/${Element}`
                }else{
                    console.log(`path:${path}/${Element}`)

                   return fileForEach(`${path}/${Element}`)
                }
               }))
        })}

        return arr
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

function sendHttpRequest(url,data) {

    /*****创建promise函数****/
    return new Promise(function (resolve, reject) {
        /*****正常的发请求****/
        let req =  axios({
            url: `${url}`,
            data: data,
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(function (response) {
                console.log(`respose:${response.data}`)
                resolve(response.data);

              })
            .catch(function (error) {
                console.log(`respose:${error.message}`)

                resolve(error.message);
            })
        
    });
}





module.exports = { findDir,findFile,getCheckSum ,checkConfigFile,checkSumEqueir,lookupSwaggerFile,sendHttpRequest}