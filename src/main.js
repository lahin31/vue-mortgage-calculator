import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { Main, Row, Col } from 'element-ui';

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Main)
Vue.use(Row)
Vue.use(Col)

new Vue({
  render: h => h(App)
}).$mount('#app')
