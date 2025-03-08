// Main JavaScript for Punam Stones Website

document.addEventListener('DOMContentLoaded', () => {
    // Initialize the cart
    let cart = JSON.parse(localStorage.getItem('punamStonesCart')) || [];
    let drafts = JSON.parse(localStorage.getItem('punamStonesDrafts')) || [];
    
    // Setup theme
    initTheme();
    
    // Update cart count
    updateCartCount();
    
    // Display products
    displayProducts();
    
    // Event Listeners
    setupEventListeners();
    
    // Initialize Theme
    function initTheme() {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('punamStonesTheme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
            updateThemeIcon(savedTheme);
        }
    }
    
    // Update theme icon based on current theme
    function updateThemeIcon(theme) {
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            if (theme === 'dark') {
                // Already handled in CSS with ::after pseudo-element
            } else {
                const moonIcon = document.createElement('i');
                moonIcon.className = 'fas fa-moon';
                themeToggle.innerHTML = '';
                themeToggle.appendChild(moonIcon);
            }
        }
    }
    
    // Toggle theme function
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Add animation class
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.classList.add('switching');
            setTimeout(() => {
                themeToggle.classList.remove('switching');
            }, 700);
        }
        
        // Apply theme with transition effect
        document.documentElement.setAttribute('data-theme', newTheme);
        
        // Save theme preference
        localStorage.setItem('punamStonesTheme', newTheme);
        
        // Update theme icon
        updateThemeIcon(newTheme);
        
        // Add page transition effect
        const main = document.querySelector('main');
        if (main) {
            main.style.opacity = '0';
            setTimeout(() => {
                main.style.opacity = '1';
                main.style.transition = 'opacity 0.5s ease';
            }, 50);
        }
    }
    
    // Function to update cart count
    function updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            cartCount.textContent = totalItems;
            
            // Save cart to local storage
            localStorage.setItem('punamStonesCart', JSON.stringify(cart));
        }
    }
    
    // Setup event listeners
    function setupEventListeners() {
        // Theme toggle
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
        }
        
        // Add to cart buttons
        document.addEventListener('click', (e) => {
            // Add to cart from product list
            if (e.target.classList.contains('add-to-cart') && !e.target.classList.contains('disabled')) {
                const productId = parseInt(e.target.dataset.id);
                addToCart(productId);
            }
            
            // Add to cart from product detail
            if (e.target.classList.contains('add-to-cart-detail') && !e.target.classList.contains('disabled')) {
                const productId = parseInt(e.target.dataset.id);
                addToCart(productId);
            }
            
            // View more button
            if (e.target.classList.contains('view-more')) {
                const stonesGrid = document.querySelector('.stones-grid');
                if (stonesGrid) {
                    // Show all products
                    displayProducts(products, '.stones-grid', products.length);
                    e.target.style.display = 'none';
                }
            }
            
            // Checkout button
            if (e.target.classList.contains('checkout-btn')) {
                if (cart.length === 0) {
                    alert('Your cart is empty! Add some stones to proceed.');
                } else {
                    checkout();
                }
            }
            
            // Save draft button
            if (e.target.classList.contains('save-draft-btn')) {
                if (cart.length === 0) {
                    alert('Your cart is empty! Add some stones to save as draft.');
                } else {
                    saveDraft();
                }
            }
            
            // Load draft button
            if (e.target.classList.contains('load-draft')) {
                const draftId = e.target.dataset.id;
                loadDraft(draftId);
            }
            
            // Delete draft button
            if (e.target.classList.contains('delete-draft')) {
                const draftId = e.target.dataset.id;
                deleteDraft(draftId);
            }
        });
        
        // Cart quantity buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('quantity-increase')) {
                const productId = parseInt(e.target.dataset.id);
                updateCartItemQuantity(productId, 1);
            }
            
            if (e.target.classList.contains('quantity-decrease')) {
                const productId = parseInt(e.target.dataset.id);
                updateCartItemQuantity(productId, -1);
            }
            
            if (e.target.classList.contains('cart-item-remove')) {
                const productId = parseInt(e.target.dataset.id);
                removeFromCart(productId);
            }
        });
        
        // Smooth scrolling for navigation links
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId.startsWith('#')) {
                    const targetSection = document.querySelector(targetId);
                    if (targetSection) {
                        // Close mobile menu if open
                        const hamburger = document.querySelector('.hamburger');
                        const navMenu = document.querySelector('.nav-links');
                        if (hamburger && hamburger.classList.contains('active')) {
                            hamburger.classList.remove('active');
                            navMenu.classList.remove('active');
                        }
                        
                        window.scrollTo({
                            top: targetSection.offsetTop - 80,
                            behavior: 'smooth'
                        });
                        
                        // Update active link
                        navLinks.forEach(link => link.classList.remove('active'));
                        this.classList.add('active');
                    }
                }
            });
        });
        
        // Update active nav link on scroll
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY + 100;
            
            document.querySelectorAll('section').forEach(section => {
                if (section.offsetTop <= scrollPosition && 
                    section.offsetTop + section.offsetHeight > scrollPosition) {
                    
                    const id = section.getAttribute('id');
                    if (id) {
                        document.querySelectorAll('nav a').forEach(link => {
                            link.classList.remove('active');
                            if (link.getAttribute('href') === `#${id}`) {
                                link.classList.add('active');
                            }
                        });
                    }
                }
            });
        });
        
        // Add more animations on scroll
        window.addEventListener('scroll', () => {
            // Add extra animation effects to elements as they come into view
            document.querySelectorAll('.stone-card').forEach((card, index) => {
                const cardPosition = card.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.2;
                
                if (cardPosition < screenPosition) {
                    // Add staggered animation with delay based on index
                    setTimeout(() => {
                        card.classList.add('animated', 'scale-in');
                        card.style.opacity = '1';
                    }, index * 100);
                }
            });
            
            // Add bounce effect to CTA buttons in view
            document.querySelectorAll('.cta-button, .add-to-cart').forEach(button => {
                const buttonPosition = button.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.1;
                
                if (buttonPosition < screenPosition) {
                    button.classList.add('pulse');
                }
            });
        });
    }
    
    // Function to add product to cart
    function addToCart(productId) {
        const product = getProductById(productId);
        
        if (!product || !product.inStock) return;
        
        // Check if the product is already in the cart
        const existingItemIndex = cart.findIndex(item => item.id === productId);
        
        if (existingItemIndex > -1) {
            // Increase quantity
            cart[existingItemIndex].quantity += 1;
        } else {
            // Add new item
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
        
        // Update cart count
        updateCartCount();
        
        // Update cart display
        updateCartDisplay();
        
        // Show feedback
        showNotification(`Added ${product.name} to cart!`);
    }
    
    // Function to update cart item quantity
    function updateCartItemQuantity(productId, change) {
        const itemIndex = cart.findIndex(item => item.id === productId);
        
        if (itemIndex > -1) {
            cart[itemIndex].quantity += change;
            
            // Remove item if quantity is 0 or less
            if (cart[itemIndex].quantity <= 0) {
                cart.splice(itemIndex, 1);
            }
            
            // Update cart
            updateCartCount();
            updateCartDisplay();
        }
    }
    
    // Function to remove item from cart
    function removeFromCart(productId) {
        const itemIndex = cart.findIndex(item => item.id === productId);
        
        if (itemIndex > -1) {
            const removedItem = cart[itemIndex];
            cart.splice(itemIndex, 1);
            
            // Update cart
            updateCartCount();
            updateCartDisplay();
            
            // Show feedback
            showNotification(`Removed ${removedItem.name} from cart!`);
        }
    }
    
    // Function to update cart display
    function updateCartDisplay() {
        const cartItems = document.querySelector('.cart-items');
        const subtotalAmount = document.querySelector('.subtotal-amount');
        const emptyCartMessage = document.querySelector('.empty-cart-message');
        
        if (cartItems && subtotalAmount) {
            if (cart.length === 0) {
                // Show empty cart message
                cartItems.innerHTML = '';
                if (emptyCartMessage) {
                    emptyCartMessage.style.display = 'block';
                }
                subtotalAmount.textContent = '$0.00';
            } else {
                // Hide empty cart message
                if (emptyCartMessage) {
                    emptyCartMessage.style.display = 'none';
                }
                
                // Clear cart items
                cartItems.innerHTML = '';
                
                // Calculate subtotal
                let subtotal = 0;
                
                // Add each item to cart
                cart.forEach(item => {
                    const itemTotal = item.price * item.quantity;
                    subtotal += itemTotal;
                    
                    const cartItemElement = document.createElement('div');
                    cartItemElement.className = 'cart-item';
                    cartItemElement.innerHTML = `
                        <div class="cart-item-image">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="cart-item-info">
                            <h3 class="cart-item-title">${item.name}</h3>
                            <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                            <div class="cart-item-quantity">
                                <button class="quantity-btn quantity-decrease" data-id="${item.id}">-</button>
                                <span class="quantity-value">${item.quantity}</span>
                                <button class="quantity-btn quantity-increase" data-id="${item.id}">+</button>
                            </div>
                        </div>
                        <button class="cart-item-remove" data-id="${item.id}">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    `;
                    
                    cartItems.appendChild(cartItemElement);
                });
                
                // Update subtotal
                subtotalAmount.textContent = `$${subtotal.toFixed(2)}`;
            }
        }
    }
    
    // Function to checkout
    function checkout() {
        // In a real application, this would redirect to a payment gateway
        alert('Proceeding to checkout! In a real application, you would be redirected to a payment gateway.');
        
        // Clear cart after checkout
        cart = [];
        updateCartCount();
        updateCartDisplay();
        
        // Close cart modal
        const cartModal = document.querySelector('.cart-modal');
        if (cartModal) {
            cartModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // Function to save cart as draft
    function saveDraft() {
        if (cart.length === 0) return;
        
        const now = new Date();
        const draftId = `draft_${now.getTime()}`;
        const draftDate = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
        
        const draft = {
            id: draftId,
            date: draftDate,
            items: [...cart]
        };
        
        // Add to drafts
        drafts.push(draft);
        
        // Save to localStorage
        localStorage.setItem('punamStonesDrafts', JSON.stringify(drafts));
        
        // Show drafts
        updateDraftsDisplay();
        
        // Show feedback
        showNotification('Your cart has been saved as a draft!');
        
        // Show draft modal
        const draftModal = document.querySelector('.draft-modal');
        const cartModal = document.querySelector('.cart-modal');
        
        if (draftModal && cartModal) {
            cartModal.classList.remove('active');
            draftModal.classList.add('active');
        }
    }
    
    // Function to update drafts display
    function updateDraftsDisplay() {
        const draftsList = document.querySelector('.drafts-list');
        const emptyDraftsMessage = document.querySelector('.empty-drafts-message');
        
        if (draftsList) {
            if (drafts.length === 0) {
                draftsList.innerHTML = '';
                if (emptyDraftsMessage) {
                    emptyDraftsMessage.style.display = 'block';
                }
            } else {
                if (emptyDraftsMessage) {
                    emptyDraftsMessage.style.display = 'none';
                }
                
                draftsList.innerHTML = '';
                
                drafts.forEach(draft => {
                    const totalItems = draft.items.reduce((sum, item) => sum + item.quantity, 0);
                    
                    const draftElement = document.createElement('div');
                    draftElement.className = 'draft-item';
                    draftElement.innerHTML = `
                        <div class="draft-info">
                            <h3 class="draft-title">Draft (${totalItems} items)</h3>
                            <p class="draft-date">${draft.date}</p>
                        </div>
                        <div class="draft-actions">
                            <button class="load-draft" data-id="${draft.id}">Load</button>
                            <button class="delete-draft" data-id="${draft.id}">Delete</button>
                        </div>
                    `;
                    
                    draftsList.appendChild(draftElement);
                });
            }
        }
    }
    
    // Function to load draft
    function loadDraft(draftId) {
        const draft = drafts.find(draft => draft.id === draftId);
        
        if (draft) {
            // Confirm before replacing current cart
            if (cart.length > 0) {
                const confirmed = confirm('Loading this draft will replace your current cart. Continue?');
                if (!confirmed) return;
            }
            
            // Replace cart with draft items
            cart = [...draft.items];
            
            // Update cart
            updateCartCount();
            updateCartDisplay();
            
            // Show feedback
            showNotification('Draft loaded successfully!');
            
            // Show cart modal
            const draftModal = document.querySelector('.draft-modal');
            const cartModal = document.querySelector('.cart-modal');
            
            if (draftModal && cartModal) {
                draftModal.classList.remove('active');
                cartModal.classList.add('active');
            }
        }
    }
    
    // Function to delete draft
    function deleteDraft(draftId) {
        const draftIndex = drafts.findIndex(draft => draft.id === draftId);
        
        if (draftIndex > -1) {
            drafts.splice(draftIndex, 1);
            
            // Save to localStorage
            localStorage.setItem('punamStonesDrafts', JSON.stringify(drafts));
            
            // Update drafts display
            updateDraftsDisplay();
            
            // Show feedback
            showNotification('Draft deleted!');
        }
    }
    
    // Function to show notification
    function showNotification(message) {
        // Check if there's already a notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = message;
        
        // Add to document
        document.body.appendChild(notification);
        
        // Show with animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // Add notification styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: var(--primary-color);
            color: white;
            padding: 12px 20px;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow);
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.3s, transform 0.3s;
            z-index: 1000;
        }
        
        .notification.show {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Additional styles for enhanced animations */
        .ripple-circle {
            position: absolute;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.4);
            width: 100px;
            height: 100px;
            margin-top: -50px;
            margin-left: -50px;
            animation: rippleEffect 1s linear;
            opacity: 0;
        }
        
        @keyframes rippleEffect {
            0% {
                transform: scale(0);
                opacity: 0.5;
            }
            100% {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Apply initial animations
    setTimeout(() => {
        document.querySelectorAll('.section-title').forEach(title => {
            title.classList.add('text-focus');
        });
        
        document.querySelectorAll('.stone-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.classList.add('scale-in');
        });
        
        // Add typewriter effect to hero heading
        const heroHeading = document.querySelector('.hero-content h1');
        if (heroHeading) {
            heroHeading.classList.add('typewriter');
        }
    }, 2500); // After loader animation
}); 