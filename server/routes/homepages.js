var express = require('express');
var router = express.Router();
// 引入models中的model实例
var Homepages = require('../models/homepages');


/* GET home page. */
// 获取主页内容
router.get('/get', function (req, res, next) {
    Homepages.findOne({}, function (err, doc) {
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
    Homepages.findOne({}, function (err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: '读取homepages数据库出错',
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
                    msg: '未找到homepages信息',
                    result: ''
                });
            }
        }
    });

});

router.post('/weapp/welcomemodify', function (req, res, next) {
    let modify = {
        slider1Title: req.body.slider1Title,
        slider1Text: req.body.slider1Text,
        slider2Title: req.body.slider2Title,
        slider2Text: req.body.slider2Text,
        slider3Title: req.body.slider3Title,
        slider3Text: req.body.slider3Text,
        slider4Title: req.body.slider4Title,
        slider4Text: req.body.slider4Text,
        title: req.body.title,
        text: req.body.text
    }
    Homepages.findOne({}, function (err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: '读取homepages数据库出错',
                result: ''
            });
        } else {
            if (doc) {
                doc.welcome.slider1Title = modify.slider1Title;
                doc.welcome.slider1Text = modify.slider1Text;
                doc.welcome.slider2Title = modify.slider2Title;
                doc.welcome.slider2Text = modify.slider2Text;
                doc.welcome.slider3Title = modify.slider3Title;
                doc.welcome.slider3Text = modify.slider3Text;
                doc.welcome.slider4Title = modify.slider4Title;
                doc.welcome.slider4Text = modify.slider4Text;
                doc.welcome.title = modify.title;
                doc.welcome.text = modify.text;

                doc.save(function (err) {
                    if (err) {
                        res.json({
                            status: '1',
                            msg: '修改welcome时发生错误',
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
                    msg: '未找到homepages信息',
                    result: ''
                });
            }
        }
    });

});

router.post('/weapp/collectionmodify', function (req, res, next) {
    let modify = {
        title: req.body.title,
        text: req.body.text,
        collection1Name: req.body.collection1Name,
        collection1Url: req.body.collection1Url,
        collection2Name: req.body.collection2Name,
        collection2Url: req.body.collection2Url,
        collection3Name: req.body.collection3Name,
        collection3Url: req.body.collection3Url,
    }
    Homepages.findOne({}, function (err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: '读取homepages数据库出错',
                result: ''
            });
        } else {
            if (doc) {
                doc.artwork.title = modify.title;
                doc.artwork.text = modify.text;
                doc.artwork.collection1Name = modify.collection1Name;
                doc.artwork.collection1Url = modify.collection1Url;
                doc.artwork.collection2Name = modify.collection2Name;
                doc.artwork.collection2Url = modify.collection2Url;
                doc.artwork.collection3Name = modify.collection3Name;
                doc.artwork.collection3Url = modify.collection3Url;

                doc.save(function (err) {
                    if (err) {
                        res.json({
                            status: '1',
                            msg: '修改collection时发生错误',
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
                    msg: '未找到homepages信息',
                    result: ''
                });
            }
        }
    });

});


router.post('/weapp/membermodify', function (req, res, next) {
    // 成员修改
    let modify = {
        title: req.body.title,
        text: req.body.text,
        personTeacher: req.body.personTeacher
    }
    Homepages.findOne({}, function (err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: '读取homepages数据库出错',
                result: ''
            });
        } else {
            if (doc) {
                doc.member.title = modify.title;
                doc.member.text = modify.text;
                doc.member.personTeacher = modify.personTeacher;

                doc.save(function (err) {
                    if (err) {
                        res.json({
                            status: '1',
                            msg: '修改member时发生错误',
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
                    msg: '未找到homepages信息',
                    result: ''
                });
            }
        }
    });

});

router.post('/weapp/contactmodify', function (req, res, next) {
    // 联系我们修改,微博和微信需要上传二维码
    let modify = {
        title: req.body.title,
        phone: req.body.phone,
        qq: req.body.qq,
    }
    Homepages.findOne({}, function (err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: '读取homepages数据库出错',
                result: ''
            });
        } else {
            if (doc) {
                doc.contact.title = modify.title;
                doc.contact.phone = modify.phone;
                doc.contact.qq = modify.qq;

                doc.save(function (err) {
                    if (err) {
                        res.json({
                            status: '1',
                            msg: '修改contact时发生错误',
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
                    msg: '未找到homepages信息',
                    result: ''
                });
            }
        }
    });

});


router.post('/weapp/cooperationmodify', function (req, res, next) {
    // 页脚修改
    let modify = {
        title: req.body.title,
        text: req.body.text,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        position: req.body.position
    }
    Homepages.findOne({}, function (err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: '读取homepages数据库出错',
                result: ''
            });
        } else {
            if (doc) {
                doc.cooperation.title = modify.title;
                doc.cooperation.text = modify.text;
                doc.cooperation.name = modify.name;
                doc.cooperation.email = modify.email;
                doc.cooperation.phone = modify.phone;
                doc.cooperation.position = modify.position;

                doc.save(function (err) {
                    if (err) {
                        res.json({
                            status: '1',
                            msg: '修改cooperation时发生错误',
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
                    msg: '未找到homepages信息',
                    result: ''
                });
            }
        }
    });

});

module.exports = router;