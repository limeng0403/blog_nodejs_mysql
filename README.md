# blog_nodejs_mysql

"The blog for nodejs and mysql."

此项目是用nodejs与mysql创建的，mongoDB版的会在此项目完成后，再重新生成一个mongoDB版的git库

需要安装的mysql驱动已经写入package.json中，只需要npm install就可以完成环境搭建。

数据库操作封装在/libs/dbConn.js中，请根据自己的需要进行修改。

说明：

1、此项目是用express 4.0生成的，但是修改了默认的模板引擎，由jade改为ejs，原因是，jade虽然很酷，但是对项目后续进展毫无益处，如需要jade，请根据自己的需要修改app.js中的参数以及view中的页面。

2、数据库初始化操作已经封装成模块（dbConn），引用后可直接操作。启动项目时，后台会有输出，如果数据库连接成功会返回类似“ok,ID is:”的消息，如果失败，会输出错误代码。

3、SQL语句可以直接调用函数

```
.query('SQL语句',function(err,arr){})
```

参数中的第二个参数为回调函数，会返回两个值，第一个值是nodejs规定的错误状态，真为有错误，假为无错误，在有错误的时候，arr中的值是错误的stack值。

4、如果有感兴趣的同学可以仿ThinkPHP写一个类似的数据操作类，方便数据库操作。

5、如果有任何问题可以随时邮件给我 lionft@qq.com
