import { reactive } from 'vue'

// Simple reactive store for cart management
export const cartStore = reactive({
  items: [],
  
  // Load cart from localStorage on initialization
  init() {
    const savedCart = localStorage.getItem('techstore-cart')
    if (savedCart) {
      this.items = JSON.parse(savedCart)
    }
  },
  
  // Save cart to localStorage
  saveToStorage() {
    localStorage.setItem('techstore-cart', JSON.stringify(this.items))
  },
  
  // Add item to cart
  addItem(product) {
    const existingItem = this.items.find(item => item.id === product.id)
    
    // Convert USD to EGP
    const priceInEGP = product.price * 31 // Exchange rate
    
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      this.items.push({
        id: product.id,
        title: product.title,
        price: priceInEGP, // Store price in EGP
        originalPrice: product.price, // Keep original USD price
        image: product.image,
        quantity: 1
      })
    }
    
    this.saveToStorage()
  },
  
  // Remove item from cart
  removeItem(productId) {
    const index = this.items.findIndex(item => item.id === productId)
    if (index > -1) {
      this.items.splice(index, 1)
      this.saveToStorage()
    }
  },
  
  // Update item quantity
  updateQuantity(productId, quantity) {
    const item = this.items.find(item => item.id === productId)
    if (item) {
      if (quantity <= 0) {
        this.removeItem(productId)
      } else {
        item.quantity = quantity
        this.saveToStorage()
      }
    }
  },
  
  // Clear entire cart
  clearCart() {
    this.items = []
    this.saveToStorage()
  },
  
  // Computed getters
  get totalItems() {
    return this.items.reduce((total, item) => total + item.quantity, 0)
  },
  
  get totalPrice() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0)
  }
})

// Initialize cart on module load
cartStore.init()