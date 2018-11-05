// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource';//加载本地文件的插件json文件
Vue.use(VueResource)
Vue.config.productionTip = false

// console.log(VueResource);
/* eslint-disable no-new */
var vm=new Vue({
  el: '#app',
  router,
  VueResource,//挂载到vue环境里
  components: { App },
  template: '<App/>'
})
