document.addEventListener('DOMContentLoaded', function() {
    const products = [
        { id: 1, name: "Product 1", price: 10 },
        { id: 2, name: "Product 2", price: 20 },
        { id: 3, name: "Product 3", price: 30 },
        { id: 4, name: "Product 4", price: 40 },
        { id: 5, name: "Product 5", price: 50 },
    ];

    const productList = document.getElementById('product-list');
    const cartList = document.getElementById('cart-list');
    const clearCartBtn = document.getElementById('clear-cart-btn');

    // Load products
    function loadProducts() {
        products.forEach(product => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${product.name} - $${product.price}</span>
                <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
            `;
            productList.appendChild(li);
        });
    }

    // Add product to cart
    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            const li = document.createElement('li');
            li.textContent = `${product.name} - $${product.price}`;
            cartList.appendChild(li);
        }
    }

    // Clear cart
    function clearCart() {
        cartList.innerHTML = '';
        sessionStorage.removeItem('cart');
    }

    // Load cart from session storage
    function loadCart() {
        const cart = JSON.parse(sessionStorage.getItem('cart'));
        if (cart) {
            cart.forEach(productId => addToCart(productId));
        }
    }

    // Save cart to session storage
    function saveCart() {
        const cartItems = Array.from(cartList.children).map(item => parseInt(item.dataset.id));
        sessionStorage.setItem('cart', JSON.stringify(cartItems));
    }

    // Event listeners
    productList.addEventListener('click', function(event) {
        if (event.target.classList.contains('add-to-cart-btn')) {
            const productId = parseInt(event.target.getAttribute('data-id'));
            addToCart(productId);
            saveCart();
        }
    });

    clearCartBtn.addEventListener('click', function() {
        clearCart();
    });

    // Initialize
    loadProducts();
    loadCart();
});