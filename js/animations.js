// Animations JavaScript for Punam Stones Website

document.addEventListener('DOMContentLoaded', () => {
    // Page loader animation
    const loaderContainer = document.querySelector('.loader-container');
    
    if (loaderContainer) {
        setTimeout(() => {
            loaderContainer.style.opacity = '0';
            setTimeout(() => {
                loaderContainer.style.display = 'none';
                
                // Animate hero elements
                document.querySelectorAll('.animate-text, .animate-image').forEach(el => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                });
            }, 500);
        }, 2000);
    }
    
    // Scroll animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    };
    
    // Initial check for elements
    setTimeout(() => {
        animateOnScroll();
    }, 500);
    
    // Listen for scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Button ripple effect
    const buttons = document.querySelectorAll('.cta-button, .add-to-cart, .checkout-btn, .view-more, .about-cta');
    
    buttons.forEach(button => {
        button.classList.add('button-ripple');
        
        button.addEventListener('click', function(e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const circle = document.createElement('span');
            circle.classList.add('ripple-circle');
            circle.style.top = y + 'px';
            circle.style.left = x + 'px';
            
            this.appendChild(circle);
            
            setTimeout(() => {
                circle.remove();
            }, 500);
        });
    });
    
    // Add floating animation to some elements
    const floatElements = document.querySelectorAll('.hero-image img, .stone-tag');
    floatElements.forEach(element => {
        element.classList.add('float');
    });
    
    // Header scroll animation
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile menu animation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Animate nav links individually
            const navItems = navLinks.querySelectorAll('li');
            navItems.forEach((item, index) => {
                if (navLinks.classList.contains('active')) {
                    // Stagger the animation
                    item.style.animation = `fadeInRight 0.5s ease forwards ${index * 0.1 + 0.2}s`;
                    item.style.opacity = '0';
                } else {
                    item.style.animation = '';
                }
            });
        });
    }
    
    // Cart animation
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartIcon = document.querySelector('.cart-icon');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.classList.contains('disabled')) return;
            
            // Animate the button
            button.classList.add('cart-animation');
            setTimeout(() => {
                button.classList.remove('cart-animation');
            }, 500);
            
            // Animate cart icon
            if (cartIcon) {
                cartIcon.classList.add('cart-animation');
                setTimeout(() => {
                    cartIcon.classList.remove('cart-animation');
                }, 500);
            }
        });
    });
    
    // Modal animations
    const cartModalTrigger = document.querySelector('.cart-icon');
    const cartModal = document.querySelector('.cart-modal');
    const cartClose = document.querySelector('.close-cart');
    const productModal = document.querySelector('.product-modal');
    const productClose = document.querySelector('.close-product');
    const viewDetailsButtons = document.querySelectorAll('.view-details');
    const draftModal = document.querySelector('.draft-modal');
    const draftClose = document.querySelector('.close-draft');
    const saveDraftBtn = document.querySelector('.save-draft-btn');
    
    // Cart modal
    if (cartModalTrigger && cartModal && cartClose) {
        cartModalTrigger.addEventListener('click', () => {
            cartModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        cartClose.addEventListener('click', () => {
            cartModal.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        cartModal.addEventListener('click', (e) => {
            if (e.target === cartModal) {
                cartModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Product modal
    if (productModal && productClose && viewDetailsButtons.length) {
        viewDetailsButtons.forEach(button => {
            button.addEventListener('click', () => {
                const productId = button.getAttribute('data-id');
                const product = getProductById(productId);
                
                if (product && productModal.querySelector('.product-details')) {
                    productModal.querySelector('.product-details').innerHTML = `
                        <div class="product-detail-image">
                            <img src="${product.image}" alt="${product.name}">
                        </div>
                        <div class="product-detail-info">
                            <h2 class="product-detail-title">${product.name}</h2>
                            <p class="product-detail-price">$${product.price.toFixed(2)}</p>
                            <p class="product-detail-description">${product.description}</p>
                            <div class="product-detail-specs">
                                <h3>Specifications</h3>
                                <ul class="specs-list">
                                    ${product.specs.map(spec => `<li>${spec}</li>`).join('')}
                                </ul>
                            </div>
                            <div class="product-detail-actions">
                                <button class="add-to-cart-detail ${!product.inStock ? 'disabled' : ''}" data-id="${product.id}" ${!product.inStock ? 'disabled' : ''}>
                                    ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
                                </button>
                            </div>
                        </div>
                    `;
                    
                    productModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                    
                    // Add event listener to the new Add to Cart button
                    const addToCartDetail = productModal.querySelector('.add-to-cart-detail');
                    if (addToCartDetail && !addToCartDetail.classList.contains('disabled')) {
                        addToCartDetail.addEventListener('click', () => {
                            addToCartDetail.classList.add('cart-animation');
                            if (cartIcon) {
                                cartIcon.classList.add('cart-animation');
                                setTimeout(() => {
                                    cartIcon.classList.remove('cart-animation');
                                }, 500);
                            }
                            
                            setTimeout(() => {
                                addToCartDetail.classList.remove('cart-animation');
                            }, 500);
                        });
                    }
                }
            });
        });
        
        productClose.addEventListener('click', () => {
            productModal.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        productModal.addEventListener('click', (e) => {
            if (e.target === productModal) {
                productModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Draft modal
    if (draftModal && draftClose && saveDraftBtn) {
        saveDraftBtn.addEventListener('click', () => {
            draftModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        draftClose.addEventListener('click', () => {
            draftModal.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        draftModal.addEventListener('click', (e) => {
            if (e.target === draftModal) {
                draftModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Add sparkle effect to stone names
    const stoneNames = document.querySelectorAll('.stone-name');
    stoneNames.forEach(name => {
        name.classList.add('sparkle');
    });
    
    // Testimonial hover effect
    const testimonials = document.querySelectorAll('.testimonial');
    testimonials.forEach(testimonial => {
        testimonial.addEventListener('mouseenter', () => {
            testimonial.classList.add('float');
        });
        
        testimonial.addEventListener('mouseleave', () => {
            testimonial.classList.remove('float');
        });
    });
    
    // Section transitions
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('page-transition');
    });
    
    // Add wobble effect to cart icons
    if (cartIcon) {
        cartIcon.classList.add('wobble');
    }
});

// Escape key closes all modals
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.cart-modal, .product-modal, .draft-modal');
        modals.forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    }
}); 