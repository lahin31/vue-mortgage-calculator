import Vue from 'vue'
import VueRouter from 'vue-router'
import VeeValidate from 'vee-validate'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { Main, Row, Col } from 'element-ui';
import MortgageCalculator from './components/MortgageCalculator.vue'
import MortgageFinanceCalculator from './components/MortgageFinanceCalculator.vue'
import MortgagePaymentCalculator from './components/MortgagePaymentCalculator.vue'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VeeValidate)
Vue.use(ElementUI)
Vue.use(Main)
Vue.use(Row)
Vue.use(Col)

const routes = [
  { path: '/', component: MortgageCalculator },
  { path: '/mortgage-finance-calculator', component: MortgageFinanceCalculator },
  { path: '/mortgage-payment-calculator', component: MortgagePaymentCalculator }
];

const router = new VueRouter({
  routes, 
  mode: 'history'
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
