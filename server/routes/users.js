var express = require('express');
var router = express.Router();
// 引入models中的model实例
var Users = require('../models/users');

/* GET users listing. */

router.post('/reg', function (req, res, next) {
  // 注册个人账户信息
  console.log(req.body);
  if (!req.body) {
    res.json({
      status: '1',
      msg: '注册信息未填写',
      result: ''
    });
    return
  } else {
    let flag = false;
    Object.keys(req.body).forEach(function (key) {
      // 检测注册信息是否有空对象
      if (!req.body[key]) {
        flag = true;

      }
    });
    if (flag) {
      res.json({
        status: '1',
        msg: '注册信息未填写完全',
        result: ''
      });
      return
    }
  }

  var regParams = {
    name: req.body.name,
    nickname: req.body.nickname,
    institute: req.body.institute,
    major: req.body.major,
    department: req.body.department,
    enterSchool: req.body.enterSchool,
    leaveSchool: req.body.leaveSchool,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
    avatar: req.body.avatar,
    promptNumber: 0
  }
  // 通过验证码分配权限
  if (req.body.code == '0431') {
    regParams.isAdministrator = true;
    regParams.isGuest = false;
  } else if (req.body.code == '86') {
    regParams.isAdministrator = false;
    regParams.isGuest = false;
  } else if (req.body.code == 'world') {
    regParams.isAdministrator = false;
    regParams.isGuest = true;
  } else {
    res.json({
      status: '1',
      msg: '邀请码错误',
      result: ''
    });
    return
  }
  Users.create(regParams, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: '数据库错误'
      });
    } else {
      res.json({
        status: '0',
        msg: '注册成功，请登录',
        result: ''
      });
    }
  });
});



// 获取个人信息内容（post方法）
router.post('/getbylogin', function (req, res, next) {
  // 登录按钮时接口
  var params = {
    email: req.body.email,
    password: req.body.password
  }
  console.log(params);
  Users.findOne(params, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: '数据库出错'
      });
    } else {
      if (!doc) {
        res.json({
          status: '1',
          msg: '邮箱或密码错误',
          result: ''
        });
      } else {
        res.cookie('id', doc._id, {
          maxAge: 7 * 24 * 60 * 60 * 1000
        });
        doc.password = '';
        res.json({
          status: '0',
          msg: '',
          result: doc
        });
      }

    }
  });

});

router.post('/getbycookie', function (req, res, next) {
  // 登录cookies时接口
  var params = {
    _id: req.cookies.id
  }
  // console.log(params);
  Users.findOne(params, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: '数据库出错'
      });
    } else {
      if (!doc) {
        res.json({
          status: '1',
          msg: 'cookies错误',
          result: ''
        });
      } else {
        res.cookie('id', doc._id, {
          maxAge: 7 * 24 * 60 * 60 * 1000
        });
        doc.password = '';
        res.json({
          status: '0',
          msg: '',
          result: doc
        });
      }

    }
  });

});

router.post('/modifybycookie', function (req, res, next) {
  // 通过cookie修改个人信息
  var params = {
    _id: req.cookies.id
  }
  var modify = req.body.personalInfo;
  console.log(params);
  console.log(req.body.personalInfo);



  // let flag = false;
  // Object.keys(modify).forEach(function (key) {
  //   // 检测注册信息是否有空对象
  //   if (!modify[key]) {
  //     flag = true;

  //   }
  // });
  // if (flag) {
  //   res.json({
  //     status: '1',
  //     msg: '信息未填写完全',
  //     result: ''
  //   });
  //   return
  // }




  if (!modify.password) {
    res.json({
      status: '1',
      msg: '密码不能为空',
      result: ''
    });
  } else {
    Users.update(params, modify, function (err, doc) {
      if (err) {
        res.json({
          status: '1',
          msg: err.message,
          result: '数据库出错'
        });
      } else {
        res.json({
          status: '0',
          msg: '修改成功',
          result: doc
        });
      }
    });
  }

});


