const API = "https://raw.githubusercontent.com/lomsadze123/audiophile-ecommerce-website/refs/heads/master/public/data.json";

const params = new URLSearchParams(window.location.search);
const productSlug = params.get("slug") || "xx99-mark-one-headphones";

const imageMap = {
  "xx99-mark-two-headphones": {
    main: "assets/h2.png",
    gallery1: "assets/pic3.png",
    gallery2: "assets/pic2.png",
    gallery3: "assets/pic1.png"
  },

  "xx99-mark-one-headphones": {
    main: "assets/big-h1.png",
    gallery1: "assets/pic3.png",
    gallery2: "assets/pic2.png",
    gallery3: "assets/pic1.png"
  },

  "xx59-headphones": {
    main: "assets/h3.png",
    gallery1: "assets/pic3.png",
    gallery2: "assets/pic2.png",
    gallery3: "assets/pic1.png"
  },

  "zx9-speaker": {
    main: "assets/s1.png",
    gallery1: "assets/speaker-gallery-1.png",
    gallery2: "assets/speaker-gallery-2.png",
    gallery3: "assets/speaker-gallery-3.png"
  },

  "zx7-speaker": {
    main: "assets/weird-speaker.png",
    gallery1: "assets/speaker-gallery-1.png",
    gallery2: "assets/speaker-gallery-2.png",
    gallery3: "assets/speaker-gallery-3.png"
  },

  "yx1-earphones": {
    main: "assets/e1.png",
    gallery1: "assets/earphones-gallery-1.png",
    gallery2: "assets/earphones-gallery-2.png",
    gallery3: "assets/earphones-gallery-3.png"
  }
};

async function loadProduct() {
  const response = await fetch(API);
  const products = await response.json();
  const product = products.find(item => item.slug === productSlug);

  if (!product) {
    console.log("erori")
    return;
  }

  if(!imageMap[product.slug]) {
    console.log("erori")
    return;
  }


document.querySelector(".info h2").textContent = product.name.toUpperCase();
document.querySelector(".desc").textContent = product.description;
document.querySelector(".price").textContent = `$ ${product.price.toLocaleString()}`;

const featureParagraphs = product.features.split("\n\n");

document.querySelector(".features").innerHTML = `
  <h2>FEATURES</h2>
  ${featureParagraphs.map(paragraph => ` <p>${paragraph}</p>`).join("")}`;
document.querySelector(".in-box").innerHTML = `
  <h2>IN THE BOX</h2>
  ${product.includes.map(item => `
    <div class="box-item">
    <span>${item.quantity}x</span>
    <p>${item.item}</p>
    </div>`).join("")}`;

document.querySelector(".main-img").src = imageMap[product.slug].main;    
document.querySelector(".gallery-left img:nth-child(1)").src=imageMap[product.slug].gallery1;
document.querySelector(".gallery-left img:nth-child(2)").src=imageMap[product.slug].gallery2;  
document.querySelector(".big-pic").src=imageMap[product.slug].gallery3; 

  }

loadProduct();  