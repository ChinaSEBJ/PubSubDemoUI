/*
 * @Author: Jeff Liu
 * @Date: 2023-05-22 14:55:22
 * @LastEditTime: 2023-05-22 23:37:22
 * @LastEditors: Jeff Liu
 * @Description: 
 * @FilePath: /PubSubDemoUI/src/main.js
 * Jeff.liu@intersytems.com
 */
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
// 'development',use package;'production':use cdn;
import ElementUI from 'element-ui'
Vue.use(ElementUI, { size: 'mini'});
import('element-ui/lib/theme-chalk/index.css')

import './components/iconSvg' // iconSvg

import '@/permission' // permission control

import '@/mockjs'; // mock数据

// i18n国际化
import i18n from "@/lang";

// 分享功能集合
import { shareConfig } from './utils/share';
import axios from 'axios'
Vue.prototype.shareConfig = shareConfig;

axios.defaults.baseURL = window.g.Url;
Vue.config.productionTip = false;



new Vue({
  router,
  store,
  i18n,  // 便于可以直接在组件中通过this.$i18n使用，也可以按需引用
  render: h => h(App),
}).$mount('#app')
