import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/views/HomePage'
import Test from '@/views/Test'
import Information from '@/views/Information'
import Article from '@/views/Article'
import MessageBoard from '@/views/MessageBoard'
Vue.use(Router)

export default new Router({
  // 在服务器中需要用到下面这一行,平时不需要
  base: '/projects/jiguang',
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      // savedPosition is only available for popstate navigations.
      // 只有在浏览器前后按钮时savedPosition才是可获得的
      return savedPosition
    } else {
      // 新建一个导航
      const position = {}
      // 如果#hash存在，则导航到hash，并且加上偏移距70px，抵消导航栏
      if (to.hash) {
        position.selector = to.hash;
        position.offset = {
          x: 0,
          y: 75
        };
      }
      // 如果meta中有scrollTop
      if (to.matched.some(m => m.meta.scrollToTop)) {
        // cords will be used if no selector is provided,
        // or if the selector didn't match any element.
        position.x = 0
        position.y = 0
      }
      // if the returned position is falsy or an empty object,
      // will retain current scroll position.
      return position
    }
  },
  routes: [{
      path: '/',
      name: 'HomePage',
      component: HomePage,
      meta: {
        title: '吉光互联网工作室'
      }
    },
    {
      path: '/test',
      name: 'Test',
      component: Test,
      meta: {
        title: '吉光互联网工作室'
      }
    },
    {
      path: '/information',
      name: 'Information',
      component: Information,
      meta: {
        title: '个人信息'
      }
    },
    {
      // path: '/article?name=:articleName',
      path: '/article',
      name: 'Article',
      component: Article,
      meta: {
        title: '内容'
      }
    },
    {
      path: '/messageboard',
      name: 'MessageBoard',
      component: MessageBoard,
      meta: {
        title: '留言板'
      }
    },
  ]
})
