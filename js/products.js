// Product Data for Punam Stones Website

const products = [
    {
        id: 1,
        name: "Amethyst Crystal Cluster",
        price: 129.99,
        category: "Crystal",
        tag: "Featured",
        image: "images/amethyst.jpg",
        description: "Beautiful natural amethyst crystal cluster with deep purple color. Perfect as a decorative piece or for crystal healing practices.",
        inStock: true,
        specs: [
            "Origin: Brazil",
            "Size: 4-5 inches",
            "Weight: Approximately 1.2 lbs",
            "Color: Deep Purple",
            "100% Natural & Untreated"
        ]
    },
    {
        id: 2,
        name: "Polished River Stones Set",
        price: 49.99,
        category: "Decorative",
        tag: "Best Seller",
        image: "images/river-stones.jpg",
        description: "A set of 12 polished river stones in varying sizes. Ideal for garden pathways, indoor decoration, or zen gardens.",
        inStock: true,
        specs: [
            "Quantity: 12 stones",
            "Size Range: 2-3 inches",
            "Polished Finish",
            "Assorted Colors",
            "Smooth Texture"
        ]
    },
    {
        id: 3,
        name: "White Marble Countertop",
        price: 899.99,
        category: "Construction",
        tag: "Premium",
        image: "images/marble-countertop.jpg",
        description: "Elegant white marble countertop with subtle gray veining. Each piece is unique with its own natural pattern.",
        inStock: false,
        specs: [
            "Dimensions: Custom Cut",
            "Thickness: 3 cm",
            "Finish: Polished",
            "Edge: Straight (other options available)",
            "Heat Resistant"
        ]
    },
    {
        id: 4,
        name: "Rose Quartz Healing Stone",
        price: 39.99,
        category: "Crystal",
        tag: "New Arrival",
        image: "images/rose-quartz.jpg",
        description: "Pink rose quartz known for its properties of love and healing. Hand-polished to a smooth finish.",
        inStock: true,
        specs: [
            "Origin: Madagascar",
            "Size: 2.5 inches",
            "Weight: Approximately 0.5 lbs",
            "Polished Finish",
            "Natural Pink Color"
        ]
    },
    {
        id: 5,
        name: "Black Granite Tile Set",
        price: 299.99,
        category: "Construction",
        tag: "Popular",
        image: "images/granite-tiles.jpg",
        description: "Premium black granite tiles for flooring or wall applications. Elegant and durable with a timeless appeal.",
        inStock: true,
        specs: [
            "Set of 10 tiles",
            "Dimensions: 12\" x 12\"",
            "Thickness: 1 cm",
            "Finish: Polished",
            "Stain Resistant"
        ]
    },
    {
        id: 6,
        name: "Natural Agate Slice",
        price: 79.99,
        category: "Decorative",
        tag: "Limited",
        image: "images/agate-slice.jpg",
        description: "Stunning natural agate slice with vibrant colors. Each piece is unique and makes a beautiful decorative item or coaster.",
        inStock: true,
        specs: [
            "Size: 3-4 inches",
            "Thickness: 5-7 mm",
            "Polished Edges",
            "Natural Variations",
            "Includes Display Stand"
        ]
    },
    {
        id: 7,
        name: "Landscaping Rocks Mix",
        price: 59.99,
        category: "Landscaping",
        tag: "Bulk",
        image: "images/landscaping-rocks.jpg",
        description: "Mixed landscaping rocks for garden beds, driveways, or decorative purposes. Various sizes and colors included.",
        inStock: true,
        specs: [
            "Weight: 25 lbs bag",
            "Size Range: 1-3 inches",
            "Mixed Natural Colors",
            "Weatherproof",
            "Drainage Friendly"
        ]
    },
    {
        id: 8,
        name: "Labradorite Palm Stone",
        price: 24.99,
        category: "Crystal",
        tag: "Bestseller",
        image: "images/labradorite.jpg",
        description: "Smooth labradorite palm stone with stunning blue-green flashes. Perfect for meditation or as a worry stone.",
        inStock: true,
        specs: [
            "Origin: Madagascar",
            "Size: 2 inches",
            "Polished Finish",
            "Iridescent Flash",
            "Flat on one side"
        ]
    }
];

// Function to display products on the page
function displayProducts(productArray = products, container = '.stones-grid', limit = 6) {
    const productsContainer = document.querySelector(container);
    
    if (!productsContainer) return;
    
    productsContainer.innerHTML = '';
    
    const displayLimit = Math.min(limit, productArray.length);
    
    for (let i = 0; i < displayLimit; i++) {
        const product = productArray[i];
        
        const productCard = document.createElement('div');
        productCard.className = 'stone-card fade-in-up';
        productCard.dataset.id = product.id;
        
        const stockStatus = product.inStock ? '' : '<span class="out-of-stock">Out of Stock</span>';
        
        productCard.innerHTML = `
            <div class="stone-img">
                <img src="${product.image}" alt="${product.name}">
                <span class="stone-tag">${product.tag}</span>
            </div>
            <div class="stone-info">
                <h3 class="stone-name">${product.name}</h3>
                <p class="stone-price">$${product.price.toFixed(2)}</p>
                <p class="stone-description">${product.description.substring(0, 100)}...</p>
                <div class="stone-actions">
                    <button class="add-to-cart ${!product.inStock ? 'disabled' : ''}" data-id="${product.id}" ${!product.inStock ? 'disabled' : ''}>
                        ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                    <button class="view-details" data-id="${product.id}">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
        `;
        
        productsContainer.appendChild(productCard);
    }
}

// Function to get product by ID
function getProductById(id) {
    return products.find(product => product.id === parseInt(id));
}

// Function to search products
function searchProducts(query) {
    query = query.toLowerCase().trim();
    
    if (!query) return products;
    
    return products.filter(product => {
        return (
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)
        );
    });
}

// Function to filter products by category
function filterByCategory(category) {
    if (category === 'all') return products;
    
    return products.filter(product => product.category === category);
}

// Function to sort products
function sortProducts(productsArray, sortBy) {
    const sortedProducts = [...productsArray];
    
    switch (sortBy) {
        case 'price-low':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name-a-z':
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-z-a':
            sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
        default:
            // No sorting (default order)
            break;
    }
    
    return sortedProducts;
} 