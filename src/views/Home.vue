<template>
  <div class="home">
    <!-- Hero Section -->
    <div class="row mb-5">
      <div class="col-12">
        <div class="card bg-primary text-white">
          <div class="card-body py-5">
            <div class="row align-items-center">
              <div class="col-lg-8">
                <h1 class="display-4 fw-bold mb-4">
                  Welcome to TechStore Egypt! 🇪🇬
                </h1>
                <p class="lead mb-4">
                  Discover the latest technology products at unbeatable prices. 
                  From cutting-edge electronics to innovative gadgets, we bring you 
                  the best tech solutions right to your doorstep.
                </p>
                <div class="d-flex gap-3">
                  <router-link to="/products" class="btn btn-light btn-lg">
                    <i class="fas fa-shopping-bag me-2"></i>
                    Shop Now
                  </router-link>
                  <router-link to="/about" class="btn btn-outline-light btn-lg">
                    <i class="fas fa-info-circle me-2"></i>
                    Learn More
                  </router-link>
                </div>
              </div>
              <div class="col-lg-4 text-center">
                <i class="fas fa-laptop fa-8x opacity-50"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="row mb-5">
      <div class="col-12">
        <h2 class="text-center mb-5">Why Choose TechStore Egypt?</h2>
      </div>
      <div class="col-md-4 mb-4">
        <div class="card h-100 text-center">
          <div class="card-body">
            <i class="fas fa-shipping-fast fa-3x text-primary mb-3"></i>
            <h5 class="card-title">Fast Delivery</h5>
            <p class="card-text">
              Get your tech products delivered quickly across Egypt with our 
              reliable shipping network.
            </p>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-4">
        <div class="card h-100 text-center">
          <div class="card-body">
            <i class="fas fa-shield-alt fa-3x text-success mb-3"></i>
            <h5 class="card-title">Quality Guaranteed</h5>
            <p class="card-text">
              All our products come with warranty and quality assurance. 
              Shop with confidence knowing you're protected.
            </p>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-4">
        <div class="card h-100 text-center">
          <div class="card-body">
            <i class="fas fa-headset fa-3x text-info mb-3"></i>
            <h5 class="card-title">24/7 Support</h5>
            <p class="card-text">
              Our dedicated support team is always ready to help you with 
              any questions or concerns you may have.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Section -->
    <div class="row mb-5">
      <div class="col-12">
        <div class="card bg-light">
          <div class="card-body">
            <div class="row text-center">
              <div class="col-md-3 mb-3">
                <h3 class="text-primary fw-bold">1000+</h3>
                <p class="text-muted">Happy Customers</p>
              </div>
              <div class="col-md-3 mb-3">
                <h3 class="text-success fw-bold">500+</h3>
                <p class="text-muted">Products Available</p>
              </div>
              <div class="col-md-3 mb-3">
                <h3 class="text-warning fw-bold">27</h3>
                <p class="text-muted">Cities Covered</p>
              </div>
              <div class="col-md-3 mb-3">
                <h3 class="text-info fw-bold">99%</h3>
                <p class="text-muted">Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Newsletter Section -->
    <div class="row">
      <div class="col-12">
        <div class="card bg-dark text-white">
          <div class="card-body text-center py-5">
            <h3 class="mb-4">Stay Updated with Latest Tech News</h3>
            <p class="mb-4">Subscribe to our newsletter and get exclusive deals and updates!</p>
            <div class="row justify-content-center">
              <div class="col-md-6">
                <div class="input-group">
                  <input 
                    type="email" 
                    class="form-control" 
                    placeholder="Enter your email address"
                  >
                  <button class="btn btn-primary" type="button">
                    <i class="fas fa-paper-plane me-2"></i>
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
.home {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.card {
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}

.btn {
  transition: all 0.3s ease;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}
</style>