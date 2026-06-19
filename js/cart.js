/* ============================================
   Food Munch - cart.js
   Only for: cart.html
   Requires: common.js
============================================ */

// ── Quantity Controls ─────────────────────────────────────────────────────────

function increaseQuantity(itemName) {
    const item = cart.find(food => food.name === itemName);
    if (item) { item.quantity++; }
    saveCart();
    renderCartPage();
}

function decreaseQuantity(itemName) {
    const item = cart.find(food => food.name === itemName);
    if (item) {
        item.quantity--;
        if (item.quantity <= 0) {
            cart = cart.filter(food => food.name !== itemName);
        }
    }
    saveCart();
    renderCartPage();
}

function removeItem(itemName) {
    cart = cart.filter(item => item.name !== itemName);
    saveCart();
    renderCartPage();
}

// ── Render Cart Page ──────────────────────────────────────────────────────────

function renderCartPage() {
    const cartContainer = document.getElementById("cartItems");
    const totalElement  = document.getElementById("totalPrice");
    const totalBox      = document.getElementById("totalBox");
    const cartButtons   = document.getElementById("cartButtons");

    if (!cartContainer) return;

    cartContainer.innerHTML = "";

    // Empty state
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fa-solid fa-cart-shopping"
                   style="font-size:60px;color:#f4a614;margin-bottom:20px;"></i>
                <h2>Your Cart is Empty</h2>
                <p>Add some delicious food to continue shopping.</p>
            </div>
        `;
        if (totalBox)    totalBox.style.display    = "none";
        if (cartButtons) cartButtons.style.display = "none";
        return;
    }

    if (totalBox)    totalBox.style.display    = "flex";
    if (cartButtons) cartButtons.style.display = "flex";

    let total = 0;

    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        cartContainer.innerHTML += `
            <div class="cart-item">
                <div class="item-info">
                    <h3>${item.name}</h3>
                    <p>₹${item.price} each</p>
                </div>
                <div class="item-actions">
                    <div class="quantity-box">
                        <button onclick="decreaseQuantity('${item.name}')">
                            <i class="fa-solid fa-minus"></i>
                        </button>
                        <span>${item.quantity}</span>
                        <button onclick="increaseQuantity('${item.name}')">
                            <i class="fa-solid fa-plus"></i>
                        </button>
                    </div>
                </div>
                <div class="cart-price">₹${subtotal}</div>
            </div>
        `;
    });

    totalElement.innerHTML = "₹" + total;
}

// ── Place Order ───────────────────────────────────────────────────────────────

function placeOrder() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    goToOrder();
}

// ── Page Load ─────────────────────────────────────────────────────────────────

window.addEventListener("load", function () {
    renderCartPage();
});
