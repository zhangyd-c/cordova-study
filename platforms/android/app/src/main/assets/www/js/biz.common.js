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