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