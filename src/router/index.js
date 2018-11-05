import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import goods from '@/components/goods'
import sellers from '@/components/sellers'
import comments from '@/components/comments'

Vue.use(Router)

export default new Router({
  routes: [
    
    {
      name:'goods',
      path:'*',
      component:goods
    },
    {
      path:'/',
      component:goods
    },

    {
      name:'sellers',
      path:'/sellers',
      component:sellers
    },{
      name:'coments',
      path:'/comments',
      component:comments
    },

  ]
})
