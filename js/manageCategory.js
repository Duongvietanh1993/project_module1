
const formScopeCategoryElement = document.getElementById("form_scope_category");
const inputDescription = document.getElementById("description");
const inputCategoryName = document.getElementById("categoryName");
const inputCategoryImg = document.getElementById("img_category");
const displayCategoryElement = document.getElementById("displayCategory");
const listCategoryList = document.getElementById("category_option");
const categorys = JSON.parse(localStorage.getItem("categorys")) || [];

function toggleFormCategory() {
    formScopeCategoryElement.classList.toggle("hide");
    inputCategoryName.value = "";
    inputDescription.value = "";
    inputCategoryImg.value = "";
}

function addCategory() {
    const categoryName = inputCategoryName.value;
    const description = inputDescription.value;
    let categoryImg = inputCategoryImg.value;
    categoryImg = categoryImg.split("\\")
    categoryImg = categoryImg[categoryImg.length - 1]
    const newCategory = {
        id: idGlobal(),
        categoryName: categoryName,
        categoryImg: categoryImg,
        description: description
    };
    categorys.push(newCategory);

    localStorage.setItem("categorys", JSON.stringify(categorys));
    showCategoryList();
    inputCategoryName.value = "";
    inputDescription.value = "";
    formScopeCategoryElement.classList.add("hide");
}

function showCategoryList() {
    displayCategoryElement.innerHTML = "";
    let html = "";
    categorys.forEach((category) => {
        const {id, categoryName, description, categoryImg} = category;
        html += `
            <tr>
                <td>${id}</td>
                <td>${categoryName}</td>
                <td><img src="../image/danhmuc/${categoryImg}"></td>
                <td>${description}</td>
                <td>
                    <button class="btn btn_delete" onclick="deleteCategory(${id})">Delete</button>
                </td>
            </tr>
        `;
    });
    displayCategoryElement.innerHTML = html;
}

showCategoryList()

function printInterface() {
    const listCategoryElement = document.getElementById("displayCategory");
    let interfaceHTML = "";
    categorys.forEach((category) => {
        const {id, categoryName, description, categoryImg} = category;
        interfaceHTML += `
    <div class="product num_one" onclick="toggleCategoryProduct(${id})">
                <img src="image/danhmuc/${categoryImg}">
            <h3>${categoryName}</h3>
            
        </div>
  `
    });
    listCategoryElement.innerHTML = interfaceHTML;

}

function filterProductsByCategory(categoryId, sortType) {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    let filteredProducts = products.filter(value => value.category_id == categoryId);

    const displayCategoryFilterElement = document.getElementById("displayCategoryFilter");
    displayCategoryFilterElement.innerHTML = "";

    if (filteredProducts.length === 0) {
        displayCategoryFilterElement.innerHTML = "Không có sản phẩm trong danh mục này.";
        return;
    }
    function sortCategoryUpAscending() {
        filteredProducts.sort(function (a, b) {
            return a.price - b.price;
        });
        displayFilteredProducts();
    }
    function sortCategoryDescending() {
        filteredProducts.sort(function (a, b) {
            return b.price - a.price;
        });
        displayFilteredProducts();
    }
    function displayFilteredProducts() {
        let html = "";
        filteredProducts.forEach(value => {
            html += `
      <div class="product num_one">
        <div class="popup_img">
          <a href="#">
            <img src="image/sanpham/${value.img}">
            <p>quick view</p>
          </a>
        </div>
        <p>${value.name}</p>
        <div class="money">
          <p>${value.price}.000.000 ₫</p>
          <h4>${Math.round(value.price) * 0.9}00.000 ₫</h4>
        </div>
        <button type="button" onclick="addToCart(${value.product_id})">Thêm vào giỏ hàng</button>
      </div>
    `;
        });

        displayCategoryFilterElement.innerHTML = html;
    }
    if (sortType === "ascending") {
        sortCategoryUpAscending();
    } else if (sortType === "descending") {
        sortCategoryDescending();
    } else {
        displayFilteredProducts();
    }
}

function printSelect() {
    let interfaceHTML = "";
    categorys.forEach((category) => {
        const {id, categoryName, description, categoryImg} = category;
        interfaceHTML += `
    <option value="${id}">${categoryName}</option>
  `
    });
    listCategoryList.innerHTML = interfaceHTML;

}
printSelect()

function printListHome() {
    let interfaceHTML = "";
    let listCategoryHome = document.getElementById("listHomeCategory")
    categorys.forEach((category) => {
        const {id, categoryName, description, categoryImg} = category;
        interfaceHTML +=`
        <li class="popup_text"><a href="#">${categoryName}</a></li>
                        <hr>
        `});
    listCategoryHome.innerHTML=interfaceHTML;
}
printListHome();


function idGlobal() {
    let idMax = 0;
    for (let i = 0; i < categorys.length; i++) {
        let element = categorys[i]
        if (idMax < element.id) {
            idMax = element.id;
        }
    }
    return idMax + 1;
}

function deleteCategory(id) {
    const index = categorys.findIndex(category => category.id === id);
    if (index !== -1) {
        const confirmDelete = confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");
        if (confirmDelete) {
            categorys.splice(index, 1);
            localStorage.setItem("categorys", JSON.stringify(categorys));
            showCategoryList();
        }
    }
}


