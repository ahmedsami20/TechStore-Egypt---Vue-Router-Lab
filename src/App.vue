<template>
  <div id="app">
    <!-- Navigation Bar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
      <div class="container">
        <router-link to="/" class="navbar-brand">
          <i class="fas fa-store me-2"></i>
          TechStore Egypt
        </router-link>
        
        <button 
          class="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <router-link to="/" class="nav-link" active-class="active">
                <i class="fas fa-home me-1"></i>Home
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/products" class="nav-link" active-class="active">
                <i class="fas fa-box me-1"></i>Products
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/about" class="nav-link" active-class="active">
                <i class="fas fa-info-circle me-1"></i>About
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/contact" class="nav-link" active-class="active">
                <i class="fas fa-envelope me-1"></i>Contact
              </router-link>
            </li>
          </ul>
          
          <!-- Cart Link with Badge -->
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/cart" class="nav-link position-relative" active-class="active">
                <i class="fas fa-shopping-cart me-1"></i>
                Cart
                <span 
                  v-if="cartStore.totalItems > 0" 
                  class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                >
                  {{ cartStore.totalItems }}
                </span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="container mt-4 mb-5">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="bg-dark text-light py-4 mt-auto">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <h5>TechStore Egypt</h5>
            <p class="mb-0">Your trusted technology partner since 2024</p>
          </div>
          <div class="col-md-6 text-md-end">
            <p class="mb-0">&copy; 2024 TechStore Egypt. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { cartStore } from './stores/cartStore.js'

export default {
  name: 'App',
  data() {
    return {
      cartStore
    }
  }
}
</script>

<style>
#app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}

.navbar-brand {
  font-weight: bold;
  font-size: 1.5rem;
}

.nav-link {
  transition: all 0.3s ease;
}

.nav-link:hover {
  transform: translateY(-2px);
}

.nav-link.active {
  font-weight: bold;
}

.badge {
  font-size: 0.7rem;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

/* Smooth page transitions */
.router-link-exact-active {
  color: #fff !important;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 0.375rem;
}
</style>