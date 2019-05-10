/**
 * index.js
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '@/index.vue'
import routes from './routes'

window.Vue = Vue;
Vue.use(VueRouter);

const router = new VueRouter(routes);

const vm = new Vue({
    render: h => h(index),
    router,
    mounted: function () {
    }
});

vm.$mount('#app');