router.post('/getphone', function (req, res, next) {
  // 获取留言板处的联系方式
  var member = {
    jsb: [],
    sjb: [],
    yxb: [],
    else: []
  }
  Users.find({}, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: '数据库出错'
      });
    } else {
      if (doc) {
        for (let i = 0; i < doc.length; i++) {
          let user = doc[i];
          console.log(user.department);
          switch (user.department) {
            case 'jsb':
              member.jsb.push({
                姓名: user.name,
                电话: user.phone
              })
              break;
            case 'sjb':
              member.sjb.push({
                姓名: user.name,
                电话: user.phone
              })
              break;
            case 'yxb':
              member.yxb.push({
                姓名: user.name,
                电话: user.phone
              })
              break;
            case 'else':
              member.else.push({
                姓名: user.name,
                电话: user.phone
              })
              break;
            default:
              break;
          }
        }
        res.json({
          status: '0',
          msg: '读取成功',
          result: member
        });
      } else {
        res.json({
          status: '1',
          msg: '未找到数据',
          result: '数据库出错'
        });
      }
    }
  });
});


router.post('/promptplus', function (req, res, next) {
  // 回复提醒加1
  var params = {
    _id: req.body.creatorId
  }
  // console.log(params);
  Users.findOne(params, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: '查找数据库id出错'
      });
    } else {
      if (doc) {
        // console.log(doc);
        doc.promptNumber++;
        doc.save(function (err) {
          if (err) {
            res.json({
              status: '1',
              msg: err.message,
              result: '数据库prompt+1出错'
            });
          } else {
            res.json({
              status: '0',
              msg: 'prompt+1成功',
              result: ''
            });
          }
        });
      } else {
        res.json({
          status: '1',
          msg: '用户不存在',
          result: ''
        });
      }

    }
  });
});

router.post('/promptclear', function (req, res, next) {
  // 回复提醒加1
  var params = {
    _id: req.cookies.id
  }
  Users.findOne(params, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: '查找数据库id出错'
      });
    } else {
      if (doc) {
        // console.log(doc);
        doc.promptNumber = 0;
        doc.save(function (err) {
          if (err) {
            res.json({
              status: '1',
              msg: err.message,
              result: '数据库prompt清空出错'
            });
          } else {
            res.json({
              status: '0',
              msg: 'prompt清空成功',
              result: ''
            });
          }
        });
      } else {
        res.json({
          status: '1',
          msg: '用户不存在',
          result: ''
        });
      }

    }
  });
});

router.get('/getstudentinfo', function (req, res, next) {
  // 获取homgpage中的成员学生信息
  Users.find({
    department: {
      $ne: 'else'
    }
  }, {
    name: 1,
    avatar: 1,
    _id:0
  }, function (err, doc) {
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
          msg: '读取成功',
          result: doc
        });
      } else {
        res.json({
          status: '1',
          msg: '未找到数据',
          result: '数据库出错'
        });
      }
    }
  });
});

// 小程序接口分界线
router.post('/weapp/getbylogin', function (req, res, next) {
  // 通过邮箱和密码登录
  var params = {
    email: req.body.email,
    password: req.body.password
  }
  Users.findOne(params, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: '查找数据库发生了一些错误',
        result: ''
      });
    } else {
      if (doc) {
        if (doc.isAdministrator) {
          res.json({
            status: '0',
            msg: '登录成功',
            result: doc
          });
        } else {
          res.json({
            status: '1',
            msg: '管理员账户才可登录',
            result: ''
          });
        }

      } else {
        res.json({
          status: '1',
          msg: '账号或密码错误',
          result: ''
        });
      }

    }
  });
});

router.post('/weapp/getbystorage', function (req, res, next) {
  // 通过storage登录
  var params = {
    _id: req.body.id,
  }
  Users.findOne(params, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: '查找数据库发生了一些错误',
        result: ''
      });
    } else {
      if (doc) {
        if (doc.isAdministrator) {
          res.json({
            status: '0',
            msg: '登录成功',
            result: doc
          });
        } else {
          res.json({
            status: '1',
            msg: '管理员账户才可登录',
            result: ''
          });
        }

      } else {
        res.json({
          status: '1',
          msg: '_id错误',
          result: ''
        });
      }

    }
  });
});


