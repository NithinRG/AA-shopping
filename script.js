const menuItems = document.getElementsByClassName("menu-item");
const sectionHeader = document.getElementsByClassName("section-header")[0];
const items = document.getElementsByClassName("item");
const addBtns = document.getElementsByClassName("cart-add-btn");
const delBtns = document.getElementsByClassName("cart-del-btn");
const cartCount = document.getElementById("cart-count");
const cartBtn = document.getElementsByClassName("cart-icon")[0];
const cartElement = document.getElementsByClassName("cart")[0];
const sidebarBtn = document.getElementsByClassName("sidebar-btn")[0];
const sidebarCloseBtn = document.getElementsByClassName("sidebar-close-btn")[0];

let cart = [];

//Cart toggle button
cartBtn.addEventListener("click", () => {
    cartElement.classList.toggle("hidden-cart");
});

//Show and hide cart on mobile view
sidebarBtn.addEventListener("click", () => {
    const sidebar = document.getElementsByClassName("sidebar")[0];
    sidebar.classList.add("open");
    sidebarBtn.classList.add("open");
});

sidebarCloseBtn.addEventListener("click", () => {
    const sidebar = document.getElementsByClassName("sidebar")[0];
    sidebar.classList.remove("open");
    sidebarBtn.classList.remove("open");
});

//Filter products
for (const menuItem of menuItems) {
    menuItem.addEventListener("click", () => {
        sectionHeader.innerHTML = `<h1>${menuItem.innerText}</h1>`;
        for (const item of items) {
            if (
                item.classList.contains(menuItem.getAttribute("data-category"))
            ) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        }
        activeCategory = document.getElementsByClassName("selected")[0];
        if (activeCategory) {
            activeCategory.classList.remove("selected");
        }
        menuItem.classList.add("selected");
        const sidebar = document.getElementsByClassName("sidebar")[0];
        sidebar.classList.remove("open");
        sidebarBtn.classList.remove("open");
    });
}

//Add to cart
for (const addBtn of addBtns) {
    addBtn.addEventListener("click", (e) => {
        const btn = e.target;
        const parent = btn.parentNode;
        let id = parseInt(parent.id);
        if (!cart.includes(id)) {
            let imgSrc = parent
                .getElementsByTagName("img")[0]
                .getAttribute("src");
            let productName =
                parent.getElementsByClassName("product-name")[0].innerHTML;
            cart.push(id);
            addItem(id, 1, imgSrc, productName);
        }
        btn.innerHTML = "Added";
        cartCount.innerHTML = cart.length;
    });
}

const addItem = (id, qty, imgSrc, productName) => {
    if (cart.length === 1) {
        cartElement.innerHTML = "";
    }
    let item = document.createElement("div");
    item.classList.add("cart-item");
    item.setAttribute("data-id", id);
    item.innerHTML = `
            <img src="${imgSrc}" alt="" />
            <div class="cart-item-details">
                <h3 class="cart-item-name">${productName}</h3>
                <div class="cart-item-quantity-adjust">
                    Quantity:
                    <i class="fas fa-minus quantity-update-btn" onclick = "updateCount(-1, this, ${id})"></i>
                    <span class="cart-item-quantity">${qty}</span>
                    <i class="fas fa-plus quantity-update-btn" onclick = "updateCount(1, this, ${id})"></i>
                </div>
            </div>
            <i class="fas fa-trash cart-del-btn" onclick = "delItem(this, ${id})"></i>`;
    cartElement.appendChild(item);
};

//Remove from cart
const delItem = (thisBtn, id) => {
    if (cart.includes(id)) {
        cart = cart.filter((el) => el !== id);
        thisBtn.parentNode.remove();
        if (cart.length === 0) {
            cartElement.innerHTML = `<div class="cart-empty">Cart is empty</div>`;
        }
    }
    btn = document.getElementById(id).getElementsByTagName("button")[0];
    btn.innerHTML = "Add to cart";
    cartCount.innerHTML = cart.length;
};

//Update quantity of items in cart
const updateCount = (n, thisBtn, id) => {
    quantityElement =
        thisBtn.parentNode.getElementsByClassName("cart-item-quantity")[0];
    quantity = parseInt(quantityElement.innerText);
    quantityElement.innerText = quantity + n;
    if (quantity + n === 0) {
        delItem(thisBtn.parentNode.parentNode, id);
    }
};

//Close cart on clicking outside
window.onload = () => {
    document.onclick = function (e) {
        console.log(e.target, e.target.classList);
        if (
            !(
                cartElement.contains(e.target) ||
                e.target.classList.contains("quantity-update-btn") ||
                e.target.classList.contains("cart-del-btn") ||
                cartBtn.contains(e.target)
            )
        ) {
            cartElement.classList.add("hidden-cart");
        }
    };
};
