/* ============================================
   Food Munch - order.js
   Only for: order.html
   Requires: common.js
============================================ */

// ── Validation Patterns ───────────────────────────────────────────────────────

const emailPattern = /^[a-z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phonePattern = /^[6-9]\d{9}$/;

// ── Error Helpers ─────────────────────────────────────────────────────────────

function showError(input, errorId, message) {
    input.classList.add("input-error");
    document.getElementById(errorId).textContent = message;
}

function clearError(input, errorId) {
    input.classList.remove("input-error");
    document.getElementById(errorId).textContent = "";
}

// ── Field Validation ──────────────────────────────────────────────────────────

function validateField(input) {
    switch (input.id) {
        case "name":
            if (input.value.trim() === "") {
                showError(input, "nameError", "Full name is required.");
                return false;
            }
            if (input.value.trim().length < 3) {
                showError(input, "nameError", "Minimum 3 characters.");
                return false;
            }
            break;
        case "email":
            if (input.value.trim() === "") {
                showError(input, "emailError", "Email is required.");
                return false;
            }
            if (!emailPattern.test(input.value.trim())) {
                showError(input, "emailError", "Enter a valid email.");
                return false;
            }
            break;
        case "phone":
            if (input.value.trim() === "") {
                showError(input, "phoneError", "Phone number is required.");
                return false;
            }
            if (!phonePattern.test(input.value.trim())) {
                showError(input, "phoneError", "Enter a valid mobile number.");
                return false;
            }
            break;
        case "payment":
            if (input.value === "") {
                showError(input, "paymentError", "Select a payment method.");
                return false;
            }
            break;
        case "address":
            if (input.value.trim() === "") {
                showError(input, "addressError", "Address is required.");
                return false;
            }
            break;
    }
    clearError(input, input.id + "Error");
    return true;
}

// ── Order Summary ─────────────────────────────────────────────────────────────

function renderOrderSummary() {
    const container    = document.getElementById("orderItems");
    const totalElement = document.getElementById("orderTotal");
    if (!container) return;

    container.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        container.innerHTML += `
            <div class="order-item">
                <span>${item.name} × ${item.quantity}</span>
                <strong>₹${subtotal}</strong>
            </div>
        `;
    });

    totalElement.innerHTML = "₹" + total;
}

// ── Success Modal ─────────────────────────────────────────────────────────────

function showSuccessModal() {
    document.getElementById("successModal").style.display = "flex";
}

function closeSuccessModal() {
    cart = [];
    saveCart();
    window.location.href = "index.html";
}

// ── Form Submit ───────────────────────────────────────────────────────────────

function handleSubmit(event) {
    event.preventDefault();
    const inputs = [
        document.getElementById("name"),
        document.getElementById("email"),
        document.getElementById("phone"),
        document.getElementById("payment"),
        document.getElementById("address")
    ];
    let valid = true;
    inputs.forEach(input => {
        if (!validateField(input)) { valid = false; }
    });
    if (!valid) return;
    showSuccessModal();
}

// ── Live Validation on Blur / Input ──────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
    ["name", "email", "phone", "payment", "address"].forEach(id => {
        const input = document.getElementById(id);
        if (!input) return;
        input.addEventListener("blur",  () => { validateField(input); });
        input.addEventListener("input", () => { clearError(input, id + "Error"); });
    });
});

// ── Page Load ─────────────────────────────────────────────────────────────────

window.addEventListener("load", function () {
    renderOrderSummary();
});
