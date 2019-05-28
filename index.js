/**
 * 观察者模式
 */
var Observer = function() {
    var _messages = {};
    var _this = this;
    return {
        regist: function(type, fn) {
            typeof _messages[type] === "undefined" ? (_messages[type] = [fn]) : _messages[type].push(fn);
            return _this;
        },
        fire: function(type, args) {
            if (!_messages.hasOwnProperty(type)) return;
            var events = {
                type: type,
                args: args || {}
            };
            for (var i = 0; i < _messages[type].length; i++) {
                _messages[type][i].call(this, events.args);
            }
        },
        remove: function(type, fn) {
            if (_messages[type] instanceof Array) {
                for (var i = _messages[type].length - 1; i >= 0; i--) {
                    _messages[type][i] === fn && _messages[type].splice(i, 1);
                }
            }
        }
    };
}.call(this);

/**
 * 原生ajax封装s
 */
function Ajax(type, url, data, success, failed) {
    // 创建ajax对象
    var xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    var type = type.toUpperCase();
    // 用于清除缓存
    var random = Math.random();

    if (typeof data == "object") {
        var str = "";
        for (var key in data) {
            str += key + "=" + data[key] + "&";
        }
        data = str.replace(/&$/, "");
    }

    if (type == "GET") {
        if (data) {
            xhr.open("GET", url + "?" + data, true);
        } else {
            xhr.open("GET", url + "?t=" + random, true);
        }
        xhr.send();
    } else if (type == "POST") {
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(data);
    }
    // 处理返回数据
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                success(xhr.responseText);
            } else {
                if (failed) {
                    failed(xhr.status);
                }
            }
        }
    };
}

/**
 * 移动端滑动判定
 */
//返回角度
function GetSlideAngle(dx, dy) {
    return (Math.atan2(dy, dx) * 180) / Math.PI;
}
//根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
function GetSlideDirection(startX, startY, endX, endY) {
    var dy = startY - endY;
    var dx = endX - startX;
    varresult = 0;
    //如果滑动距离太短
    if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
        return result;
    }

    var angle = GetSlideAngle(dx, dy);
    if (angle >= -45 && angle < 45) {
        result = 4;
    } else if (angle >= 45 && angle < 135) {
        result = 1;
    } else if (angle >= -135 && angle < -45) {
        result = 2;
    } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
        result = 3;
    }

    return result;
}
//滑动处理
var startX, startY;
document.addEventListener(
    "touchstart",
    function(ev) {
        startX = ev.touches[0].pageX;
        startY = ev.touches[0].pageY;
    },
    false
);
document.addEventListener(
    "touchend",
    function(ev) {
        var endX, endY;
        endX = ev.changedTouches[0].pageX;
        endY = ev.changedTouches[0].pageY;
        var direction = GetSlideDirection(startX, startY, endX, endY);
        switch (direction) {
            case 0:
                alert("没滑动");
                break;
            case 1:
                alert("向上");
                break;
            case 2:
                alert("向下");
                break;
            case 3:
                alert("向左");
                alert("!");
                break;
            case 4:
                alert("向右");
                break;
            default:
        }
    },
    false
);

/**
 * jquery 表单序列化直接返回json扩展
 */
!(function(t) {
    t.fn.values = function(e) {
        var i = t(this)
            .find(":input")
            .get();
        return "object" != typeof e
            ? ((e = {}),
              t.each(i, function() {
                  this.name &&
                      !this.disabled &&
                      (this.checked || /select|textarea/i.test(this.nodeName) || /text|hidden|password/i.test(this.type)) &&
                      (e[this.name] = t(this).val());
              }),
              e)
            : (t.each(i, function() {
                  this.name &&
                      e[this.name] + "" &&
                      "undefined" != typeof e[this.name] &&
                      ("checkbox" == this.type || "radio" == this.type
                          ? t(this).prop("checked", e[this.name] == t(this).val())
                          : t(this).val(e[this.name]));
              }),
              t(this));
    };
})(jQuery);

/**
 * 继承
 */
var __extends =
    (this && this.__extends) ||
    function(d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];

        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
    };
var Person = (function() {
    function Person() {}
    return Person;
})();
var person = (function(_super) {
    __extends(person, _super);

    function person() {
        return _super.apply(this, arguments) || this;
    }
    return person;
})(Person);
