function Book(title, url, price, quantity) {
    this.title = title;
    this.imgURL = url;
    this.price = price;
    this.quantity = quantity;
}



let cartContent = loadCart();
console.log(cartContent);




const html = document.querySelector("html");
const cartTgl = document.querySelector(".cart-icon")
const myCartOvr = document.querySelector("#my-cart-overlay")
const myCart = document.querySelector("#my-cart")
const burger = document.querySelector(".toggler");
const menu = document.querySelector("#nav-menu");
const addToBskt = document.querySelectorAll(".price-buy button");
const contentOvr = document.querySelector(".content-overlay");

let isNavOpen = false;
let isCartOpen = false;

// myCart.innerHTML += tt;
// myCart.innerHTML += tt;
// myCart.innerHTML += tt;
// myCart.innerHTML += tt;


/*---------------------------------
-----------EVENT LISTENERS---------
---------------------------------*/

//make sure nav fade in works correctly after resizing
window.addEventListener('resize', function () {
    if (window.innerWidth > 950) {
        menu.className = "";
        isNavOpen = false;
        if (isCartOpen) {
            contentOvr.style.display = "block";
        }
    }
    else if (!isNavOpen) {
        menu.className = "close"
        isNavOpen = false;
    }
})

burger.addEventListener("click", function () {
    console.log(isNavOpen)
    //if its open close it
    if (isNavOpen) {
        html.style.overflow = "initial"
        menu.classList.add("close")
        menu.classList.remove("open")
        isNavOpen = !isNavOpen
    }
    //if its close open it
    else {
        html.style.overflow = "hidden"
        menu.classList.add("open")
        menu.classList.remove("close")
        isNavOpen = !isNavOpen
        //if cart is open close it
        if (isCartOpen) {
            contentOvr.style.display = "none";
            myCartOvr.classList.toggle("open")
            isCartOpen = !isCartOpen;
        }
    }
})



cartTgl.addEventListener("click", function () {
    console.log(isCartOpen)
    //if its close open it
    if (!isCartOpen) {
        generateMyCart();
        myCartOvr.classList.toggle("open")
        html.style.overflow = "hidden"
        contentOvr.style.display = "block";
        isCartOpen = !isCartOpen;
        //if nav is open close it
        if (isNavOpen) {
            contentOvr.style.display = "none";
            menu.classList.add("close")
            menu.classList.remove("open")
            isNavOpen = !isNavOpen
        }
    }
    else {
        myCartOvr.classList.toggle("open")
        html.style.overflow = "initial"
        contentOvr.style.display = "none";
        isCartOpen = !isCartOpen;
    }
})

//add to basket function
addToBskt.forEach((button) => {
    button.addEventListener("click", function () {
        console.log(this.value);
        cartContent[this.value - 1].quantity++;
        //update the save
        localStorage.setItem("cartContent", JSON.stringify(cartContent))
    })
})



/*---------------------------------
-----------OTHER FUNCTIONS---------
---------------------------------*/



function loadCart() {
    let cartContentTemp = [];
    //if theres no cart content in memory initialise it
    if (localStorage.getItem("cartContent") == null) {
        let newBook = new Book("A Game Of Thrones", "images/got.jpg", '11.70', 0);
        cartContentTemp.push(newBook);
        newBook = new Book("Dune", "images/dune.jpg", '9.80', 0);
        cartContentTemp.push(newBook);
        newBook = new Book("The Hobbit, or There and Back Again", "images/hobbit.jpg", '8.90', 0);
        cartContentTemp.push(newBook);
        newBook = new Book("Foundation", "images/found.jpg", '12', 0);
        cartContentTemp.push(newBook);
        localStorage.setItem("cartContent", JSON.stringify(cartContentTemp))
        return cartContentTemp;
    }
    return JSON.parse(localStorage.getItem("cartContent"));
}

function generateMyCart() {
    let sum = 0;
    myCart.innerHTML = "";
    cartContent.forEach(book => {
        if (book.quantity > 0) {
            let newBookOnCart = document.createElement("div");
            newBookOnCart.classList.add("book-item-cart")
            newBookOnCart.innerHTML = `<div class="book-cover-cart"><img src=${book.imgURL} alt=""></div>
                                       <div class="book-item-body-cart">
                                            <p class="book-title-cart">${book.title}</p>
                                            <div class="book-info"><span>QUANTITY: ${book.quantity}</span><button>X</button><span>${book.price}€</span></div>
                                       </div>`
            myCart.appendChild(newBookOnCart);
            sum += eval(book.quantity * book.price);
            //we give the delete button a value which ties it with a book on our cartContent array
            newBookOnCart.querySelector(".book-info button").value = cartContent.indexOf(book) + 1;
            //...and add event listener to the delete button
            newBookOnCart.querySelector(".book-info button").addEventListener("click", deleteFromCart)
        }
    })
    const priceBox = document.querySelector(".price-total");
    priceBox.innerText = "Total: " + sum.toFixed(2) + "€";
    //take care of empty cart
    if (sum == 0) {
        let pEmpty = document.createElement("p")
        pEmpty.innerText = "There is nothing here"
        myCart.appendChild(pEmpty)
    }

}

function deleteFromCart() {
    console.log(this.value)
    console.log
    this.parentNode.parentNode.parentNode.remove();
    //update price
    const priceBox = document.querySelector(".price-total");
    const oldPrice = priceBox.innerText.match(/(\d)+(\.)?(\d)*/g)[0];
    const newPrice = oldPrice - cartContent[this.value - 1].quantity * cartContent[this.value - 1].price;
    priceBox.innerText = "Total: " + newPrice.toFixed(2) + "€";
    if (newPrice == 0) {
        let pEmpty = document.createElement("p")
        pEmpty.innerText = "There is nothing here"
        myCart.appendChild(pEmpty)
    }
    //update cart quantities on temp and memory
    cartContent[this.value - 1].quantity = 0;
    localStorage.setItem("cartContent", JSON.stringify(cartContent))


}