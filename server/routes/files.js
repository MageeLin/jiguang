var express = require('express');
var router = express.Router();
// 引入models中的model实例
var Homepages = require('../models/homepages');
var Articles = require('../models/articles');

// 引入multer
var fs = require('fs');
var path = require('path');
var multer = require('multer');



// 下面是上传slider图片文件
// 详细配置multer选项
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'static/images/slider/')
    },
    filename: function (req, file, cb) {
        // 修改文件名字，利用path获取了拓展名
        cb(null, req.body.key + path.extname(file.originalname) + '');
    }
});

var upload = multer({
    storage: storage
})



/* GET home page. */
router.post('/weapp/uploadslider', upload.single('slider'), function (req, res, next) {
    // 上传slider文件并修改homepages数据库中的文件名


    // var file = req.file;
    // console.log(req.body);
    // console.log(file);
    // console.log('文件类型：%s', file.mimetype);
    // console.log('原始文件名：%s', file.originalname);
    // console.log('文件大小：%s', file.size);
    // console.log('文件保存路径：%s', file.path);
    var key = req.body.key;
    if (key) {
        Homepages.findOne({}, function (err, doc) {
            if (err) {
                res.json({
                    status: '1',
                    msg: '查找homepages数据库出错',
                    result: ''
                });
            } else {
                if (doc) {
                    doc.welcome[key + 'Src'] = req.body.key + path.extname(req.file.originalname) + '';
                    doc.save(function (err) {
                        if (err) {
                            res.json({
                                status: '1',
                                msg: '保存homepages数据库时出错',
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
                        msg: '查找homepages结果为空',
                        result: ''
                    });
                }
            }
        });
    } else {
        res.json({
            status: '1',
            msg: 'key不存在',
            result: ''
        });
    }


    // 接收文件成功后返回数据给前端
    // res.json({
    //     res_code: '0'
    // });
});


// 下面是上传collection图片文件
// 详细配置multer选项
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'static/images/collection/')
    },
    filename: function (req, file, cb) {
        // 修改文件名字，利用path获取了拓展名
        cb(null, req.body.key + path.extname(file.originalname) + '');
    }
});

var upload = multer({
    storage: storage
})

router.post('/weapp/uploadcollection', upload.single('collection'), function (req, res, next) {
    // 上传collection文件并修改homepages数据库中的文件名


    // var file = req.file;
    // console.log(req.body);
    // console.log(file);
    // console.log('文件类型：%s', file.mimetype);
    // console.log('原始文件名：%s', file.originalname);
    // console.log('文件大小：%s', file.size);
    // console.log('文件保存路径：%s', file.path);
    var key = req.body.key;
    if (key) {
        Homepages.findOne({}, function (err, doc) {
            if (err) {
                res.json({
                    status: '1',
                    msg: '查找homepages数据库出错',
                    result: ''
                });
            } else {
                if (doc) {
                    console.log(key + 'Src', req.body.key + path.extname(req.file.originalname) + '');
                    doc['artwork'][key + 'Src'] = req.body.key + path.extname(req.file.originalname) + '';
                    doc.save(function (err) {
                        if (err) {
                            res.json({
                                status: '1',
                                msg: '保存homepages数据库时出错',
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
                        msg: '查找homepages结果为空',
                        result: ''
                    });
                }
            }
        });
    } else {
        res.json({
            status: '1',
            msg: 'key不存在',
            result: ''
        });
    }

});



// 下面是上传contact中二维码图片文件
// 详细配置multer选项
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'static/images/contact/')
    },
    filename: function (req, file, cb) {
        // 修改文件名字，利用path获取了拓展名
        cb(null, 'qrcode' + req.body.key + path.extname(file.originalname) + '');
    }
});

var upload = multer({
    storage: storage
})

router.post('/weapp/uploadcontact', upload.single('qrcode'), function (req, res, next) {
    // 上传qrcode文件并修改homepages数据库中的文件名


    var key = req.body.key;
    if (key) {
        Homepages.findOne({}, function (err, doc) {
            if (err) {
                res.json({
                    status: '1',
                    msg: '查找homepages数据库出错',
                    result: ''
                });
            } else {
                if (doc) {
                    console.log(key + '', 'qrcode' + req.body.key + path.extname(req.file.originalname) + '');
                    doc['contact'][key + ''] = 'qrcode' + req.body.key + path.extname(req.file.originalname) + '';
                    doc.save(function (err) {
                        if (err) {
                            res.json({
                                status: '1',
                                msg: '保存homepages数据库时出错',
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
                        msg: '查找homepages结果为空',
                        result: ''
                    });
                }
            }
        });
    } else {
        res.json({
            status: '1',
            msg: 'key不存在',
            result: ''
        });
    }

});


// 下面是文章内容的上传，主要是包含图片文件，所以放在files.js中
// 下面是上传article中插图图片文件
// 详细配置multer选项
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'static/images/article/')
    },
    filename: function (req, file, cb) {
        // 修改文件名字，利用path获取了拓展名
        // 经过下面修改,文件名大概问article0-2.png
        cb(null, req.body.url + '-' + req.body.imageOrder + path.extname(file.originalname) + '');
    }
});

var upload = multer({
    storage: storage
})

router.post('/weapp/uploadarticleimage', upload.single('articleImage'), function (req, res, next) {
    // 上传文件并且重命名,修改数据库交给articles.js来做
    res.json({
        status: '0',
        msg: '上传图片成功',
        result: ''
    });


    // // 上传articleImage文件并修改articles数据库中的文件名
    // var params = {
    //     url: req.body.url
    // }
    // var articleOrder = req.body.articleOrder;
    // var imageOrder = req.body.imageOrder;
    // var title = req.body.title;
    // var 
    // if (req.body.url) {
    //     Articles.findOne(params, function (err, doc) {
    //         if (err) {
    //             res.json({
    //                 status: '1',
    //                 msg: '查找articles数据库出错',
    //                 result: ''
    //             });
    //         } else {
    //             if (doc) {
    //                 doc['contact'][key + ''] = 'qrcode' + req.body.key + path.extname(req.file.originalname) + '';
    //                 doc.save(function (err) {
    //                     if (err) {
    //                         res.json({
    //                             status: '1',
    //                             msg: '保存homepages数据库时出错',
    //                             result: ''
    //                         });
    //                     } else {
    //                         res.json({
    //                             status: '0',
    //                             msg: '修改成功',
    //                             result: ''
    //                         });
    //                     }
    //                 });
    //             } else {
    //                 res.json({
    //                     status: '1',
    //                     msg: '查找homepages结果为空',
    //                     result: ''
    //                 });
    //             }
    //         }
    //     });
    // } else {
    //     res.json({
    //         status: '1',
    //         msg: '文章不存在',
    //         result: ''
    //     });
    // }

});


// 下面是返回static文件,暂时借用weapp接口
router.all('/weapp/getimage/:fileclass/:filename', function (req, res, next) {
    // 利用resolve来合并path,不要自己拼接字符串
    let imagePath = path.resolve(__dirname, './../static/images', req.params.fileclass, req.params.filename);
    // let imagePath = __dirname + '/../static/images/' + req.params.fileclass + '/' + req.params.filename;
    console.log(imagePath);
    res.sendFile(imagePath);
});

module.exports = router;