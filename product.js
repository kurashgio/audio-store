const plus = document.querySelector(".plus");
const minus = document.querySelector(".minus");
const count = document.querySelector(".count");

const addToCart = document.querySelector(".add-to-cart");

const cartIcon = document.querySelector(".icon-cart");
const cartBox = document.querySelector(".cart-box");
const cartInside = document.querySelector(".cart-inside");

let quantity = 0;
let cart = Number(localStorage.getItem("cartQuantity")) || 0;

function renderCart() {
  if (cart === 0) {
    cartInside.textContent = "Your cart is empty";
  } else {
    let totalPrice = 1750 * cart;

    cartInside.innerHTML = `
      <div class="cart-item">
        <img src="assets/h1.png" alt="img" class="small-cart-img">

        <div class="cart-item-details">   
          <p class="cart-item-title">XX99 MARK I HEADPHONES</p>
          <p class="cart-item-price">
            $1,750 x ${cart} <span class="cart-total">$${totalPrice}</span>
          </p>
        </div>

        <img src="assets/icon-delete.svg" alt="delete" class="delete-icon">
      </div>

      <button class="checkout-btn">Checkout</button>
    `;

    const cartDelete = document.querySelector(".delete-icon");

    cartDelete.addEventListener("click", () => {
      cart = 0;
      localStorage.removeItem("cartQuantity");
      renderCart();
    });
  }
}

renderCart();

plus.addEventListener("click", () => {
  quantity++;
  count.textContent = quantity;
});

minus.addEventListener("click", () => {
  if (quantity > 0) {
    quantity--;
    count.textContent = quantity;
  }
});

addToCart.addEventListener("click", () => {
  cart += quantity;

  localStorage.setItem("cartQuantity", cart);

  renderCart();

  quantity = 0;
  count.textContent = quantity;
});

cartIcon.addEventListener("click", () => {
  if (cartBox.style.display === "block") {
    cartBox.style.display = "none";
  } else {
    cartBox.style.display = "block";
  }
});

/* mobile menu */

const iconMenu = document.querySelector(".icon-menu");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileClose = document.querySelector(".mobile-close");
const overlay = document.querySelector(".overlay");

iconMenu.addEventListener("click", () => {
  mobileMenu.style.display = "flex";
  overlay.style.display = "block";
});

mobileClose.addEventListener("click", () => {
  mobileMenu.style.display = "none";
  overlay.style.display = "none";
});

overlay.addEventListener("click", () => {
  mobileMenu.style.display = "none";
  overlay.style.display = "none";
});