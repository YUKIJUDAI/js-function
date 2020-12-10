export default {
    /********* dom *********/
    //添加事件
    addEvent(obj, type, fn) {
        if (obj.addEventListener) {
            obj.addEventListener(type, fn, false);
        } else if (obj.attachEvent) {//IE
            obj.attchEvent('on' + type, fn);
        }
    },
    //移除事件
    removeEvent(obj, type, fn) {
        if (obj.removeEventListener) {
            obj.removeEventListener(type, fn, false);
        } else if (obj.detachEvent) {//兼容IE
            obj.detachEvent('on' + type, fn);
        }
    },
    //阻止默认行为
    preDef(ev) {
        var e = ev || window.event;
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }
    },
    //获取目标对象
    getTarget(ev) {
        if (ev.target) {//w3c
            return ev.target;
        } else if (window.event.srcElement) {//IE
            return window.event.srcElement;
        }
    },
    //获取滚动条位置
    getSP() {
        return {
            top: document.documentElement.scrollTop || document.body.scrollTop,
            left: document.documentElement.scrollLeft || document.body.scrollLeft;
        }
    },
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
    },
    // 获取鼠标坐标
    mousePosition(ev) {
        if (ev.pageX || ev.pageY) {
            return { x: ev.pageX, y: ev.pageY };
        }
        return {
            x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
            y: ev.clientY + document.body.scrollTop - document.body.clientTop
        };
    },

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
    },
    // 去除空格
    trim(str) {
        str = str + "";
        return str.replace(/^(\s|\xA0)+|(\s|\xA0)+$/g, "");
    },
    // 验证手机号
    phoneVerification(phone) {
        const reg = /^1[3-9]{1}[0-9]{9}$/i;
        return reg.test(this.trim(phone));
    },
    // 0~10w之间最多两位小数的数字
    decimalVerficationFun(value) {
        const reg = /(^[0-9]{1,4}(\d{1}$)?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/;
        return reg.test(this.trim(value));
    },
    // 验证整数
    integerVerficationFun(value) {
        const reg = /^(0|[1-9]\d{0,4})$/;
        return reg.test(this.trim(value));
    },
    // 验证qq
    qqVerification(qq) {
        const reg = /[1-9][0-9]{4,10}/;
        return reg.test(this.trim(qq));
    },
    // 验证中文
    ZhVerification(val) {
        const reg = /^[\u4e00-\u9fa5]*$/;
        return reg.test(this.trim(val));
    },
    // 验证身份证
    idcardVerification(idcard) {
        const reg = /^\d{17}(\d|X)$/;
        return reg.test(this.trim(idcard));
    },

    /********* 数据转换 ************/

    // 时间戳转时间  dayjs
    formatTime(val, gs = "YYYY-MM-DD HH:mm") {
        return dayjs(val).format(gs);
    },
    // 驼峰转下划线
    toLine(val) {
        const reg = /([A-Z])/g;
        Object.keys(val).forEach((item: any) => {
            if (item.match(reg)) {
                val[item.replace(reg, "_$1").toLowerCase()] = val[item];
                delete val[item];
            }
        });
        return val;
    },
    // 下划线转驼峰
    toHump(val) {
        const reg = /\_(\w)/g;
        Object.keys(val).forEach((item: any) => {
            if (item.match(reg)) {
                val[item.replace(reg, (all: any, letter: any) => letter.toUpperCase())] = val[item];
                delete val[item];
            }
        });
        return val;
    },
    // blob转base64
    blobToBase64(blob) {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.onload = (e: any) => {
                resolve(e.target.result);
            };
            fileReader.readAsDataURL(blob);
            fileReader.onerror = () => {
                reject(new Error("blobToBase64 error"));
            };
        });
    },

    /********* 加密 ************/

    // ase加密  crypto-js
    encryption(word) {
        const key = CryptoJS.enc.Utf8.parse("123456789ABCDEF");
        const iv = CryptoJS.enc.Utf8.parse("ABCDEF123456789");
        let srcs = CryptoJS.enc.Utf8.parse(word);
        let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
        return encrypted.ciphertext.toString().toUpperCase();
    },
    // ase解密 crypto-js
    decrypt(word) {
        const key = CryptoJS.enc.Utf8.parse("123456789ABCDEF");
        const iv = CryptoJS.enc.Utf8.parse("ABCDEF123456789");
        let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
        let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
        let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
        let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
        return decryptedStr.toString();
    },

    /********* 算法 ************/

    // 权重数组
    weightFn(arr, sum): Array<string> {
        // arr总和
        var nums = arr.reduce((prev, curr, idx, arr) => +prev + +curr);
        // 根据权重得出的新数组
        var newArr = arr.map((item, i) => Math.floor((sum * item) / nums));
        // 所的权重
        var remainder = arr.map((item, i) => {
            return { remainder: item / nums, index: i };
        });
        // 舍去小数后和总数的差值
        var difference = sum - newArr.reduce((prev, curr, idx, arr) => +prev + +curr);
        // 权重大小排列
        remainder.sort((a, b) => (a.remainder < b.remainder ? 1 : -1));
        // 给新数组剩下的加值
        for (let index = 0; index < difference; index++) {
            newArr[remainder[index].index]++;
        }
        return newArr;
    },

    /********* 第三方 ************/

    // H5微信支付
    wePay(data) {
        const onBridgeReady = () => {
            window.WeixinJSBridge.invoke("getBrandWCPayRequest", Object.assign(data, { signType: "MD5" }), (res: any) => {
                // dosomething
            });
        };
        if (typeof window.WeixinJSBridge === "undefined") {
            document.addEventListener("WeixinJSBridgeReady", onBridgeReady, false);
        } else {
            onBridgeReady();
        }
    },

    /********* 常用方法 ************/

    // 判断是否空
    isEmpty(str) {
        return Object.prototype.toString.call(str) === "[object Null]" || Object.prototype.toString.call(str) === "[object Undefined]" || str === "";
    },
    // 随机数
    rand(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    },
    // 版本对比（是否更新）
    compareVersionEle(currVersion, targetVerison) {
        if (!currVersion || !targetVerison) return false;
        const curr = currVersion.split(".");
        const target = targetVerison.split(".");
        for (let i = 0; i < curr.length; i++) {
            if (parseInt(curr[i]) > parseInt(target[i])) {
                return true;
            }
            if (parseInt(curr[i]) < parseInt(target[i])) {
                return false;
            }
        }
        return true;
    },
    // 下载资源
    download(url) {
        var a = document.createElement("a");
        var event = new MouseEvent("click");
        a.download = title;
        a.href = url;
        a.dispatchEvent(event);
    },
    // 生成二维码 QRCode
    createQRCode = (url) => {
        return QRCode.toDataURL(url);
    },
};
