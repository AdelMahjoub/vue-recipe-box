// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueQuillEditor from 'vue-quill-editor';

// Components
import App from './App';

// Vuex store
import store from './store/';

// Router
import router from './router/'

// 3rd party styles
import 'font-awesome/css/font-awesome.min.css';
import 'bulma/css/bulma.css';
import 'animate.css/animate.min.css';

Vue.use(VueQuillEditor);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
