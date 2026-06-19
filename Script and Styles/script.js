/* ============================================
   Food Munch - script.js
============================================ */



/* ============================================
   Open Youtube Video - index.html
============================================ */

function watchVideo(){

    window.open(
        "https://youtu.be/U-e0WgjkXpE?si=cJOK2NAfsYQMhjp6",
        "_blank"
    );

}


// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ==========================
   Add Item to Cart
========================== */

function updateCartCount(){

    const badge=document.getElementById("cartCount");

    if(!badge) return;

    let total=0;

    cart.forEach(item=>{

        total += item.quantity;

    });

    badge.innerHTML=total;

}

function addToCart(item) {

    const existingItem = cart.find(food => food.name === item.name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: item.name,
            price: item.price,
            quantity: 1
        });
    }

    saveCart();

    updateCartCount();

    showToast(item.name + " added to cart");

}

function removeItem(itemName){

    cart = cart.filter(item => item.name !== itemName);

    saveCart();

    renderCartPage();

    renderMiniCart();

}

function increaseQuantity(itemName){

    const item = cart.find(food => food.name === itemName);

    if(item){

        item.quantity++;

    }

    saveCart();

    renderCartPage();

    renderMiniCart();

}
function decreaseQuantity(itemName){

    const item = cart.find(food => food.name === itemName);

    if(item){

        item.quantity--;

        if(item.quantity<=0){

            cart = cart.filter(food=>food.name!==itemName);

        }

    }

    saveCart();

    renderCartPage();

    renderMiniCart();

}

function showToast(message){

    const toast=document.getElementById("toast");

    toast.innerHTML="✅ "+message;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },2000);

}

/* ==========================
   Save Cart
========================== */

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

/* ==========================
   Mini Cart (menu.html)
========================== */

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

        li.innerHTML = `
            <strong>${item.name}</strong>
            &nbsp; × ${item.quantity}
        `;

        list.appendChild(li);

    });

}

/* ==========================
   Go To Cart
========================== */

function goToCart() {

    const overlay = document.getElementById("loadingOverlay");

    if (overlay) {

        overlay.classList.add("active");

        setTimeout(() => {

            window.location.href = "cart.html";

        }, 700);

    } else {

        window.location.href = "cart.html";

    }

}

/* ==========================
   Render Cart Page
========================== */

