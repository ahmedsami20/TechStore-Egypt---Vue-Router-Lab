<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
    <div class="container">
      <a class="navbar-brand" href="#">
        <i class="fas fa-microchip me-2 text-primary"></i>
        <span class="brand-text">TechStore Egypt</span>
      </a>
      
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" id="navbarNav">
        <div class="navbar-nav ms-auto align-items-center">
          <!-- Cart Info -->
          <div class="nav-item me-3">
            <button @click="$emit('toggle-cart')" class="btn btn-outline-light position-relative">
              <i class="fas fa-shopping-cart me-1"></i>
              Cart
              <span v-if="cartCount > 0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {{ cartCount }}
              </span>
            </button>
          </div>
          
          <!-- Cart Total -->
          <div class="nav-item me-3" v-if="cartTotal > 0">
            <span class="navbar-text">
              <i class="fas fa-money-bill-wave me-1 text-success"></i>
              <strong class="text-success">{{ formatPrice(cartTotal) }} EGP</strong>
            </span>
          </div>
          
          <!-- Clear Cart -->
          <div class="nav-item" v-if="cartCount > 0">
            <button @click="$emit('clear-cart')" class="btn btn-outline-danger btn-sm">
              <i class="fas fa-trash me-1"></i>
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  props: {
    cartCount: {
      type: Number,
      default: 0
    },
    cartTotal: {
      type: Number,
      default: 0
    }
  },
  emits: ['toggle-cart', 'clear-cart'],
  methods: {
    formatPrice(price) {
      return Math.round(price).toLocaleString()
    }
  }
}
</script>

<style scoped>
.navbar {
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.navbar-brand {
  font-weight: bold;
  font-size: 1.8rem;
  transition: all 0.3s ease;
}

.navbar-brand:hover {
  transform: scale(1.05);
}

.brand-text {
  background: linear-gradient(45deg, #fff, #007bff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.btn {
  transition: all 0.3s ease;
  border-radius: 25px;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
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

.navbar-text {
  font-weight: 500;
}

@media (max-width: 768px) {
  .navbar-nav {
    text-align: center;
    padding: 1rem 0;
  }
  
  .nav-item {
    margin: 0.5rem 0;
  }
}
</style>