$(function() {
    DEBUG = false;

    ALERT_TXT_INVALID = "最大值：10小时 59分 59秒";
    ALERT_TXT_NONE = "请输入时间";

    second = 0;
    startTime = 0;
    endTime = 0;
    isStart = false;

    looper = function() {
        if (isStart) {
            now = new Date();
            if (now < endTime) {
                var cound_down = Math.floor((endTime - now) / 1000);

                hour = Math.floor(cound_down / 3600);

                minute = Math.floor((cound_down - hour * 3600) / 60);

                second = cound_down % 60;

                $("#hour").val(hour);
                $("#minute").val(minute);
                $("#second").val(second);

                setTimeout('looper()', 200);
            } else {
                if ($("#checkNotify").is(":checked")) {
                    showNotification("timer", " It's time!", "../img/icon.jpg");
                }
                setTimeout(function() {
                    if ($("#checkDialog").is(":checked")) {
                        alert("It's time!");
                    }
                }, 100)

                startTime = 0;
                endTime = 0;
                isStart = false;

                $("#hour").val(null);
                $("#minute").val(null);
                $("#second").val(null);
            }
        } else {
            startTime = 0;
            endTime = 0;

            $("#hour").val(null);
            $("#minute").val(null);
            $("#second").val(null);
        }
    }

    showNotification = function(title, body, icon, suCb) {
        var options = {
            body: "It's time!",
            icon: "./img/icon.jpg"
        }
        var Notification = window.Notification || window.mozNotification || window.webkitNotification;

        if (Notification && Notification.permission === "granted") {
            var instance = new Notification(title, options);
            instance.onclick = function() {
                // Something to do  
            };
            instance.onerror = function() {
                // Something to do  
            };
            instance.onshow = function() {
                // Something to do  
                // setTimeout(instance.close, 3000);
                setTimeout(function() {
                    instance.close();
                }, 3000)
                console.log(instance.body)
            };
            instance.onclose = function() {
                // Something to do  
            };
            console.log(instance)
        } else if (Notification && Notification.permission !== "denied") {
            Notification.requestPermission(function(status) {
                if (Notification.permission !== status) {
                    Notification.permission = status;
                }
                // If the user said okay  
                if (status === "granted") {
                    var instance = new Notification(title, options);
                    instance.onclick = function() {
                        // Something to do  
                    };
                    instance.onerror = function() {
                        // Something to do  
                    };
                    instance.onshow = function() {
                        // Something to do  
                        setTimeout(instance.close, 3000);
                    };
                    instance.onclose = function() {
                        // Something to do  
                    };
                } else {
                    console.log("denied false");
                    return false
                }
            });
        } else {
            return false;
        }
    }

    $("#btnStart").on("click", function() {
        if (!$("#hour").val() && !$("#minute").val() && !$("#second").val()) {
            $(".div-alert").text(ALERT_TXT_NONE);
            $(".div-alert").show();
        } else if ($("#hour").val() > 10 || $("#minute").val() > 59 || $("#second").val() > 59) {
            $(".div-alert").text(ALERT_TXT_INVALID);
            $(".div-alert").show();
        } else {
            $(".div-alert").hide();
            second = $("#hour").val() * 3600 + $("#minute").val() * 60 + $("#second").val() * 1;

            startTime = new Date();
            endTime = new Date(startTime.getTime() + parseInt(second) * 1000);
            isStart = true;
            looper();
        }
    });


    $("#btnReset").on("click", function() {
        if (!DEBUG) {
            isStart = false;
        } else {
            showNotification("timer", " It's time!", "../img/icon.jpg");
        }
    });
})