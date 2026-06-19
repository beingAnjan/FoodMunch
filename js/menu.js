/* ============================================
   Food Munch - menu.js
   Only for: menu.html
   Requires: common.js
============================================ */

// ── Add to Cart ───────────────────────────────────────────────────────────────

function addToCart(item) {
    const existingItem = cart.find(food => food.name === item.name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name: item.name, price: item.price, quantity: 1 });
    }
    saveCart();
    updateCartCount();
    showToast(item.name + " added to cart");
}

// ── Toast Notification ────────────────────────────────────────────────────────

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.innerHTML = "✅ " + message;
    toast.classList.add("show");
    setTimeout(() => { toast.classList.remove("show"); }, 2000);
}

// ── Mini Cart Sidebar ─────────────────────────────────────────────────────────

function renderMiniCart() {
    const list = document.getElementById("cartList");
    if (!list) return;
    list.innerHTML = "";
    if (cart.length === 0) {
        list.innerHTML = "<li>Your cart is empty.</li>";
        return;
    }
    cart.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${item.name}</strong> &nbsp; × ${item.quantity}`;
        list.appendChild(li);
    });
}

// ── Page Load ─────────────────────────────────────────────────────────────────

window.addEventListener("load", function () {
    renderMiniCart();
});
