import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

// Import Views
import Home from './views/Home.vue'
import Products from './views/Products.vue'
import About from './views/About.vue'
import Cart from './views/Cart.vue'
import Contact from './views/Contact.vue'

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'

// Define routes
const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/products', name: 'Products', component: Products },
  { path: '/about', name: 'About', component: About },
  { path: '/cart', name: 'Cart', component: Cart },
  { path: '/contact', name: 'Contact', component: Contact }
]

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes
})

// Create Vue app
const app = createApp(App)
app.use(router)
app.mount('#app')
