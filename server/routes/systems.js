var express = require('express');
var router = express.Router();
// 返回系统信息
var os = require("os");

router.post('/weapp/getsysteminfo', function (req, res, next) {
    // // CPU 的字节序
    // console.log('主机名：' + os.hostname());
    // console.log('endianness : ' + os.endianness());
    // console.log('架构：' + os.arch());
    // console.log('运行时间：' + os.uptime());

    // // 操作系统名
    // console.log('type : ' + os.type());

    // // 操作系统名
    // console.log('platform : ' + os.platform());
    // console.log('发行版本：' + os.release())
    // console.log(os.loadavg());

    // // 系统内存总量
    // console.log('total memory : ' + os.totalmem() + " bytes.");

    // // 操作系统空闲内存量
    // console.log('free memory : ' + os.freemem() + " bytes.");
    // console.log(os.cpus());
    let memoryTotal = Math.round(os.totalmem()/1024/1024);
    let memoryRate = Math.round((1 - (os.totalmem() - os.freemem())/os.totalmem())*100);


    let systems = [{
        content: '内存占用率',
        label: memoryRate + '%',
        'icon-src': '../../static/list-icon/ramRate.png'
    }, {
        content: '内存总量',
        label: memoryTotal + 'MB',
        'icon-src': '../../static/list-icon/ramTotal.png'
    }, {
        content: '平均负载',
        label: os.loadavg()[2],
        'icon-src': '../../static/list-icon/loadEverage.png'
    }, {
        content: '操作平台',
        label: os.platform(),
        'icon-src': '../../static/list-icon/platform.png'
    }, {
        content: '操作系统',
        label: os.type(),
        'icon-src': '../../static/list-icon/operationSystem.png'
    }, {
        content: '发行版本',
        label: os.release(),
        'icon-src': '../../static/list-icon/version.png'
    }, {
        content: '处理器架构',
        label: os.arch(),
        'icon-src': '../../static/list-icon/cpuArch.png'
    }, {
        content: '处理器型号',
        label: os.cpus()[0].model.substr(0,20),
        'icon-src': '../../static/list-icon/cpuName.png'
    }, ];
    res.json({
        status: '0',
        msg: '查询成功',
        result: systems
    });
});


module.exports = router;