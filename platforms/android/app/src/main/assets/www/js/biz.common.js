/**
 * https://www.zhyd.me
 * @author yadong.zhang email:yadong.zhang0415(a)gmail.com
 * @version 1.0
 * @date 2018/4/16 15:36
 * @since 1.0
 */
var zyd = window.zyd || {
    // ...
}
zyd.bindUpdate = {
    init : function () {
        $(".update").click(function(){
            //说明：这里的使用了Framework7
            chcp.fetchUpdate(function(error, data) {
                if(!error) {
                    alert("有更新");
                    chcp.installUpdate(function(error) {
                       alert("更新完成");
                    })
                } else {
                    alert("当前是最新版本");
                }
            })
        });
    }
}

zyd.bindAutoUpdate = {
   init : function () {
       if (window.chcp) {
           alert("支持chcp");
           setInterval(function(){
               chcp.fetchUpdate(function(error, data) {
                   if(!error) {
                       alert("自动更新提示：有更新");
                       chcp.installUpdate(function(error) {
                           console.log("自动更新提示：更新完成");
                       })
                   } else {
                       alert("自动更新提示：当前是最新版本");
                   }
               })
           }, 5000)
       } else{
           alert("暂不支持chcp");
       }
   }
};

zyd.notification = {
   look: false,
   init : function () {
       try {
            setInterval(function(){
                if(!zyd.notification.look){
                    cordova.plugins.notification.local.schedule({
                        id: Math.random(),
                        title: '会议通知',
                        text: '今天下午17点30分 \n塔1C座2306室-会议室\n开年终会议... ',
                        foreground: true,
                        actions: [
                            { id: 'yes', title: '确认查看' },
                            { id: 'no',  title: '忽略' }
                        ]
                  });
                  zyd.notification.look = true;
                  cordova.plugins.notification.local.un('yes', zyd.notification.success);
                  cordova.plugins.notification.local.on('yes', zyd.notification.success);

                  cordova.plugins.notification.local.un('no', zyd.notification.ignore);
                  cordova.plugins.notification.local.on('no', zyd.notification.ignore);
                }else{
                    console.log("有未读的消息,暂不显示通知");
                }
            }, 5000);
       } catch (err) {
            alert("发生异常了。" + err);
       }
   },
   success: function(notification, eopts){
          zyd.notification.look = false;
          alert("消息详情：消息标题["+notification["title"]+"], 消息内容["+notification["text"]+"]")
          for(var i in eopts){
           console.log(i + "==" + eopts[i]);
          }
          for(var i in notification){
           console.log(i + "==" + notification[i]);
          }
   },
   ignore: function(notification, eopts){
        zyd.notification.look = false;
   }
};

/**
 * 打开第三方App
 * @date 2018-06-21 18:08
 * @author yadong.zhang (https://www.zhyd.me)
 */
zyd.openApp = {
    _title: "",
    _scheme: "",
    _activity: "",
    _downloadUrl: "",
    /**
     * 初始化插件
     */
    init: function() {
        console.log("初始化插件");
        zyd.openApp.bindEvent();
    },
    /**
     * 绑定事件
     */
    bindEvent: function() {
        $(".openApp").click(function(){
            var $this = $(this);
            zyd.openApp._title = $this.data("title");
            zyd.openApp._scheme = $this.data("scheme");
            zyd.openApp._activity = $this.data("activity");
            zyd.openApp._downloadUrl = $this.data("download-url");
            zyd.openApp.open();
        });
    },
    /**
     * 打开第三方app
     */
    open: function(){
        console.log(">>>>  打开" + zyd.openApp._title);
        console.log(">>>>  " + zyd.openApp._scheme);
        console.log(">>>>  " + zyd.openApp._activity);
        console.log(">>>>  " + zyd.openApp._downloadUrl);
        // 检测第三方app是否存在，appAvailability.check(scheme, successCallback, errorCallback)
        appAvailability.check(
            zyd.openApp._scheme,
            function() {
                console.log(zyd.openApp._scheme + ' is available :)');
                // 打开第三方app
                var sApp = startApp.set({
                    "application": zyd.openApp._scheme
                });
                sApp.start(function(compete) {
                    console.log(">>>>  已打开APP。" + compete);
                }, function(error) {
                    console.error(">>>>  打开失败。" + error);
                }, function(result, requestCode, resultCode) {
                    console.log(">>>>  " + JSON.stringify(result) + ", " + requestCode + ", " + resultCode);
                });

            },
            function() {  // Error callback
                console.error(">>>>  " + scheme + ' 对应的App不存在，开始尝试下载App');
                zyd.openApp.downloadApk();
            }
        );
    },
    /**
     * 下载第三方app
     */
    downloadApk: function() {
        if(!zyd.openApp._downloadUrl) {
            console.error("未设置downloadUrl！已终止下载App...");
            return;
        }
        console.error(">>>>  download Apk: " + zyd.openApp._downloadUrl);
        //下载文件
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
            fs.root.getFile('test1.apk', { create: true }, function (fileEntry) {
                console.log("=========" + JSON.stringify(fileEntry));
                var fileName=fileEntry.toURL().slice( fileEntry.toURL().lastIndexOf('/')+1);
                var targetPath = cordova.file.externalDataDirectory;//cordova.file.documentsDirectory;//'cdvfile://localhost/persistent/apk/';//注意！
                var filePath=targetPath+fileName
                zyd.openApp._download(filePath);
            }, function (errorHandle) {
               console.log(">>>>  下载文件失败: " + errorHandle);
           });
        }, function (errorHandle) {
            console.log(">>>>  下载文件失败: " + errorHandle);
        })
    },
    /**
     * 下载
     */
    _download: function(filePath) {
        var ft = new FileTransfer();
        //监听下载进度
        ft.onprogress = function (e) {
            if (e.lengthComputable) {
                var progress = e.loaded / e.total * 100;
                $("#progress").css({"width": progress + "%"});
                $("#progress").html(progress + "%");
            }
        }
        ft.download(zyd.openApp._downloadUrl, filePath, function (entry) {
            console.log('下载成功');
            console.info(JSON.stringify(entry));

            // 打开apk安装包
            cordova.plugins.fileOpener2.open(
                entry.toURL(),
                'application/vnd.android.package-archive',
                {
                    error : function(e){
                        alert('失败status:'+JSON.stringify(e)+ " 路径："+entry.toURL() )
                    },
                    success : function(){
                      alert("安装完成后请重新打开。");
                    }
            });

        }, function (err) {
            console.log("下载失败！");
            console.info(JSON.stringify(err));
        }, null, {});
    }
};