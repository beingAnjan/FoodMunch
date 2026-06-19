/* ============================================
   Food Munch - common.js
   Shared across ALL pages
============================================ */

// ── Cart State ────────────────────────────────────────────────────────────────

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ── Save / Load ───────────────────────────────────────────────────────────────

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// ── Cart Badge ────────────────────────────────────────────────────────────────

function updateCartCount() {
    const badge = document.getElementById("cartCount");
    if (!badge) return;
    let total = 0;
    cart.forEach(item => { total += item.quantity; });
    badge.innerHTML = total;
}

// ── Page Transitions ──────────────────────────────────────────────────────────

function goToMenu() {
    const overlay = document.getElementById("loadingOverlay");
    if (overlay) {
        overlay.classList.add("active");
        setTimeout(() => { window.location.href = "menu.html"; }, 700);
    } else {
        window.location.href = "menu.html";
    }
}

function goToCart() {
    const overlay = document.getElementById("loadingOverlay");
    if (overlay) {
        overlay.classList.add("active");
        setTimeout(() => { window.location.href = "cart.html"; }, 700);
    } else {
        window.location.href = "cart.html";
    }
}

function goToOrder() {
    const overlay = document.getElementById("loadingOverlay");
    if (overlay) {
        overlay.classList.add("active");
        setTimeout(() => { window.location.href = "order.html"; }, 700);
    } else {
        window.location.href = "order.html";
    }
}

function goBack() {
    const overlay = document.getElementById("loadingOverlay");
    if (overlay) { overlay.classList.add("active"); }
    setTimeout(() => { history.back(); }, 400);
}

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

    const icon = menuToggle.querySelector("i");

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        if (navLinks.classList.contains("active")) {
            icon.classList.replace("fa-bars", "fa-xmark");
        } else {
            icon.classList.replace("fa-xmark", "fa-bars");
        }

    });

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");
            icon.classList.replace("fa-xmark", "fa-bars");

        });

    });

}

// ── Overlay / Page Load ───────────────────────────────────────────────────────

window.addEventListener("load", function () {
    const overlay = document.getElementById("loadingOverlay");
    if (overlay) overlay.classList.remove("active");
    updateCartCount();
});

window.addEventListener("pageshow", function () {
    const overlay = document.getElementById("loadingOverlay");
    if (overlay) overlay.classList.remove("active");
});