function renderCartPage() {

    const cartContainer = document.getElementById("cartItems");
    const totalElement = document.getElementById("totalPrice");
    const totalBox = document.getElementById("totalBox");
    const cartButtons = document.getElementById("cartButtons");

    if (!cartContainer) return;

    cartContainer.innerHTML = "";

    // Empty Cart
    if (cart.length === 0) {

        cartContainer.innerHTML = `

            <div class="empty-cart">

                <i class="fa-solid fa-cart-shopping"
                   style="font-size:60px;color:#f4a614;margin-bottom:20px;"></i>

                <h2>Your Cart is Empty</h2>

                <p>Add some delicious food to continue shopping.</p>

            </div>

        `;

        if (totalBox) {
            totalBox.style.display = "none";
        }

        if (cartButtons) {
            cartButtons.style.display = "none";
        }

        return;
    }

    // Show Total & Buttons
    if (totalBox) {
        totalBox.style.display = "flex";
    }

    if (cartButtons) {
        cartButtons.style.display = "flex";
    }

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

                <div class="cart-price">

                    ₹${subtotal}

                </div>

            </div>

        `;

    });

    totalElement.innerHTML = "₹" + total;

}

/* ==========================
   Place Order
========================== */

function renderOrderSummary(){

    const container = document.getElementById("orderItems");
    const totalElement = document.getElementById("orderTotal");

    if(!container) return;

    container.innerHTML = "";

    let total = 0;

    cart.forEach(item=>{

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

function placeOrder() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }

    goToOrder();

}

/* ==========================
   Go To Order
========================== */

function goToOrder() {

    const overlay = document.getElementById("loadingOverlay");

    if (overlay) {

        overlay.classList.add("active");

        setTimeout(() => {

            window.location.href = "order.html";

        }, 700);

    } else {

        window.location.href = "order.html";

    }

}

/* ==========================
   Submit Order
========================== */

function showError(input,errorId,message){

    input.classList.add("input-error");

    document.getElementById(errorId).innerText=message;

}

function clearError(input,errorId){

    input.classList.remove("input-error");

    document.getElementById(errorId).innerText="";

}

function showSuccessModal(){

    document
        .getElementById("successModal")
        .style.display="flex";

}

function closeSuccessModal(){

    cart=[];

    saveCart();

    window.location.href="index.html";

}

function handleSubmit(event){

    event.preventDefault();

    const inputs=[

        document.getElementById("name"),
        document.getElementById("email"),
        document.getElementById("phone"),
        document.getElementById("payment"),
        document.getElementById("address")

    ];

    let valid=true;

    inputs.forEach(input=>{

        if(!validateField(input)){

            valid=false;

        }

    });

    if(!valid){

        return;

    }

    showSuccessModal();

}



/* ==========================
   Go Back
========================== */

function goBack() {

    const overlay = document.getElementById("loadingOverlay");

    if (overlay) {

        overlay.classList.add("active");

    }

    setTimeout(() => {

        history.back();

    }, 400);

}

/* ==========================
   Home → Menu
========================== */

function goToMenu() {

    const overlay = document.getElementById("loadingOverlay");

    if (overlay) {

        overlay.classList.add("active");

        setTimeout(() => {

            window.location.href = "menu.html";

        }, 700);

    } else {

        window.location.href = "menu.html";

    }

}

/* ==========================
   Page Load
========================== */

window.addEventListener("load", function () {

    const overlay = document.getElementById("loadingOverlay");

    if (overlay) {
        overlay.classList.remove("active");
    }

    updateCartCount();
    renderCartPage();
    renderOrderSummary();

});

window.addEventListener("pageshow", function () {

    const overlay = document.getElementById("loadingOverlay");

    if (overlay) {
        overlay.classList.remove("active");
    }

});

const emailPattern = /^[a-z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const phonePattern = /^[6-9]\d{9}$/;

function showError(input,errorId,message){

    input.classList.add("input-error");

    document.getElementById(errorId).textContent=message;

}

function clearError(input,errorId){

    input.classList.remove("input-error");

    document.getElementById(errorId).textContent="";

}

function validateField(input){

    switch(input.id){

        case "name":

            if(input.value.trim()===""){

                showError(input,"nameError","Full name is required.");

                return false;

            }

            if(input.value.trim().length<3){

                showError(input,"nameError","Minimum 3 characters.");

                return false;

            }

            break;

        case "email":

            if(input.value.trim()===""){

                showError(input,"emailError","Email is required.");

                return false;

            }

            if(!emailPattern.test(input.value.trim())){

                showError(input,"emailError","Enter a valid email.");

                return false;

            }

            break;

        case "phone":

            if(input.value.trim()===""){

                showError(input,"phoneError","Phone number is required.");

                return false;

            }

            if(!phonePattern.test(input.value.trim())){

                showError(input,"phoneError","Enter a valid mobile number.");

                return false;

            }

            break;

        case "payment":

            if(input.value===""){

                showError(input,"paymentError","Select a payment method.");

                return false;

            }

            break;

        case "address":

            if(input.value.trim()===""){

                showError(input,"addressError","Address is required.");

                return false;

            }

            break;

    }

    clearError(input,input.id+"Error");

    return true;

}

document.addEventListener("DOMContentLoaded",()=>{

    ["name","email","phone","payment","address"].forEach(id=>{

        const input=document.getElementById(id);

        if(!input) return;

        input.addEventListener("blur",()=>{

            validateField(input);

        });

        input.addEventListener("input",()=>{

            clearError(input,id+"Error");

        });

    });

});

