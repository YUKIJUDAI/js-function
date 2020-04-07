export default {
    /********* dom *********/

    //添加事件
    addEvent(obj, type, fn) {
        if (obj.addEventListener) {
            obj.addEventListener(type, fn, false);
        } else if (obj.attachEvent) {//IE
            obj.attchEvent('on' + type, fn);
        }
    }
    //移除事件
    removeEvent(obj, type, fn) {
        if (obj.removeEventListener) {
            obj.removeEventListener(type, fn, false);
        } else if (obj.detachEvent) {//兼容IE
            obj.detachEvent('on' + type, fn);
        }
    }
    //阻止默认行为
    preDef(ev) {
        var e = ev || window.event;
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }
    }
    //获取目标对象
    getTarget(ev) {
        if (ev.target) {//w3c
            return ev.target;
        } else if (window.event.srcElement) {//IE
            return window.event.srcElement;
        }
    }
    //获取滚动条位置
    getSP() {
        return {
            top: document.documentElement.scrollTop || document.body.scrollTop,
            left: document.documentElement.scrollLeft || document.body.scrollLeft;
        }
    }
    //获取可视窗口大小
    getWindow() {
        if (typeof window.innerWidth != 'undefined') {
            return {
                width: window.innerWidth,
                height: window.innerHeight
            }
        } else {
            return {
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight
            }
        }
    }
    // 获取鼠标坐标
    mousePosition(ev) {
        if (ev.pageX || ev.pageY) {
            return { x: ev.pageX, y: ev.pageY };
        }
        return {
            x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
            y: ev.clientY + document.body.scrollTop - document.body.clientTop
        };
    }

    /********* Browser *********/

    // 判断是否是电脑端
    isPC() {
        var userAgentInfo = navigator.userAgent,
            Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"],
            flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    },
    // 判断微信浏览器
    isWeixin() {
        return navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == "micromessenger";
    },
    // 判断安卓
    isAndroid() {
        return navigator.userAgent.indexOf("Android") > -1 || u.indexOf("Adr") > -1;
    },
    // 判断IOS
    isIOS() {
        return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    },
    // 滚动到某一高度
    scrolllToTop(c = 0) {
        window.scrollTo(0, c);
    },

    /********* Array ************/

    // 数组去重
    arrayDistinctValues(arr) {
        return [...new Set(arr)];
    },
    // 数组打乱重组
    arrayShuffle(arr) {
        return arr.sort(() => Math.random() - 0.5);
    },
    // 检查给定数组中是否包含某项
    arrayContains(arr, item) {
        var i = arr.length;
        while (i--) {
            if (arr[i] === item) return true;
        }
        return false;
    }

    /********* 正则 ************/

    // 千分位分隔
    cc(s) {
        if (/[^0-9\.]/.test(s)) return "invalid value";
        s = s.replace(/^(\d*)$/, "$1.");
        s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
        s = s.replace(".", ",");
        var re = /(\d)(\d{3},)/;
        while (re.test(s))
            s = s.replace(re, "$1,$2");
        s = s.replace(/,(\d\d)$/, ".$1");
        return s.replace(/^\./, "0.")
    }
};
