var express = require('express');
var router = express.Router();
// 引入models中的model实例
var Messageboards = require('../models/messageboards');

/* GET users listing. */
// 获取留言板信息内容（post方法）
router.post('/getmessage', function (req, res, next) {
    let limit = req.body.perPage;
    let skip = (req.body.currentPage - 1) * limit;
    console.log(limit, skip);
    Messageboards.find({}).skip(skip).limit(limit).sort('-time').exec(function (err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: '数据库出错'
            });
        } else {
            if (doc) {
                res.json({
                    status: '0',
                    msg: '',
                    result: doc
                });
            } else {
                res.json({
                    status: '1',
                    msg: '数据库doc为空',
                    result: ''
                });
            }
        }
    });
});

router.post('/createmessage', function (req, res, next) {
    // 发布留言
    let params = {
        creatorId: req.body.creatorId,
        creatorName: req.body.creatorName,
        avatar: req.body.avatar,
        time: new Date(),
        content: req.body.content,
        reply: []
    }
    console.log(params);
    Messageboards.create(params, function (err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: '数据库出错'
            });
        } else {
            if (doc) {
                res.json({
                    status: '0',
                    msg: '',
                    result: doc
                });
            } else {
                res.json({
                    status: '1',
                    msg: '数据库doc为空',
                    result: ''
                });
            }
        }
    });

});

router.post('/replymessage', function (req, res, next) {
    // 回复留言板接口
    let messageParams = {
        _id: req.body.messageId
    }
    let replyModify = {
        name: req.body.name,
        avatar: req.body.avatar,
        time: new Date(),
        content: req.body.content,
    }
    // console.log(replyModify);
    Messageboards.findOne(messageParams, function (err, doc) {
        // 保存到留言板的数据库里
        if (err) {
            res.json({
                status: '1',
                msg: '数据库查找留言Id失败',
                result: ''
            });
        } else {
            if (doc) {
                console.log(doc);
                doc.reply.push(replyModify);
                doc.save(function (err) {
                    if (err) {
                        res.json({
                            status: '1',
                            msg: '数据库保存回复失败',
                            result: ''
                        });
                    } else {
                        res.json({
                            status: '0',
                            msg: '回复成功',
                            result: ''
                        });
                    }
                });
            } else {
                res.json({
                    status: '1',
                    msg: '数据库doc为空',
                    result: ''
                });
            }
        }
    });

    // 给用户的提醒数加1
    let userparams = {
        creatorId: req.body.creatorId,
    }
});



// 小程序端分界线

router.post('/weapp/getmessage', function (req, res, next) {
    let limit = Number(req.body.limit);
    let skip = (req.body.times - 1) * limit;
    console.log(limit, skip);
    Messageboards.find({}, {
        _id: 1,
        creatorName: 1,
        content: 1,
        avatar:1
    }).skip(skip).limit(limit).sort('-time').exec(function (err, doc) {
        if (err) {
            console.log(err);
            res.json({
                status: '1',
                msg: '数据库出错',
                result: ''
            });
        } else {
            if (doc) {
                res.json({
                    status: '0',
                    msg: '读取成功',
                    result: doc
                });
            } else {
                res.json({
                    status: '1',
                    msg: '数据库doc为空',
                    result: ''
                });
            }
        }
    });
});



router.post('/weapp/getmessagedetail', function (req, res, next) {
    // 查询留言详细信息

    var params = {
        _id: req.body.id,
    }

    Messageboards.findOne(params, function (err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: '查找messageboards数据库发生了一些错误',
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
                    msg: '查询不到该留言',
                    result: ''
                });
            }

        }
    });
});


router.post('/weapp/messagedelete', function (req, res, next) {
    // 查询留言详细信息

    var params = {
        _id: req.body.id,
    }


    Messageboards.findOneAndDelete(params, function (err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: '查找数据库发生了一些错误',
                result: ''
            });
        } else {
            if (doc) {
                res.json({
                    status: '0',
                    msg: '删除成功',
                    result: ''
                });
            } else {
                res.json({
                    status: '1',
                    msg: '查询不到该留言',
                    result: ''
                });
            }

        }
    });

});


module.exports = router;