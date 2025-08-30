<template>
  <div class="contact">
    <!-- Page Header -->
    <div class="row mb-5">
      <div class="col-12 text-center">
        <h1 class="display-4 fw-bold mb-4">
          <i class="fas fa-envelope text-primary me-3"></i>
          Contact Us
        </h1>
        <p class="lead text-muted">
          Have a question or need support? We'd love to hear from you!
        </p>
      </div>
    </div>

    <div class="row">
      <!-- Contact Form -->
      <div class="col-lg-8 mb-5">
        <div class="card">
          <div class="card-header bg-primary text-white">
            <h4 class="mb-0">
              <i class="fas fa-paper-plane me-2"></i>
              Send us a Message
            </h4>
          </div>
          <div class="card-body">
            <!-- Success Message -->
            <div v-if="showSuccess" class="alert alert-success alert-dismissible fade show">
              <i class="fas fa-check-circle me-2"></i>
              <strong>Thank you for contacting us!</strong> 
              We have received your message and will get back to you within 24 hours.
              <button 
                type="button" 
                class="btn-close" 
                @click="showSuccess = false"
              ></button>
            </div>

            <!-- Contact Form -->
            <form @submit.prevent="submitForm" novalidate>
              <!-- Name Field -->
              <div class="mb-3">
                <label for="name" class="form-label">
                  Full Name <span class="text-danger">*</span>
                </label>
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="fas fa-user"></i>
                  </span>
                  <input 
                    v-model="form.name"
                    type="text" 
                    class="form-control"
                    :class="{ 'is-invalid': errors.name, 'is-valid': form.name && !errors.name }"
                    id="name"
                    placeholder="Enter your full name"
                    @blur="validateField('name')"
                    @input="clearError('name')"
                  >
                </div>
                <div v-if="errors.name" class="invalid-feedback d-block">
                  {{ errors.name }}
                </div>
              </div>

              <!-- Email Field -->
              <div class="mb-3">
                <label for="email" class="form-label">
                  Email Address <span class="text-danger">*</span>
                </label>
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="fas fa-envelope"></i>
                  </span>
                  <input 
                    v-model="form.email"
                    type="email" 
                    class="form-control"
                    :class="{ 'is-invalid': errors.email, 'is-valid': form.email && !errors.email }"
                    id="email"
                    placeholder="Enter your email address"
                    @blur="validateField('email')"
                    @input="clearError('email')"
                  >
                </div>
                <div v-if="errors.email" class="invalid-feedback d-block">
                  {{ errors.email }}
                </div>
              </div>

              <!-- Phone Field (Optional) -->
              <div class="mb-3">
                <label for="phone" class="form-label">
                  Phone Number <span class="text-muted">(Optional)</span>
                </label>
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="fas fa-phone"></i>
                  </span>
                  <input 
                    v-model="form.phone"
                    type="tel" 
                    class="form-control"
                    id="phone"
                    placeholder="Enter your phone number"
                  >
                </div>
              </div>

              <!-- Subject Field -->
              <div class="mb-3">
                <label for="subject" class="form-label">
                  Subject <span class="text-danger">*</span>
                </label>
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="fas fa-tag"></i>
                  </span>
                  <select 
                    v-model="form.subject"
                    class="form-select"
                    :class="{ 'is-invalid': errors.subject, 'is-valid': form.subject && !errors.subject }"
                    id="subject"
                    @change="clearError('subject')"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="order">Order Status</option>
                    <option value="return">Returns & Refunds</option>
                    <option value="partnership">Business Partnership</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>
                <div v-if="errors.subject" class="invalid-feedback d-block">
                  {{ errors.subject }}
                </div>
              </div>

              <!-- Message Field -->
              <div class="mb-4">
                <label for="message" class="form-label">
                  Message <span class="text-danger">*</span>
                </label>
                <textarea 
                  v-model="form.message"
                  class="form-control"
                  :class="{ 'is-invalid': errors.message, 'is-valid': form.message && !errors.message }"
                  id="message"
                  rows="6"
                  placeholder="Tell us how we can help you..."
                  @blur="validateField('message')"
                  @input="clearError('message')"
                ></textarea>
                <div v-if="errors.message" class="invalid-feedback d-block">
                  {{ errors.message }}
                </div>
                <div class="form-text">
                  {{ form.message.length }}/500 characters
                </div>
              </div>

              <!-- Newsletter Subscription -->
              <div class="mb-4">
                <div class="form-check">
                  <input 
                    v-model="form.newsletter"
                    class="form-check-input" 
                    type="checkbox" 
                    id="newsletter"
                  >
                  <label class="form-check-label" for="newsletter">
                    Subscribe to our newsletter for latest updates and exclusive offers
                  </label>
                </div>
              </div>

              <!-- Submit Button -->
              <div class="d-grid">
                <button 
                  type="submit" 
                  class="btn btn-primary btn-lg"
                  :disabled="isSubmitting"
                >
                  <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2"></span>
                  <i v-else class="fas fa-paper-plane me-2"></i>
                  {{ isSubmitting ? 'Sending...' : 'Send Message' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Contact Information -->
      <div class="col-lg-4">
        <!-- Contact Details -->
        <div class="card mb-4">
          <div class="card-header bg-success text-white">
            <h5 class="mb-0">
              <i class="fas fa-map-marker-alt me-2"></i>
              Get in Touch
            </h5>
          </div>
          <div class="card-body">
            <div class="contact-item mb-3">
              <div class="d-flex align-items-start">
                <i class="fas fa-map-marker-alt text-primary me-3 mt-1"></i>
                <div>
                  <h6>Address</h6>
                  <p class="text-muted mb-0">
                    123 Tech Street, Nasr City<br>
                    Cairo, Egypt 11371
                  </p>
                </div>
              </div>
            </div>

            <div class="contact-item mb-3">
              <div class="d-flex align-items-start">
                <i class="fas fa-phone text-success me-3 mt-1"></i>
                <div>
                  <h6>Phone</h6>
                  <p class="text-muted mb-0">
                    <a href="tel:+201234567890" class="text-decoration-none">
                      +20 123 456 7890
                    </a><br>
                    <small>Mon - Fri: 9:00 AM - 6:00 PM</small>
                  </p>
                </div>
              </div>
            </div>

            <div class="contact-item mb-3">
              <div class="d-flex align-items-start">
                <i class="fas fa-envelope text-info me-3 mt-1"></i>
                <div>
                  <h6>Email</h6>
                  <p class="text-muted mb-0">
                    <a href="mailto:info@techstore-egypt.com" class="text-decoration-none">
                      info@techstore-egypt.com
                    </a><br>
                    <a href="mailto:support@techstore-egypt.com" class="text-decoration-none">
                      support@techstore-egypt.com
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div class="contact-item">
              <div class="d-flex align-items-start">
                <i class="fas fa-clock text-warning me-3 mt-1"></i>
                <div>
                  <h6>Business Hours</h6>
                  <p class="text-muted mb-0">
                    <strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM<br>
                    <strong>Saturday:</strong> 10:00 AM - 4:00 PM<br>
                    <strong>Sunday:</strong> Closed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- FAQ Section -->
        <div class="card mb-4">
          <div class="card-header bg-info text-white">
            <h5 class="mb-0">
              <i class="fas fa-question-circle me-2"></i>
              Quick Help
            </h5>
          </div>
          <div class="card-body">
            <div class="faq-item mb-3">
              <h6>Order Status</h6>
              <p class="text-muted small">
                Track your order using the tracking number sent to your email.
              </p>
            </div>
            <div class="faq-item mb-3">
              <h6>Returns & Refunds</h6>
              <p class="text-muted small">
                We accept returns within 30 days of purchase with original packaging.
              </p>
            </div>
            <div class="faq-item">
              <h6>Technical Support</h6>
              <p class="text-muted small">
                Our tech team is available to help with product setup and troubleshooting.
              </p>
            </div>
          </div>
        </div>

        <!-- Social Media -->
        <div class="card">
          <div class="card-header bg-dark text-white">
            <h5 class="mb-0">
              <i class="fas fa-share-alt me-2"></i>
              Follow Us
            </h5>
          </div>
          <div class="card-body text-center">
            <div class="social-links">
              <a href="#" class="btn btn-outline-primary btn-social me-2 mb-2">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="#" class="btn btn-outline-info btn-social me-2 mb-2">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#" class="btn btn-outline-danger btn-social me-2 mb-2">
                <i class="fab fa-instagram"></i>
              </a>
              <a href="#" class="btn btn-outline-success btn-social mb-2">
                <i class="fab fa-whatsapp"></i>
              </a>
            </div>
            <p class="text-muted small mt-3">
              Stay connected for updates, deals, and tech tips!
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contact',
  data() {
    return {
      form: {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        newsletter: false
      },
      errors: {},
      showSuccess: false,
      isSubmitting: false
    }
  },
  methods: {
    validateField(field) {
      // Clear previous error
      this.clearError(field)
      
      switch (field) {
        case 'name':
          if (!this.form.name.trim()) {
            this.errors.name = 'Name is required'
          } else if (this.form.name.trim().length < 2) {
            this.errors.name = 'Name must be at least 2 characters'
          }
          break
          
        case 'email':
          if (!this.form.email.trim()) {
            this.errors.email = 'Email is required'
          } else if (!this.isValidEmail(this.form.email)) {
            this.errors.email = 'Please enter a valid email address'
          }
          break
          
        case 'subject':
          if (!this.form.subject) {
            this.errors.subject = 'Please select a subject'
          }
          break
          
        case 'message':
          if (!this.form.message.trim()) {
            this.errors.message = 'Message is required'
          } else if (this.form.message.trim().length < 10) {
            this.errors.message = 'Message must be at least 10 characters'
          } else if (this.form.message.length > 500) {
            this.errors.message = 'Message cannot exceed 500 characters'
          }
          break
      }
    },
    
    validateForm() {
      // Validate all required fields
      this.validateField('name')
      this.validateField('email')
      this.validateField('subject')
      this.validateField('message')
      
      // Return true if no errors
      return Object.keys(this.errors).length === 0
    },
    
    clearError(field) {
      if (this.errors[field]) {
        delete this.errors[field]
      }
    },
    
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    },
    
    async submitForm() {
      // Prevent double submission
      if (this.isSubmitting) return
      
      // Validate form
      if (!this.validateForm()) {
        // Show first error field
        const firstErrorField = Object.keys(this.errors)[0]
        const element = document.getElementById(firstErrorField)
        if (element) {
          element.focus()
          element.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
        return
      }
      
      // Simulate form submission
      this.isSubmitting = true
      
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // Show success message
        this.showSuccess = true
        
        // Reset form
        this.resetForm()
        
        // Scroll to success message
        setTimeout(() => {
          document.querySelector('.alert-success').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          })
        }, 100)
        
      } catch (error) {
        alert('There was an error sending your message. Please try again.')
      } finally {
        this.isSubmitting = false
      }
    },
    
    resetForm() {
      this.form = {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        newsletter: false
      }
      this.errors = {}
    }
  }
}
</script>

