<template>
  <div class="cart">
    <!-- Page Header -->
    <div class="row mb-4">
      <div class="col-12">
        <h1 class="display-5 fw-bold">
          <i class="fas fa-shopping-cart text-success me-3"></i>
          Shopping Cart
        </h1>
        <p class="lead text-muted" v-if="cartStore.totalItems > 0">
          You have {{ cartStore.totalItems }} item{{ cartStore.totalItems !== 1 ? 's' : '' }} in your cart
        </p>
      </div>
    </div>

    <!-- Empty Cart -->
    <div v-if="cartStore.items.length === 0" class="row">
      <div class="col-12">
        <div class="card text-center py-5">
          <div class="card-body">
            <i class="fas fa-shopping-cart fa-5x text-muted mb-4"></i>
            <h3 class="text-muted mb-3">Your cart is empty</h3>
            <p class="text-muted mb-4">
              Looks like you haven't added any products to your cart yet. 
              Start shopping to fill it up!
            </p>
            <router-link to="/products" class="btn btn-primary btn-lg">
              <i class="fas fa-shopping-bag me-2"></i>
              Start Shopping
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Cart Items -->
    <div v-else>
      <div class="row">
        <!-- Cart Items List -->
        <div class="col-lg-8">
          <div class="card">
            <div class="card-header bg-primary text-white">
              <h5 class="mb-0">
                <i class="fas fa-list me-2"></i>
                Cart Items ({{ cartStore.totalItems }})
              </h5>
            </div>
            <div class="card-body p-0">
              <div class="table-responsive">
                <table class="table table-hover mb-0">
                  <thead class="table-light">
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in cartStore.items" :key="item.id">
                      <!-- Product Info -->
                      <td>
                        <div class="d-flex align-items-center">
                          <img 
                            :src="item.image" 
                            :alt="item.title"
                            class="cart-item-image me-3"
                          >
                          <div>
                            <h6 class="mb-1">{{ truncateTitle(item.title) }}</h6>
                            <small class="text-muted">ID: {{ item.id }}</small>
                          </div>
                        </div>
                      </td>
                      
                      <!-- Price -->
                      <td class="align-middle">
                        <strong class="text-success">{{ formatPrice(item.price) }} EGP</strong>
                        <br>
                        <small class="text-muted" v-if="item.originalPrice">
                          ≈ ${{ item.originalPrice.toFixed(2) }} USD
                        </small>
                      </td>
                      
                      <!-- Quantity Controls -->
                      <td class="align-middle">
                        <div class="input-group input-group-sm" style="max-width: 130px;">
                          <button 
                            @click="decreaseQuantity(item.id)"
                            class="btn btn-outline-secondary"
                            :disabled="item.quantity <= 1"
                          >
                            <i class="fas fa-minus"></i>
                          </button>
                          <input 
                            :value="item.quantity"
                            @input="updateQuantity(item.id, parseInt($event.target.value) || 1)"
                            type="number" 
                            min="1" 
                            max="99"
                            class="form-control text-center"
                          >
                          <button 
                            @click="increaseQuantity(item.id)"
                            class="btn btn-outline-secondary"
                            :disabled="item.quantity >= 99"
                          >
                            <i class="fas fa-plus"></i>
                          </button>
                        </div>
                      </td>
                      
                      <!-- Item Total -->
                      <td class="align-middle">
                        <strong class="h6 text-primary">
                          {{ formatPrice(item.price * item.quantity) }} EGP
                        </strong>
                        <br>
                        <small class="text-muted" v-if="item.originalPrice">
                          ≈ ${{ (item.originalPrice * item.quantity).toFixed(2) }} USD
                        </small>
                      </td>
                      
                      <!-- Remove Button -->
                      <td class="align-middle">
                        <button 
                          @click="removeItem(item.id)"
                          class="btn btn-outline-danger btn-sm"
                          title="Remove item"
                        >
                          <i class="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          <!-- Cart Actions -->
          <div class="card mt-3">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center">
                <router-link to="/products" class="btn btn-outline-primary">
                  <i class="fas fa-arrow-left me-2"></i>
                  Continue Shopping
                </router-link>
                <button 
                  @click="clearCart"
                  class="btn btn-outline-danger"
                >
                  <i class="fas fa-trash me-2"></i>
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Order Summary -->
        <div class="col-lg-4">
          <div class="card sticky-top">
            <div class="card-header bg-success text-white">
              <h5 class="mb-0">
                <i class="fas fa-calculator me-2"></i>
                Order Summary
              </h5>
            </div>
            <div class="card-body">
              <!-- Summary Details -->
              <div class="summary-row d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <strong>{{ formatPrice(cartStore.totalPrice) }} EGP</strong>
              </div>
              <div class="summary-row d-flex justify-content-between mb-2">
                <span>Shipping:</span>
                <span class="text-success">
                  <i class="fas fa-truck me-1"></i>
                  Free
                </span>
              </div>
              <div class="summary-row d-flex justify-content-between mb-2">
                <span>Tax (14%):</span>
                <strong>{{ formatPrice(taxAmount) }} EGP</strong>
              </div>
              <hr>
              <div class="total-row d-flex justify-content-between mb-3">
                <h5>Total:</h5>
                <h4 class="text-success">
                  <strong>{{ formatPrice(finalTotal) }} EGP</strong>
                </h4>
              </div>
              
              <!-- Checkout Button -->
              <div class="d-grid">
                <button class="btn btn-success btn-lg">
                  <i class="fas fa-credit-card me-2"></i>
                  Proceed to Checkout
                </button>
              </div>
              
              <!-- Payment Methods -->
              <div class="payment-methods mt-3 text-center">
                <small class="text-muted d-block mb-2">We Accept:</small>
                <div class="payment-icons">
                  <i class="fab fa-cc-visa text-primary me-2" style="font-size: 1.5rem;"></i>
                  <i class="fab fa-cc-mastercard text-warning me-2" style="font-size: 1.5rem;"></i>
                  <i class="fas fa-money-bill text-success" style="font-size: 1.5rem;"></i>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Promo Code -->
          <div class="card mt-3">
            <div class="card-body">
              <h6 class="card-title">
                <i class="fas fa-tag me-2"></i>
                Promo Code
              </h6>
              <div class="input-group">
                <input 
                  v-model="promoCode"
                  type="text" 
                  class="form-control" 
                  placeholder="Enter promo code"
                >
                <button 
                  @click="applyPromoCode"
                  class="btn btn-outline-primary"
                  :disabled="!promoCode.trim()"
                >
                  Apply
                </button>
              </div>
              <small class="text-muted">Try: SAVE10, WELCOME20</small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Toast -->
    <div 
      v-if="showToast"
      class="toast-container position-fixed bottom-0 end-0 p-3"
    >
      <div class="toast show" :class="`bg-${toastType} text-white`">
        <div class="toast-body">
          <i :class="toastIcon" class="me-2"></i>
          {{ toastMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { cartStore } from '../stores/cartStore.js'

export default {
  name: 'Cart',
  data() {
    return {
      cartStore,
      promoCode: '',
      showToast: false,
      toastMessage: '',
      toastType: 'success',
      toastIcon: 'fas fa-check-circle'
    }
  },
  computed: {
    taxAmount() {
      return cartStore.totalPrice * 0.14 // 14% tax
    },
    finalTotal() {
      return cartStore.totalPrice + this.taxAmount
    }
  },
  methods: {
    increaseQuantity(productId) {
      const item = cartStore.items.find(item => item.id === productId)
      if (item && item.quantity < 99) {
        cartStore.updateQuantity(productId, item.quantity + 1)
      }
    },
    
    decreaseQuantity(productId) {
      const item = cartStore.items.find(item => item.id === productId)
      if (item && item.quantity > 1) {
        cartStore.updateQuantity(productId, item.quantity - 1)
      }
    },
    
    updateQuantity(productId, quantity) {
      if (quantity > 0 && quantity <= 99) {
        cartStore.updateQuantity(productId, quantity)
      }
    },
    
    removeItem(productId) {
      const item = cartStore.items.find(item => item.id === productId)
      cartStore.removeItem(productId)
      this.showToastMessage(`"${this.truncateTitle(item.title)}" removed from cart`, 'warning', 'fas fa-trash')
    },
    
    clearCart() {
      if (confirm('Are you sure you want to clear your cart?')) {
        cartStore.clearCart()
        this.showToastMessage('Cart cleared successfully', 'info', 'fas fa-broom')
      }
    },
    
    applyPromoCode() {
      const validCodes = {
        'SAVE10': 10,
        'WELCOME20': 20,
        'NEWUSER': 15
      }
      
      if (validCodes[this.promoCode.toUpperCase()]) {
        this.showToastMessage(`Promo code applied! ${validCodes[this.promoCode.toUpperCase()]}% discount`, 'success', 'fas fa-tag')
        this.promoCode = ''
      } else {
        this.showToastMessage('Invalid promo code', 'danger', 'fas fa-times')
      }
    },
    
    truncateTitle(title) {
      return title.length > 40 ? title.substring(0, 40) + '...' : title
    },
    
    convertToEGP(usdPrice) {
      const exchangeRate = 31
      return usdPrice * exchangeRate
    },
    
    formatPrice(price) {
      return Math.round(price).toLocaleString()
    },
    
    showToastMessage(message, type = 'success', icon = 'fas fa-check-circle') {
      this.toastMessage = message
      this.toastType = type
      this.toastIcon = icon
      this.showToast = true
      setTimeout(() => {
        this.showToast = false
      }, 3000)
    }
  }
}
</script>

<style scoped>
.cart {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.cart-item-image {
  width: 60px;
  height: 60px;
  object-fit: contain;
  border-radius: 8px;
  background: #f8f9fa;
  padding: 0.25rem;
}

.table th {
  border-top: none;
  font-weight: 600;
}

.input-group-sm .form-control {
  font-size: 0.875rem;
}

.summary-row {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.total-row {
  font-size: 1.2rem;
  padding-top: 0.5rem;
  border-top: 2px solid #28a745;
}

.payment-icons i {
  transition: transform 0.2s ease;
}

.payment-icons i:hover {
  transform: scale(1.1);
}

.card {
  border: none;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.btn {
  transition: all 0.3s ease;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.sticky-top {
  top: 1rem;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .table-responsive {
    font-size: 0.875rem;
  }
  
  .cart-item-image {
    width: 40px;
    height: 40px;
  }
  
  .input-group {
    max-width: 100px;
  }
  
  .sticky-top {
    position: relative !important;
    top: 0 !important;
  }
}
</style>