router.post('/weapp/getalluser', function (req, res, next) {
  // 查询用户条目，获取姓名，id和部门

  // var params = {
  //   _id: req.body.id,
  // }
  Users.find({}, {
    _id: 1,
    name: 1,
    department: 1
  }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: '查找数据库发生了一些错误',
        result: ''
      });
    } else {
      if (doc) {
        for (let i = 0; i < doc.length; i++) {
          switch (doc[i].department) {
            case 'jsb':
              doc[i].department = '技术部';
              break;
            case 'sjb':
              doc[i].department = '设计部';
              break;
            case 'yxb':
              doc[i].department = '营销部';
              break;
            case 'else':
              doc[i].department = '其他';
              break;
            default:
              break;
          }

        }
        res.json({
          status: '0',
          msg: '查询成功',
          result: doc
        });


        // if (doc.isAdministrator) {
        //   res.json({
        //     status: '0',
        //     msg: '登录成功',
        //     result: doc
        //   });
        // } else {
        //   res.json({
        //     status: '1',
        //     msg: '管理员账户才可登录',
        //     result: ''
        //   });
        // }

      } else {
        res.json({
          status: '1',
          msg: '数据库为空',
          result: ''
        });
      }

    }
  });
});


router.post('/weapp/getoneuser', function (req, res, next) {
  // 管理员查询用户信息

  var params = {
    _id: req.body.id,
  }
  // var modify = {
  //   name:req.name,
  //   nickname: req.nickname,

  // }

  Users.findOne(params, {
    password: 0
  }, function (err, doc) {
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
          msg: '查询成功',
          result: doc
        });


        // if (doc.isAdministrator) {
        //   res.json({
        //     status: '0',
        //     msg: '登录成功',
        //     result: doc
        //   });
        // } else {
        //   res.json({
        //     status: '1',
        //     msg: '管理员账户才可登录',
        //     result: ''
        //   });
        // }

      } else {
        res.json({
          status: '1',
          msg: '查询不到该用户',
          result: ''
        });
      }

    }
  });
});


router.post('/weapp/oneusermodify', function (req, res, next) {
  // 管理员修改用户信息

  var params = {
    _id: req.body.id,
  }
  var modify = {
    name: req.body.name,
    nickname: req.body.nickname,
    institute: req.body.institute,
    major: req.body.major,
    department: req.body.department,
    enterSchool: req.body.enterSchool,
    leaveSchool: req.body.leaveSchool,
    phone: req.body.phone,
    email: req.body.email,
    avatar: req.body.avatar,
    isAdministrator: req.body.isAdministrator,
    isGuest: req.body.isGuest
  }

  Users.findOne(params, {
    password: 0
  }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: '查找数据库发生了一些错误',
        result: ''
      });
    } else {
      if (doc) {
        doc.name = modify.name;
        doc.nickname = modify.nickname;
        doc.institute = modify.institute;
        doc.major = modify.major;
        doc.department = modify.department;
        doc.enterSchool = modify.enterSchool;
        doc.leaveSchool = modify.leaveSchool;
        doc.phone = modify.phone;
        doc.email = modify.email;
        doc.avatar = modify.avatar;
        doc.isAdministrator = modify.isAdministrator;
        doc.isGuest = modify.isGuest;
        doc.save(function (err) {
          if (err) {
            res.json({
              status: '1',
              msg: '修改oneuser信息时出错',
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

        // res.json({
        //   status: '0',
        //   msg: '查询成功',
        //   result: doc
        // });
      } else {
        res.json({
          status: '1',
          msg: '查询不到该用户',
          result: ''
        });
      }

    }
  });
});


router.post('/weapp/oneuserDelete', function (req, res, next) {
  // 管理员修改用户信息

  var params = {
    _id: req.body.id,
  }


  Users.findOneAndDelete(params, function (err, doc) {
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
          msg: '查询不到该用户',
          result: ''
        });
      }

    }
  });
});


module.exports = router;