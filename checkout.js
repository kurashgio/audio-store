const summaryItems = document.querySelector(".summary-items");
const summaryTotal = document.querySelector(".summary-total");
const summaryVat = document.querySelector(".vat");
const summaryGrand = document.querySelector(".summary-grand");
const payBtn = document.querySelector(".pay");

const orderOverlay = document.querySelector(".order-overlay");
const orderMainProduct = document.querySelector(".order-main-product");
const otherItemsText = document.querySelector(".other-items-text");
const GrandTotal = document.querySelector(".grand-total");
const backHomeBtn = document.querySelector(".back-home-btn");

const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

function totalSummary() {
  if (cartItems.length === 0) {
    summaryItems.innerHTML = "<p>Your cart is empty</p>";
    summaryTotal.textContent = "$0";
    summaryVat.textContent = "$0";
    summaryGrand.textContent = "$0";
    return;
  }

  let total = 0;

  summaryItems.innerHTML = cartItems.map(item => {
    total += item.price * item.quantity;

    return `
      <div class="summary-item">
        <img src="${item.image}" alt="${item.name}">
        <div>
          <h4>${item.name}</h4>
          <p>$ ${item.price.toLocaleString()}</p>
        </div>
        <span>x${item.quantity}</span>
      </div>
    `;
  }).join("");

  const shipping = 50;
  const vat = Math.round(total * 0.2);
  const grandTotal = total + shipping;

  summaryTotal.textContent = `$${total.toLocaleString()}`;
  summaryVat.textContent = `$${vat.toLocaleString()}`;
  summaryGrand.textContent = `$${grandTotal.toLocaleString()}`;
}

function showError(input, message) {
  const formGroup = input.parentElement;
  const small = formGroup.querySelector("small");

  formGroup.classList.add("error");
  small.textContent = message;
}

function clearError(input) {
  const formGroup = input.parentElement;
  const small = formGroup.querySelector("small");

  formGroup.classList.remove("error");
  small.textContent = "";
}

/* orderr */

function showOrder() {
  if (cartItems.length === 0) {
    return;
  }

  const firstItem = cartItems[0];

  let total = 0;

  cartItems.forEach(item => {
    total += item.price * item.quantity;
  });

  const shipping = 50;
  const grandTotal = total + shipping;
  orderMainProduct.innerHTML = `
    <img src="${firstItem.image}" alt="${firstItem.name}">

    <div>
      <h4>${firstItem.name}</h4>
      <p>$ ${firstItem.price.toLocaleString()}</p>
    </div>

    <span>x${firstItem.quantity}</span>
  `;

  const otherItemsCount = cartItems.length - 1;

  if (otherItemsCount > 0) {
    otherItemsText.textContent = `and ${otherItemsCount} other item(s)`;
  } else {
    otherItemsText.textContent = "";
  }

  GrandTotal.textContent = `$ ${grandTotal.toLocaleString()}`;
  orderOverlay.style.display = "flex";
}

/** */

function checkForm() {
  const inputs = document.querySelectorAll(".checkout-form input[type='text'], .checkout-form input[type='email']");
  let isValid = true;

  inputs.forEach(input => {
    if (input.value.trim() === "") {
      showError(input, "Required");
      isValid = false;
    } else {
      clearError(input);
    }
  });

  const email = document.querySelector("#email");

  if (email.value.trim() !== "" && !email.value.includes("@")) {
    showError(email, "Wrong email");
    isValid = false;
  }

  if (isValid) {
    showOrder();
  }
}

totalSummary();

payBtn.addEventListener("click", checkForm);

backHomeBtn.addEventListener("click", () => {
  localStorage.removeItem("cartItems");
});

