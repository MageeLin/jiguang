var express = require('express');
var router = express.Router();
var Articles = require('../models/articles');

// 引入fs和path来操作拓展名
var fs = require('fs');
var path = require('path');






/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});
router.post('/getarticleinfo', function (req, res, next) {
    // 获取文章信息
    let params = {
        url: req.body.url
    }
    Articles.findOne(params, function (err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: '查找articles数据库出错',
                result: ''
            });
        } else {
            if (doc) {
                res.json({
                    status: '0',
                    msg: '查询成功',
                    result: doc
                });
            } else {
                res.json({
                    status: '1',
                    msg: '查找articles结果为空',
                    result: ''
                });
            }
        }
    });
});



// 下面是小程序端
router.post('/weapp/modifyarticle', function (req, res, next) {
    // 上传article文本信息修改
    var url = req.body.url;
    var params = {
        url: url
    }
    var title = req.body.title;
    var content = req.body.content;
    content.map((item) => {
        if (item.type == 'image') {
            item.value = url + '-' + item.index + path.extname(item.value);
        }
        return item
    });

    if (req.body.url) {
        Articles.findOne(params, function (err, doc) {
            if (err) {
                res.json({
                    status: '1',
                    msg: '查找articles数据库出错',
                    result: ''
                });
            } else {
                if (doc) {
                    // doc['contact'][key + ''] = 'qrcode' + req.body.key + path.extname(req.file.originalname) + '';
                    doc.title = title;
                    doc.content = content;
                    doc.save(function (err) {
                        if (err) {
                            res.json({
                                status: '1',
                                msg: '保存articles数据库时出错',
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
                        msg: '查找articles结果为空',
                        result: ''
                    });
                }
            }
        });
    } else {
        res.json({
            status: '1',
            msg: '文章不存在',
            result: ''
        });
    }
});




module.exports = router;