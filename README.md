#吉光
**吉光主页（响应式）、CMS内容管理系统（微信小程序端）、后端API接口**
## 主页（响应式）

**[主页demo入口](http://123.207.155.80/projects/jiguang/ "主页demo")**
**[查看源码](https://github.com/MagnetLin/jiguang/tree/master/home)**
+ 框架
	+ 使用Vue、Vuex、VueRouter、axios全家桶
	+ 前后端分离
+ 样式
    + UI：[Bootstrap-vue](https://github.com/bootstrap-vue/bootstrap-vue/)
    + 自适应
    + 滚动监听
		+ 修改了[vue-scrollwatch](https://github.com/Desdesdesgo/vue-scrollwatch)插件，使不同组件间也能进行滚动监听，并push给了原作者
	+ 轮播图
	+ 弹出遮罩
	+ toptip
+ 功能
    + 注册
    + 登录（账号密码或cookies）
	+ 个人信息
    + 留言回复
	+ 快捷联系
	+ 成员展示
	+ 作品展示
	
## CMS内容管理系统
**老域名过期，新域名还没有申请下来，由于小程序规则限制，暂时不能发布demo。**
**[查看源码](https://github.com/MagnetLin/jiguang/tree/master/weapp)**
+ 框架
	+ 使用[mpvue](https://github.com/Meituan-Dianping/mpvue)、Vuex、VueRouter
	+ 请求库使用的[Flyio](https://github.com/wendux/fly/blob/master/README-CH.md)
+ 样式
    + UI：[mp-weui](https://github.com/youngluo/mp-weui),与微信界面样式更加统一
+ 功能
    + 登录（账号密码或cookies）
    + 服务器信息
	+ 主页内容修改
	+ 富文本编辑器
		+魔改了[miniapp-editor](https://github.com/xbhub/miniapp-editor)插件，将小程序插件修改为vue插件，更正了原插件样式和逻辑bug，并push给了原作者
	+ 成员管理
	+ 留言板管理
	
## 后端API接口（主页和小程序共用一套）
**[查看源码](https://github.com/MagnetLin/jiguang/tree/master/server)**
+ 框架
	+ Express后端框架
	+ MongoDB数据库
	+ 使用mongoose插件连接服务器与数据库
	
+ 功能
    + 注册
    + 登录（账号密码或cookies）
    + 留言板
	+ 成员信息
	+ 成员展示
	+ 主页内容（利用multer进行图片文件上传）
	+ 文件返回
	
