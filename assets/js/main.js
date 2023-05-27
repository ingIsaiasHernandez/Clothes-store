const btnTheme = document.getElementById( "theme-btn" )
const body = document.body
const cartBtnOpen = document.getElementById("cart-btn")
const cartBtnClose = document.getElementById("close-cart")
const cartContainer = document.getElementById("cart-container")
const menuBtnOpen = document.getElementById("menu-btn")
const menuBtnClose = document.getElementById("close-menu")
const menu = document.getElementById("menu")
const productsView = document.getElementById("products-view")
const cartCounter = document.getElementById("cart-counter")
const counter = document.getElementById("counter")
const total = document.getElementById("total")
const btnCheckout = document.getElementById("cart-chekout-btn")
const cartContent = document.getElementById("cart-content")


btnTheme.addEventListener( "click", () => darkThemeChange())
cartBtnOpen.addEventListener( "click", () => cartContainer.classList.remove("hide") )
cartBtnClose.addEventListener( "click", () => cartContainer.classList.add("hide")  )
menuBtnOpen.addEventListener("click", () => menu.classList.remove("hide"))
menuBtnClose.addEventListener("click", () => menu.classList.add("hide"))

const darkThemeChange = () => {
  if( btnTheme.classList.contains("bx-moon") ){
      btnTheme.classList.replace("bx-moon", "bx-sun")
  }else{
      btnTheme.classList.replace("bx-sun", "bx-moon")
  }    
  body.classList.toggle( "dark" )
}

const items = [
    {
      id: 1,
      name: 'Hoodies',
      price: 14,
      image: 'assets/images/featured1.png',
      category: 'hoodies',
      quantity: 10
    },
    {
      id: 2,
      name: 'Shirts',
      price: 24,
      image: 'assets/images/featured2.png',
      category: 'shirts',
      quantity: 15
    },
    {
      id: 3,
      name: 'Sweatshirts',
      price: 24,
      image: 'assets/images/featured3.png',
      category: 'sweatshirts',
      quantity: 20
    }
  ]



const cartProducts = [];

const nav = document.querySelector("nav")

window.addEventListener( "scroll", () =>{
    if(scrollY >= 50){
        nav.classList.add("scroll-bg")
    }else{
        nav.classList.remove("scroll-bg")
    }
})


function viewProducts( itemData ){
  const productContainer = document.createElement("div");
  productContainer.classList.add("product-container");
  const product = document.createElement("div")
  product.classList.add("product")
  const imgProduct = document.createElement("img");
  imgProduct.classList.add("img-p");
  imgProduct.src = itemData.image;
  productContainer.appendChild(imgProduct);
  const btnProduct = document.createElement("button");
  btnProduct.textContent = "+";
  btnProduct.classList.add("btn-p");
  btnProduct.setAttribute("onClick",`addProduct(${itemData.id})`)
  btnProduct.setAttribute("id",itemData.id)
  const productFooter = document.createElement("div");
  productFooter.classList.add("products-footer");
  const productFooterTitle = document.createElement("div");
  productFooterTitle.classList.add("products-footer-title","flex");
  const pTitle = document.createElement("p");
  pTitle.classList.add("products-footer-title-t");
  pTitle.textContent = `$${itemData.price}.00`;
  productFooterTitle.appendChild(pTitle);
  const pSubTitle = document.createElement("p");
  pSubTitle.classList.add("products-footer-title-s");
  pSubTitle.textContent = `| Stock: ${itemData.quantity}`;
  productFooterTitle.appendChild(pSubTitle);
  productFooter.appendChild(productFooterTitle);
  const productName = document.createElement("p");
  productName.classList.add("products-product-name");
  productName.textContent = itemData.name;
  productFooter.appendChild(productName);

  productContainer.appendChild(btnProduct)
  product.appendChild(productContainer);
  product.appendChild(productFooter);
  productsView.appendChild(product)
}


for( let item of items ){
  viewProducts( item );
}







let totalItems = 0;
let quantity1 = 0;
let quantity2 = 0;
let quantity3 = 0;
let totalPrice = 0;
let price1 = 0;
let price2 = 0;
let price3 = 0;
let subtotal = [0,0,0]
function addProduct( itemId ){
  let productSelected = cartProducts.find( product => product.id === itemId )
  if( productSelected ){
      let index = cartProducts.indexOf( productSelected )
      cartProducts[index].quantitySelected++
      if(itemId === 1){
        quantity1 += 1;
        subtotal[0] += items[index].price;
      }
      if(itemId === 2){
        quantity2 += 1;
        subtotal[1] += items[index].price;
      }
      if(itemId === 3){
        quantity3 += 1;
        subtotal[2] += items[index].price;
      }
  }else{
      const item = items.find( item => item.id === itemId )
      item.quantitySelected = 0
      cartProducts.push( item )
  }
  totalItems = quantity1 + quantity2 +quantity3;
  totalPrice = subtotal[0] + subtotal[1] + subtotal[2];
  showProducts()
}


function showProducts (){
  const content = document.getElementById( "cart-content" )
  let fragment = ""
  let quantity = 0;
  cartProducts.forEach( product => {
    if(product.id === 1){
      quantity = quantity1;
      index = 0;
    }
    if(product.id === 2){
      quantity = quantity2;
      index = 1;
    }
    if(product.id === 3){
      quantity = quantity3;
      index = [2]
    }
    fragment += `
    <section class="product-preview">
    <img src="${product.image}" alt="">
    <div>
      <h2>${product.name}</h2>
      <p>Stock: ${product.quantity} | <span class="red"> $${product.price} </span></p>
      <p class="red">Subtotal: $${subtotal[index]}</p>
      <p> <a onClick="deleteProduct(${product.id})">-</a>  ${quantity} Units   <a onClick="addProduct(${product.id})">+</a></p>
    </div>
    </section>
    `
  } )
  cartCounter.textContent = totalItems
  counter.textContent = totalItems
  total.textContent = `$ ${totalPrice}.00`
  content.innerHTML = fragment
}


function deleteProduct( itemId ){
  let productSelected = cartProducts.find( product => product.id === itemId )
  if( productSelected ){
      let index = cartProducts.indexOf( productSelected )
      totalPrice -= items[index].price;
      if (cartProducts[index].quantitySelected === 0){
        subtotal[items.id] = 0;
        window.alert('No quedan más de este articulo en tu carrito');
      } else{
        cartProducts[index].quantitySelected--
        if(itemId === 1){
          quantity1 -= 1;
          totalItems -= 1;
          subtotal[0] -= cartProducts[index].price;
        }
        if(itemId === 2){
          quantity2 -= 1;
          totalItems -= 1;
          subtotal[1] -= cartProducts[index].price;
        }
        if(itemId === 3){
          quantity3 -= 1;
          totalItems -= 1;
          subtotal[2] -= cartProducts[index].price;
        }
      }
  }else{
      const item = items.find( item => item.id === itemId )
      item.quantitySelected = 0
      cartProducts.slice( item[itemId], 1 )
  }
  showProducts()
}

document.getElementById("cart-chekout-btn").addEventListener('click', () =>{
  totalItems = 0;
  totalPrice = 0;
  cartProducts.splice(0,3)
  document.getElementById("total").textContent = "$ 0.00"
  document.getElementById("counter").textContent = "0";
  document.getElementById("cart-counter").textContent = "0";
  document.getElementById("cart-content").innerHTML = `<img src="./assets/images/empty-cart.png" alt="">
  <p><span class="titlecart">Your cart is empty</span> <br> Your cart is emptyYou can add items to your cart by clicking on the + button on the product page</p>`
})