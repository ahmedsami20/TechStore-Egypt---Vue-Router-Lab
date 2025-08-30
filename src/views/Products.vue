<template>
  <div class="products">
    <!-- Page Header -->
    <div class="row mb-4">
      <div class="col-12">
        <h1 class="display-5 fw-bold text-center mb-4">
          <i class="fas fa-box text-primary me-3"></i>
          Our Products
        </h1>
        <p class="lead text-center text-muted">
          Discover amazing tech products from our curated collection
        </p>
      </div>
    </div>

    <!-- Search and Filters -->
    <div class="row mb-4">
      <!-- Search Bar -->
      <div class="col-lg-4 mb-3">
        <div class="card h-100">
          <div class="card-body">
            <h6 class="card-title mb-3">
              <i class="fas fa-search me-2"></i>Search Products
            </h6>
            <div class="input-group">
              <span class="input-group-text">
                <i class="fas fa-search"></i>
              </span>
              <input 
                v-model="searchQuery"
                type="text" 
                class="form-control" 
                placeholder="Search products..."
              >
              <button 
                @click="clearSearch"
                class="btn btn-outline-secondary"
                :disabled="!searchQuery"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Category Filter -->
      <div class="col-lg-4 mb-3">
        <div class="card h-100">
          <div class="card-body">
            <h6 class="card-title mb-3">
              <i class="fas fa-tags me-2"></i>Category
            </h6>
            <select v-model="selectedCategory" class="form-select">
              <option value="">All Categories</option>
              <option v-for="category in availableCategories" :key="category" :value="category">
                {{ formatCategoryName(category) }}
              </option>
            </select>
            <small class="text-muted mt-2 d-block">
              {{ getCategoryCount(selectedCategory) }} products
            </small>
          </div>
        </div>
      </div>

      <!-- Sort Options -->
      <div class="col-lg-4 mb-3">
        <div class="card h-100">
          <div class="card-body">
            <h6 class="card-title mb-3">
              <i class="fas fa-sort me-2"></i>Sort By
            </h6>
            <select v-model="sortBy" class="form-select">
              <option value="">Default</option>
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              <option value="price-asc">Price (Low to High)</option>
              <option value="price-desc">Price (High to Low)</option>
              <option value="rating-desc">Highest Rated</option>
              <option value="popularity">Most Popular</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Results Summary -->
    <div class="row mb-4">
      <div class="col-12">
        <div class="d-flex justify-content-between align-items-center p-3 bg-light rounded">
          <div>
            <strong>{{ filteredProducts.length }}</strong> of <strong>{{ products.length }}</strong> products
            <span v-if="selectedCategory" class="badge bg-primary ms-2">
              {{ formatCategoryName(selectedCategory) }}
            </span>
            <span v-if="searchQuery" class="badge bg-success ms-2">
              "{{ searchQuery }}"
            </span>
          </div>
          <button 
            v-if="selectedCategory || searchQuery || sortBy" 
            @click="clearAllFilters"
            class="btn btn-outline-secondary btn-sm"
          >
            <i class="fas fa-times me-1"></i>Clear Filters
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="row">
      <div class="col-12 text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-3 text-muted">Loading amazing products...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="row">
      <div class="col-12">
        <div class="alert alert-danger text-center">
          <i class="fas fa-exclamation-triangle me-2"></i>
          {{ error }}
          <br>
          <button @click="fetchProducts" class="btn btn-outline-danger mt-2">
            <i class="fas fa-redo me-2"></i>Try Again
          </button>
        </div>
      </div>
    </div>

    <!-- No Products Found -->
    <div v-else-if="filteredProducts.length === 0 && searchQuery" class="row">
      <div class="col-12">
        <div class="alert alert-warning text-center">
          <i class="fas fa-search me-2"></i>
          No products found for "<strong>{{ searchQuery }}</strong>"
          <br>
          <button @click="clearSearch" class="btn btn-outline-warning mt-2">
            <i class="fas fa-times me-2"></i>Clear Search
          </button>
        </div>
      </div>
    </div>

    <!-- Products Grid -->
    <div v-else class="row">
      <div 
        v-for="product in filteredProducts" 
        :key="product.id"
        class="col-lg-3 col-md-4 col-sm-6 mb-4"
      >
        <div class="card h-100 product-card">
          <!-- Product Image -->
          <div class="card-img-container">
            <img 
              :src="product.image" 
              :alt="product.title"
              class="card-img-top"
              loading="lazy"
            >
            <!-- Category Badge -->
            <span class="badge bg-primary position-absolute top-0 start-0 m-2">
              {{ product.category }}
            </span>
          </div>
          
          <div class="card-body d-flex flex-column">
            <!-- Product Title -->
            <h5 class="card-title">{{ truncateTitle(product.title) }}</h5>
            
            <!-- Product Rating -->
            <div class="mb-2" v-if="product.rating">
              <div class="d-flex align-items-center">
                <div class="stars me-2">
                  <span 
                    v-for="star in 5" 
                    :key="star"
                    class="star"
                    :class="{ active: star <= Math.round(product.rating.rate) }"
                  >
                    <i class="fas fa-star"></i>
                  </span>
                </div>
                <small class="text-muted">({{ product.rating.count }} reviews)</small>
              </div>
            </div>
            
            <!-- Product Description -->
            <p class="card-text text-muted flex-grow-1">
              {{ truncateDescription(product.description) }}
            </p>
            
            <!-- Price -->
            <div class="price-section mb-3">
              <h4 class="text-success fw-bold mb-0">
                {{ formatPrice(convertToEGP(product.price)) }} EGP
              </h4>
              <small class="text-muted">≈ ${{ product.price.toFixed(2) }} USD</small>
            </div>
            
            <!-- Add to Cart Button -->
            <button 
              @click="addToCart(product)"
              class="btn btn-primary w-100"
              :disabled="isInCart(product.id)"
            >
              <i class="fas fa-cart-plus me-2"></i>
              {{ isInCart(product.id) ? 'In Cart' : 'Add to Cart' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <div 
      v-if="showToast"
      class="toast-container position-fixed bottom-0 end-0 p-3"
    >
      <div class="toast show bg-success text-white">
        <div class="toast-body">
          <i class="fas fa-check-circle me-2"></i>
          {{ toastMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { cartStore } from '../stores/cartStore.js'

export default {
  name: 'Products',
  data() {
    return {
      products: [],
      loading: true,
      error: null,
      searchQuery: '',
      selectedCategory: '',
      sortBy: '',
      showToast: false,
      toastMessage: '',
      cartStore
    }
  },
  computed: {
    availableCategories() {
      return [...new Set(this.products.map(product => product.category))]
    },
    
    filteredProducts() {
      let filtered = [...this.products]
      
      // Search filter
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(product => 
          product.title.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
        )
      }
      
      // Category filter
      if (this.selectedCategory) {
        filtered = filtered.filter(product => product.category === this.selectedCategory)
      }
      
      // Sort products
      if (this.sortBy) {
        filtered.sort((a, b) => {
          switch (this.sortBy) {
            case 'name-asc':
              return a.title.localeCompare(b.title)
            case 'name-desc':
              return b.title.localeCompare(a.title)
            case 'price-asc':
              return a.price - b.price
            case 'price-desc':
              return b.price - a.price
            case 'rating-desc':
              return (b.rating?.rate || 0) - (a.rating?.rate || 0)
            case 'popularity':
              return (b.rating?.count || 0) - (a.rating?.count || 0)
            default:
              return 0
          }
        })
      }
      
      return filtered
    }
  },
  watch: {
    // Watcher for search functionality
    searchQuery(newQuery, oldQuery) {
      console.log(`Search changed from "${oldQuery}" to "${newQuery}"`)
    },
    
    // Watcher for category changes
    selectedCategory(newCategory, oldCategory) {
      console.log(`Category changed from "${oldCategory}" to "${newCategory}"`)
    },
    
    // Watcher for sort changes
    sortBy(newSort, oldSort) {
      console.log(`Sort changed from "${oldSort}" to "${newSort}"`)
    }
  },
  methods: {
    async fetchProducts() {
      this.loading = true
      this.error = null
      
      try {
        const response = await fetch('https://fakestoreapi.com/products')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        this.products = await response.json()
      } catch (err) {
        this.error = 'Failed to load products. Please check your internet connection and try again.'
        console.error('Error fetching products:', err)
      } finally {
        this.loading = false
      }
    },
    
    addToCart(product) {
      cartStore.addItem(product)
      this.showToastMessage(`"${this.truncateTitle(product.title)}" added to cart!`)
    },
    
    isInCart(productId) {
      return cartStore.items.some(item => item.id === productId)
    },
    
    clearSearch() {
      this.searchQuery = ''
    },
    
    clearAllFilters() {
      this.searchQuery = ''
      this.selectedCategory = ''
      this.sortBy = ''
    },
    
    formatCategoryName(category) {
      return category.split(' ').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ')
    },
    
    getCategoryCount(category) {
      if (!category) {
        return this.products.length
      }
      return this.products.filter(p => p.category === category).length
    },
    
    truncateTitle(title) {
      return title.length > 50 ? title.substring(0, 50) + '...' : title
    },
    
    truncateDescription(description) {
      return description.length > 100 ? description.substring(0, 100) + '...' : description
    },
    
    convertToEGP(usdPrice) {
      const exchangeRate = 31 // Approximate USD to EGP exchange rate
      return usdPrice * exchangeRate
    },
    
    formatPrice(price) {
      return Math.round(price).toLocaleString()
    },
    
    showToastMessage(message) {
      this.toastMessage = message
      this.showToast = true
      setTimeout(() => {
        this.showToast = false
      }, 3000)
    }
  },
  
  mounted() {
    this.fetchProducts()
  }
}
</script>

<style scoped>
.products {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.product-card {
  transition: all 0.3s ease;
  border: none;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.card-img-container {
  position: relative;
  height: 250px;
  overflow: hidden;
}

.card-img-top {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 1rem;
  background: #f8f9fa;
  transition: transform 0.3s ease;
}

.product-card:hover .card-img-top {
  transform: scale(1.05);
}

.stars .star {
  color: #ddd;
  font-size: 0.9rem;
}

.stars .star.active {
  color: #ffc107;
}

.price-section {
  border-top: 1px solid #eee;
  padding-top: 0.5rem;
}

.btn:disabled {
  background-color: #28a745;
  border-color: #28a745;
  opacity: 0.8;
}

.toast-container .toast {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

/* Loading animation */
.spinner-border {
  width: 3rem;
  height: 3rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .card-img-container {
    height: 200px;
  }
  
  .display-5 {
    font-size: 2rem;
  }
}
</style>