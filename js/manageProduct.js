let indexUpdateGlobal = null
let products = JSON.parse(localStorage.getItem("products")) || []

const inputName = document.getElementById("name");
const inputPrice = document.getElementById("price");
const inputCount = document.getElementById("quantity");
const inputImg = document.getElementById("img");
const imgPreview = document.getElementById("img-preview")
const inputCategory = document.getElementById("category_option");
const inputInfo = document.getElementById("product_info");
const displayElement = document.getElementById("displayProduct");
const displayDiscount = document.getElementById("displayDiscount")
const formScopeElement = document.getElementById("form_scope");
const displayProduct = document.getElementById("product_hide");
const displayUser = document.getElementById("user_hide");
const displayCategory = document.getElementById("category_hide")
const displayOrder = document.getElementById("cart_hide")
const formElement = document.getElementById("form");

function toggleTableProduct() {
    displayProduct.classList.toggle("hide")
}

function toggleTableUser() {
    displayUser.classList.toggle("hide")
}

function toggleTableCategory() {
    displayCategory.classList.toggle("hide")
}

function toggleTableOrder() {
    displayOrder.classList.toggle("hide")
}

const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

function getCategoryNamebyId(id) {
    let categorys = JSON.parse(localStorage.getItem("categorys")) || [];

    let indexCategory = categorys.findIndex(value => value.id == id);
    if (indexCategory != -1){
        return categorys[indexCategory].categoryName;
    }
    return "";


}

let currentPage = 1;
const productsPerPage = 3;

function showManageProduct(currentproducts = products) {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    currentproducts.sort(function (a, b) {
        return b.product_id - a.product_id;
    });

    const currentProducts = currentproducts.slice(startIndex, endIndex);
    displayElement.innerHTML = "";
    for (let i = 0; i < currentProducts.length; i++) {
        let product = currentProducts[i];
        const row = document.createElement("tr");
        row.innerHTML = `
          <tr>
            <td>${product.product_id}</td>
            <td>${product.name}</td>
            <td>
                <img src="../image/sanpham/${product.img}" alt="img">
            </td>
            <td>${VND.format(product.price)}</td>
            <td>${product.stock}</td>
            <td>${product.info}</td>
            <td>${getCategoryNamebyId(product.category_id)}</td>
            <td>
                <div class="action_col">
                    <button class="btn btn_edit" onclick="toggleForm(${product.product_id})">Edit</button>
                    <button class="btn btn_delete" onclick="deleteProduct(${product.product_id})">Delete</button>
                </div>
            </td>
        </tr>
        `;
        displayElement.appendChild(row);
    }
    const pagination = document.querySelector(".pagination");
    pagination.innerHTML = "";
    const totalPages = Math.ceil(products.length / productsPerPage);
    const previousPageLink = document.createElement("a");
    previousPageLink.href = "#";
    previousPageLink.textContent = "Trang trước";
    previousPageLink.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            showManageProduct();
        }
    });
    const nextPageLink = document.createElement("a");
    nextPageLink.href = "#";
    nextPageLink.textContent = "Trang sau";
    nextPageLink.addEventListener("click", () => {
        const totalPages = Math.ceil(products.length / productsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            showManageProduct();
        }
    });
    const paginationContainer = document.getElementById("pagination-container");
    paginationContainer.appendChild(previousPageLink);
    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement("a");
        pageLink.href = "#";
        pageLink.textContent = i;
        if (i === currentPage) {
            pageLink.classList.add("active");
        }
        pageLink.addEventListener("click", () => {
            currentPage = i;
            showManageProduct();
        });
        paginationContainer.appendChild(pageLink);
    }
    paginationContainer.appendChild(nextPageLink);


}

function getNextId() {
    let maxId = 0;
    for (let i = 0; i < products.length; i++) {
        let element = products[i];
        if (maxId < element.product_id) {
            maxId = element.product_id;
        }
    }
    return maxId + 1;
}

function drawTableHome(products) {
    let stringSelling = "";
    products.forEach((item, index) => {
        stringSelling +=
            `
            <div class="product num_one">
                <div class="popup_img">
                    <span>
                        <img src="image/sanpham/${item.img}">
                        <p class="view-button">quick view</p>
                    </span>
                </div>
                <p>${item.name}</p>
                <div class="money">
                    <p>${item.price} ₫</p>
                    <h4>${Math.round(item.price) * 0.9} ₫</h4>
                </div>
                <button onclick="addToCart(${item.product_id})">Thêm vào giỏ hàng</button>
            </div>
            
            <div class="popup-overlay popup-overlay-${index}">
                <div class="popup-content product-container">
  <div class="product-image">
    <img src="image/sanpham/${item.img}" alt="Sản phẩm">
  </div>
  <div class="product-details">
    <h1>${item.name}</h1>
    <div class="money product-price">
      <p>${item.price} ₫</p>
      <h4>${Math.round(item.price) * 0.9} ₫</h4>
    </div>
    <h3>Thông tin sản phẩm:</h3>
    <p class="product-description">${item.info}</p>
    <div class="quantity_product">
                        <button class="minus-button">-</button>
                        <input type="text" value="1">
                        <button class="plus-button">+</button>
                    </div>
    <button type="button" onclick="addToCart(${item.product_id})">Thêm vào giỏ hàng</button>
  </div>
</div>

            </div>
            
            `;
    });

    displayElement.innerHTML = stringSelling;

    const viewButtons = document.querySelectorAll('.view-button');
    const popupOverlays = document.querySelectorAll('.popup-overlay');
    const closeButtons = document.querySelectorAll('.close-button');

    viewButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            popupOverlays[index].style.display = 'block';
        });
    });

    closeButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            popupOverlays[index].style.display = 'none';
        });
    });

    popupOverlays.forEach(overlay => {
        overlay.addEventListener('click', (event) => {
            if (event.target === overlay) {
                overlay.style.display = 'none';
            }
        });
    });
}

