$(function(){
    $(".bdapp").click(function(){
        alert("打开百度地图");
        var scheme = 'com.baidu.BaiduMap';
//        var scheme = 'com.abb.ijia';
        appAvailability.check(
            scheme,       // URI Scheme or Package Name
            function() {  // Success callback
                alert(scheme + ' is available :)');
                var sApp = startApp.set({ /* params */
                  "action":"ACTION_MAIN",
          　　　　"category":"CATEGORY_DEFAULT",
          　　　　"type":"text/css",
          　　　　"package":"com.baidu.BaiduMap",
          　　　　"uri":"file://data/index.html",
          　　　　"flags":["FLAG_ACTIVITY_CLEAR_TOP","FLAG_ACTIVITY_CLEAR_TASK"],
          　　　　// "component": ["com.android.GoBallistic","com.android.GoBallistic.Activity"],
          　　　　"intentstart":"startActivity",
                }, { /* extras */
                  "EXTRA_STREAM":"extraValue1",
                  "extraKey2":"extraValue2"
                });
                sApp.start(function() { /* success */
                  alert("已打开APP");
                }, function(error) { /* fail */
                  alert("打开失败" + error);
                });

            },
            function() {  // Error callback
                alert(scheme + ' is not available :(');
                window.open("market://search?q=com.baidu.BaiduMap")
            }
        );
    });
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

    function writeLog(message){
        var $updateLog = $("#updateLog");
        $updateLog.append("<li>"+ new Date() + " 自动更新提示：当前是最新版本"+"</li>")
    }

    /*setInterval(function(){
        var $updateLog = $("#updateLog");
        //说明：这里的使用了Framework7
        chcp.fetchUpdate(function(error, data) {
            if(!error) {
                alert("自动更新提示：有更新");
                chcp.installUpdate(function(error) {
                   alert("自动更新提示：更新完成");
                })
            } else {
                $updateLog.append("<li>"+ new Date() + " 自动更新提示：当前是最新版本"+"</li>")
            }
        })
    }, 60000)*/
});