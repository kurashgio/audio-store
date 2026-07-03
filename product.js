const plus = document.querySelector(".plus");
const minus = document.querySelector(".minus");
const count = document.querySelector(".count");

const addToCart = document.querySelector(".add-to-cart");

const cartIcon = document.querySelector(".icon-cart");
const cartBox = document.querySelector(".cart-box");
const cartInside = document.querySelector(".cart-inside");

let quantity = 0;

let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

localStorage.removeItem("cartQuantity")

function saveCart() {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

function getProductFromPage() {
  const name = document.querySelector(".info h2").textContent;
  const priceText = document.querySelector(".price").textContent;
  const image = document.querySelector(".main-img").src;

  const price = Number(priceText.replace(/[^0-9]/g, ""));

  return {
    name: name,
    price: price,
    image: image
  };
}

function renderCart() {
  if (cartItems.length === 0) {
    cartInside.textContent = "Your cart is empty";
    return;
  }

  let total = 0;
  let totalQuantity = 0;

  cartItems.forEach(item => {
    total += item.price * item.quantity;
    totalQuantity += item.quantity;
  });

  cartInside.innerHTML = `
    <div class="cart-top">
      <h3>CART (${totalQuantity})</h3>
      <button class="remove-all">Remove all</button>
    </div>

    ${cartItems.map((item, index) => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="small-cart-img">

        <div class="cart-item-details">
          <p class="cart-item-title">${item.name}</p>
          <p class="cart-item-price">
            $${item.price.toLocaleString()} x ${item.quantity}
            <span class="cart-total">$${(item.price * item.quantity).toLocaleString()}</span>
          </p>
        </div>

        <img src="assets/icon-delete.svg" alt="delete" class="delete-icon" data-index="${index}">
      </div>
    `).join("")}

    <div class="cart-total-row">
      <span>TOTAL</span>
      <strong>$${total.toLocaleString()}</strong>
    </div>

    <a href="checkout.html" class="checkout-btn">Checkout</a>
  `;

  document.querySelector(".remove-all").addEventListener("click", () => {
    cartItems = [];
    saveCart();
    renderCart();
  });

  document.querySelectorAll(".delete-icon").forEach(deleteBtn => {
    deleteBtn.addEventListener("click", () => {
      const index = deleteBtn.dataset.index;
      cartItems.splice(index, 1);
      saveCart();
      renderCart();
    });
  });
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
  if(quantity === 0) {
    return;
  }

  const product = getProductFromPage();
  const existingItem = cartItems.find(item => item.name === product.name);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cartItems.push({
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity
    });
  }

  saveCart();
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