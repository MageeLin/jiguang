var express = require('express');
var router = express.Router();
// 引入models中的model实例
var Footers = require('../models/footers');


/* GET home page. */
// 获取页脚内容
router.get('/get', function (req, res, next) {
    Footers.findOne({}, function (err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: '数据库出错'
            });
        } else {
            res.json({
                status: '0',
                msg: '',
                result: doc
            });
        }
    });

});

//下面是小程序端接口 

router.post('/weapp/get', function (req, res, next) {
    Footers.findOne({}, function (err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: '读取footers数据库出错',
                result: ''
            });
        } else {
            if (doc) {
                res.json({
                    status: '0',
                    msg: '读取成功',
                    result: doc
                });
            }else {
                res.json({
                    status: '1',
                    msg: '未找到footers信息',
                    result: ''
                });
            }

        }
    });

});


router.post('/weapp/footermodify', function (req, res, next) {
    // 页脚修改
    let modify = {
        copyright: req.body.copyright,
        recordNumber: req.body.recordNumber,
    }
    Footers.findOne({}, function (err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: '读取footers数据库出错',
                result: ''
            });
        } else {
            if (doc) {
                doc.copyright = modify.copyright;
                doc.recordNumber = modify.recordNumber;

                doc.save(function (err) {
                    if (err) {
                        res.json({
                            status: '1',
                            msg: '修改footer时发生错误',
                            result: ''
                        });
                    } else {
                        res.json({
                            status: '0',
                            msg: '修改成功',
                            result: ''
                        });
                    }
                });

            } else {
                res.json({
                    status: '1',
                    msg: '未找到footers信息',
                    result: ''
                });
            }
        }
    });

});

module.exports = router;