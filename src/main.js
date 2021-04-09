import Vue from 'vue'
import App from './App.vue'
// import Board from './components/Board.vue';

import 'buefy/dist/buefy.css';
import { Navbar, Carousel, Input ,Field, Table, Button, Notification, Sidebar, Menu, Switch, Select, Icon, Tabs,Dropdown, Autocomplete} from 'buefy';
import VueRouter from 'vue-router';
import {routes} from './routes';

import {store} from './store/store';
// import BoardAdmin from './components/BoardAdmin.vue';

Vue.config.productionTip = false
Vue.use(Navbar);
Vue.use(VueRouter);
Vue.use(Dropdown);

Vue.use(Carousel);
Vue.use(Input);
Vue.use(Field);
Vue.use(Button);
Vue.use(Menu);
Vue.use(Switch);
Vue.use(Select);
Vue.use(Table);

Vue.use(Icon);
Vue.use(Autocomplete);

Vue.use(Tabs);
Vue.use(Sidebar);
Vue.use(Notification);
const router = new VueRouter({

  routes
})



new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
