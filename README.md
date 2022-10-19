
koa开发swagger配置管理
node版本:16以上

项目结构：
|-src
    |-bin   //启动文件入口
    |-router   //路由中间件
    |-service  //业务逻辑处理
    |-docker  //docker环境下一键运行
    |-utils    //工具
    |-workdir  //管理的swagger配置文件目录
    |-swagger  //swagger工作配置swagger.json工作目录
    app.js  //组件配置
    .env   //变量配置



运行：
npm install
调试运行
npm run dev

生产运行
npm start

docker-compose环境下一键运行
docker-compose up -d


接口文档：https://console-docs.apipost.cn/preview/8cc998863ce2fe87/6b79b89f75d12e17
