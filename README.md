# cordova-study
Cordova学习记录，Cordova插件的使用，热更新、media、device、集成x5内核等等。


### 目录简介

`hooks`：存放自定义cordova命令的脚本文件。每个project命令都可以定义before和after的Hook，比如：before_build、after_build

`platforms`：平台目录，各自的平台代码就放在这里，可以放一下平台专属的代码

`plugins`：Cordova插件目录，安装的插件会放在这里，cordova提供的原生API也是以插件的形式提供的

`www`：源代码目录。在`cordova prepare`的时候会被copy到各个平台工程的`assets\www`目录中

`config.xml`：主要是cordova的一些配置，比如：项目使用了哪些插件、应用图标icon和启动页面

### 常用命令

```html
# 创建Cordova项目
cordova create [projectName] [packageName]
# 添加平台
cordova platform add android
cordova platform add ios
# 移除android平台
cordova platform rm android
# 查看已添加的平台
cordova platform ls
# 添加插件
cordova plugin add [plugin-full-name]
# 删除插件
cordova plugin rm [plugin-full-name]
# 查看已添加的插件
cordova plugin ls
# 打包cordova项目到Android平台
cordova build android
```

### 开源协议

[MIT](https://gitee.com/yadong.zhang/DBlog/blob/master/LICENSE)

### 生命不息，折腾不止！ 更多信息，请关注：
1. [我的博客](https://www.zhyd.me)
2. [我的微博](http://weibo.com/211230415)
3. [我的头条号](http://www.toutiao.com/c/user/3286958681/)
4. [我的mooc](http://www.imooc.com/u/1175248/articles)

### 有任何问题可以
- [给我留言](https://www.zhyd.me/guestbook)

### 如果喜欢，请多多分享、多多Star