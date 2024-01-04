const showCart = () => {
    let userLogin = JSON.parse(localStorage.getItem("userLogin"))|| [];
    if (userLogin == null) {
        alert("Vui lòng đăng nhập đề xem giở hàng");
        location.href = "../html/login.html";
    }
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let total = 0;
    let listCartItem = userLogin.cart.reduce((string, ct, index) => {
        // lấy thông tin sp theo id
        let product = products.find((p) => p.product_id == ct.idProduct);

        total += product.price * ct.quantity;
        return (
            string +
            `<tr>
            <td>${index + 1}</td>
            <td>
                <div class="product-details">
                    <img src="../image/sanpham/${product.img}" alt="Product 1" class="product-image">
                    <div class="product-name">${product.name}</div>
                </div>
            </td>
            <td>${product.price} ₫</td>
            <td>
                <div class="pro-qty">
    <button class="minus-button" onclick="decreaseQuantity(${ct.idProduct})">-</button>
    <input type="text" value="${ct.quantity}" id="quantity-${ct.idProduct}">
    <button class="plus-button" onclick="increaseQuantity(${ct.idProduct})">+</button>
</div>
            </td>

            <td>${product.price * ct.quantity} ₫</td>
            <td><a id="delIcon" onclick="handleDelete(${ct.idProduct})" href="#"><i class="fa-solid fa-trash-can"></i></a></td>
        </tr>`
        );
    }, "");



    document.getElementById("drawTableCart").innerHTML = listCartItem;
    document.getElementById("total").innerHTML = `Tổng Số Tiền: ${total}.000.000 ₫`;

};

showCart();

const increaseQuantity = (productId) => {
    let inputElement = document.getElementById(`quantity-${productId}`);
    let currentQuantity = parseInt(inputElement.value);
    inputElement.value = currentQuantity + 1;

    updateCartQuantity(productId, currentQuantity + 1);
};

const decreaseQuantity = (productId) => {
    let inputElement = document.getElementById(`quantity-${productId}`);
    let currentQuantity = parseInt(inputElement.value);
    if (currentQuantity > 1) {
        inputElement.value = currentQuantity - 1;

        updateCartQuantity(productId, currentQuantity - 1);
    }
};

const updateCartQuantity = (productId, newQuantity) => {
    let userLogin = JSON.parse(localStorage.getItem("userLogin"));
    let cartItem = userLogin.cart.find((ct) => ct.idProduct == productId);
    if (cartItem) {
        cartItem.quantity = newQuantity;
        localStorage.setItem("userLogin", JSON.stringify(userLogin));
    }
    location.reload();
};

// XỬ lí xóa
const handleDelete = (idPro) => {
    let userLogin = JSON.parse(localStorage.getItem("userLogin"));
    if (confirm("Bạn muốn xóa sản phẩm này !")) {
        let indexDelete = userLogin.cart.findIndex(ct => ct.idProduct == idPro)
        userLogin.cart.splice(indexDelete, 1);
        localStorage.setItem("userLogin", JSON.stringify(userLogin))
        showCart();
    }
}


const handleCheckOut = () => {
    let userLogin = JSON.parse(localStorage.getItem("userLogin"));
    let products = JSON.parse(localStorage.getItem("products")) || []
    let orders = JSON.parse(localStorage.getItem("orders")) || []
    let order_id = getNewId();
    let order_name = document.getElementById("name_order").value;
    let orders_details = [];
    let total_price = 0;
    for (let i = 0; i < userLogin.cart.length; i++) {
        const element = userLogin.cart[i];
        let product = products.find(pro => pro.product_id == element.idProduct)
        total_price += product.price * element.quantity;
        let order_detail = {
            product_id: element.idProduct,
            product_name: product.name,
            price: product.price,
            quantity: element.quantity
        }
        orders_details.push(order_detail);
    }
    let status = "Đợi Xác Nhận";
    let note = document.getElementById("address_order").value;

    let newOrder = {
        order_id,
        order_name,
        total_price,
        status,
        note,
        orders_details
    }
    console.log(newOrder)

    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));
    userLogin.cart = [];
    localStorage.setItem("userLogin", JSON.stringify(userLogin));
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let userLoginIndex = users.findIndex((user) => user.user_id == userLogin.user_id);
    users[userLoginIndex] = userLogin;
    localStorage.setItem("users", JSON.stringify(users))
    alert("Đơn hàng đã được đặt")
    location.reload();
}

const getNewId = () => {
    let orders = JSON.parse(localStorage.getItem("orders")) || []
    let idMax = 0;
    for (let i = 0; i < orders.length; i++) {
        const element = orders[i];
        if (idMax < element.order_id) {
            idMax = element.order_id;
        }
    }
    return idMax + 1;
}


function loadInfo() {
    const idUserLogin = JSON.parse(localStorage.getItem("userLogin"))
    let users = JSON.parse(localStorage.getItem("users"))
    const index = users.findIndex(user => user.user_id == idUserLogin.user_id)
    if (index == -1) {
        window.location.href = "../html/login.html"
    } else
        document.getElementById("load_name").innerHTML = users[index].fullName
    document.getElementById("load_img").src = `../image/avata/${users[index].avatar}`
    document.getElementById("count_number").innerHTML= `${idUserLogin.cart.length}`;
}

loadInfo();

function clickLogoutHome(event) {
    localStorage.removeItem("userLogin");
    event.preventDefault();
    location.reload();
}
