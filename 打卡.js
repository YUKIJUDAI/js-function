//一分钟内产生随机数打卡
console.log('20秒后开始运行程序');
setTimeout(() => {
    checkTime();
    punchClock("下班打卡");
}, 20000);

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkTime() {
    var now = new Date();
    var now_Hours = now.getHours();
    var now_Minutes = now.getMinutes();
    var now_day = now.getDay();

    if (now_day < 6) {
        console.log("工作日");
        console.log("当前系统时间：" + now_Hours + '分' + now_Minutes + '秒');
        if (now_Hours === 8 && now_Minutes >= 40) {
            var random = getRandomNumber(0, 10);
            console.log(1000 * 60 * rangdom + "秒后打上班卡");
            sleep(1000 * 60 * rangdom);
            punchClock("上班打卡");
        } else if (now_Hours === 18 && now_Minutes <= 20) {
            var random = getRandomNumber(0, 10);
            console.log(1000 * 60 * rangdom + "秒后打下班卡");
            sleep(1000 * 60 * rangdom);
            punchClock("下班打卡");
        } else {
            console.log("5分钟后重试")
            sleep(1000 * 60 * 5)
            checkIsNow();
        }
    } else {
        console.log("非工作日");
        sleep(1000 * 60 * 60);
        checkIsNow();
    }
}

//打卡
function punchClock(descStr) {
    if (!device.isScreenOn() || desc("快捷方式").exists()) {
        device.wakeUp();
    }
    sleep(1000);
    //启动钉钉
    launchApp("钉钉");
    //等待钉钉启动
    desc("工作台").waitFor();
    desc("工作台").findOne().click();
    sleep(4000);
    if (!desc("考勤打卡").exists()) {
        swipe(500, 1300, 500, 500, 300);
        sleep(1000);
    }
    desc("考勤打卡").findOne().click();
    //等待打卡界面加载
    descContains("班时间").waitFor();
    //打卡按钮名字
    if (!desc(descStr).exists()) {
        toast(descStr + '不存在');
        sleep(1000 * 60 * 60);
        checkTime();
        return;
    }
    toast('按钮名:' + descStr);
    var button = desc(descStr).findOne();
    var bounds = button.bounds();
    var x = bounds.centerX();
    var y = bounds.centerY();
    //遮挡滚动
    if (y > 1776) {
        swipe(500, 1500, 500, 300, 300);
        sleep(500);
        button = desc(descStr).findOne();
        bounds = button.bounds();
        x = bounds.centerX();
        y = bounds.centerY();
    }
    toast('坐标:' + x + ', ' + y);
    //通过点击位置打卡
    click(x, y);
    sleep(1000 * 60 * 60);
    checkTime();
}