<style scoped>
.contact {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.card {
  border: none;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.input-group-text {
  background-color: #f8f9fa;
  border-right: none;
}

.form-control:focus,
.form-select:focus {
  border-left: none;
  box-shadow: none;
}

.input-group .form-control,
.input-group .form-select {
  border-left: none;
}

.contact-item {
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.contact-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.contact-item h6 {
  color: #333;
  margin-bottom: 0.25rem;
}

.btn-social {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.btn-social:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.social-links .btn-outline-primary:hover {
  background-color: #3b5998;
  border-color: #3b5998;
}

.social-links .btn-outline-info:hover {
  background-color: #1da1f2;
  border-color: #1da1f2;
}

.social-links .btn-outline-danger:hover {
  background-color: #e4405f;
  border-color: #e4405f;
}

.social-links .btn-outline-success:hover {
  background-color: #25d366;
  border-color: #25d366;
}

.faq-item {
  border-bottom: 1px solid #eee;
  padding-bottom: 0.75rem;
}

.faq-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.faq-item h6 {
  color: #333;
  font-size: 0.95rem;
}

.spinner-border-sm {
  width: 1rem;
  height: 1rem;
}

/* Form validation styling */
.is-valid {
  border-color: #28a745;
}

.is-invalid {
  border-color: #dc3545;
}

.invalid-feedback {
  font-size: 0.875rem;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .display-4 {
    font-size: 2.5rem;
  }
  
  .btn-social {
    width: 40px;
    height: 40px;
    margin: 0.25rem;
  }
  
  .contact-item .d-flex {
    flex-direction: column;
    text-align: center;
  }
  
  .contact-item i {
    margin-bottom: 0.5rem;
    margin-right: 0 !important;
  }
}
</style>