export default {
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
};