function showHome() {
    drawTableHome(products);
}

showHome();

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function drawTableDiscountHome(products) {
    let shuffledProducts = shuffleArray(products);
    let stringDiscount = "";
    shuffledProducts.forEach((item, index) => {
        stringDiscount += `
          <div class="product num_one">
            <div class="popup_img">
              <span>
              <div class="image-container">
            <div class="discount-badge">
                <span class="discount-text">30% OFF</span>
            </div>
                <img src="image/sanpham/${item.img}">
                </div>
                <p class="view-button">quick view</p>
              </span>
            </div>
            <p>${item.name}</p>
            <div class="money">
              <p>${item.price} ₫</p>
              <h4>${Math.round(item.price * 0.7)} ₫</h4>
            </div>
            <button type="button">Thêm vào giỏ hàng</button>
          </div>
          
      
        `;
    });
    displayDiscount.innerHTML = stringDiscount;
}

function showDiscountHome() {
    drawTableDiscountHome(products);
}


function toggleForm(id) {
    formScopeElement.classList.toggle("hide");
    if (id != undefined) {
        const indexUpdate = products.findIndex(value => value.product_id == id);
        indexUpdateGlobal = indexUpdate;
        inputName.value = products[indexUpdate].name;
        inputPrice.value = products[indexUpdate].price;
        inputCount.value = products[indexUpdate].stock;
        inputInfo.value = products[indexUpdate].info;
        imgPreview.src = `../image/sanpham/${products[indexUpdate].img}`;
        inputCategory.value = products[indexUpdate].category_id;
    } else {
        indexUpdateGlobal = null;
        formElement.reset();
        imgPreview.src = "";
    }
}


document.getElementById("form").addEventListener("submit", function (element) {
    element.preventDefault()
    if (indexUpdateGlobal != null) {
        products[indexUpdateGlobal].name = inputName.value
        products[indexUpdateGlobal].price = inputPrice.value
        products[indexUpdateGlobal].stock = inputCount.value
        products[indexUpdateGlobal].info = inputInfo.value
        if (inputImg.value) {
            let img = inputImg.value
            img = img.split("\\")
            img = img[img.length - 1]
            products[indexUpdateGlobal].img = img
        }
        products[indexUpdateGlobal].category_id = inputCategory.value
        indexUpdateGlobal = null
        this.reset()
        localStorage.setItem("products", JSON.stringify(products))
        products.sort(function (a, b) {
            return b.product_id - a.product_id;
        });
        toggleForm()
        showManageProduct(products)
        window.location.reload();
        return
    }

    let img = inputImg.value
    img = img.split("\\")
    img = img[img.length - 1]
    const nextId = getNextId();
    const product = {
        product_id: nextId,
        name: inputName.value,
        price: inputPrice.value,
        stock: inputCount.value,
        info: inputInfo.value,
        img,
        category_id: inputCategory.value
    };
    products.push(product)
    localStorage.setItem("products", JSON.stringify(products))
    products.sort(function (a, b) {
        return b.product_id - a.product_id;
    });
    this.reset()
    toggleForm()
    showManageProduct(products)
})

function deleteProduct(id) {
    const indexDelete = products.findIndex(value => value.product_id == id);
    const result = confirm(`Delete ${products[indexDelete].name}`);
    if (result) {
        products.splice(indexDelete, 1);
        localStorage.setItem("products", JSON.stringify(products));
        showManageProduct(products);
    }
}


function searchManage() {
    let textSearch = document.getElementById("input_search_product").value.toLowerCase().trim();
    const products = JSON.parse(localStorage.getItem("products"))
    let filterProducts = products.filter((element) =>
        element.name.toLowerCase().includes(textSearch)
    );
    showManageProduct(filterProducts);
}

function searchHome() {
    let textSearch = document.getElementById("input_search_home").value.toLowerCase().trim();
    let filterProducts = products.filter((element) =>
        element.name.toLowerCase().includes(textSearch)
    );
    drawTableHome(filterProducts)
}

function sortByLetter() {
    products.sort(function (a, b) {
        let nameA = a.name.toLowerCase();
        let nameB = b.name.toLowerCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
    showManageProduct(products);
}

function sortUpAscending() {
    products.sort(function (a, b) {
        return a.price - b.price;
    });
    showManageProduct(products);
}

function sortDescending() {
    products.sort(function (a, b) {
        return b.price - a.price;
    });
    showManageProduct(products);
}


inputImg.addEventListener("change", function () {
    const file = inputImg.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        imgPreview.src = e.target.result;
    }

    if (file) {
        reader.readAsDataURL(file);
    } else {
        imgPreview.src = "";
    }
});

function clickLogout(event) {
    localStorage.removeItem("adminLogin")
    event.preventDefault();
    location.reload();
    window.location.href = "../html/login.html"
}

function clickLogoutHome(event) {
    localStorage.removeItem("userLogin");
    event.preventDefault();
    location.reload();
    window.location.href = "../html/login.html"
}

