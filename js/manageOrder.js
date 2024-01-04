let orders = JSON.parse(localStorage.getItem("orders")) || [];
const formScopeOrderElement = document.getElementById("form_scope_order");
const formOrderCartElement = document.getElementById("showCartOrder")

function toggleFormOrder() {
    formScopeOrderElement.classList.toggle("hide");
}

orders.sort(function (a, b) {
    return b.order_id - a.order_id;
});
function showManageOrder(data = orders) {
    let stringOrder = "";
    data.forEach(item => {
        stringOrder += `
            <tr>
                <td>${item.order_id}</td>
                <td>${item.order_name}</td>
                <td>${item.note}</td>
                <td>${item.total_price}.000.000 ₫</td>
                <td>${item.status}</td>
                <td>
                    <div class="action_col">
                        <span onclick="toggleFormOrder()"><i class="fa-solid fa-eye"></i></span>
                        <button class="btn btn_edit" onclick="clickUpdateStatus(${item.order_id})">Confirm</button>
                        <button class="btn btn_delete" onclick="deleteOrder(${item.order_id})">Delete</button>
                    </div>
                </td>
            </tr>
        `;
    });

    // Lấy thẻ tbody có id "displayOrder"
    const displayOrder = document.getElementById("displayOrder");

    // Gán chuỗi HTML vào thẻ tbody
    displayOrder.innerHTML = stringOrder;
}

showManageOrder()

function showOrderDetail() {
    let orders = JSON.parse(localStorage.getItem("orders")) || "";
    let stringOrder = "";
    orders.forEach(item => {
        stringOrder += `
         <div class="order-details">
            <h1>Chi tiết đơn hàng</h1>
            <div class="order-info">
                <h2>Mã đơn hàng: ${item.order_id}</h2>
                <p>Tên khách hàng: ${item.order_name}</p>
            </div>
            <table class="order-items">
                <thead>
                    <tr>
                        <th>Sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Giá</th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
            <div class="order-total">
                <h3>Tổng cộng:</h3>
                <p>Tổng tiền: ${item.total_price}.000.000 ₫</p>
            </div>
        </div>
        <div class="btn_scope">
            <button class="btn btn_delete" type="button" onclick="toggleFormOrder()">Quay Lại</button>
        </div>
        `;
        formScopeOrderElement.innerHTML = stringOrder;
    })
}
showOrderDetail()

/*function showCartOrder(orderDetails) {
    let stringOrderCart = "";

    for (let i = 0; i < orderDetails.length; i++) {
        let item = orderDetails[i];

        stringOrderCart += `
        <tr>
            <td>${item.product_name}</td>
            <td>${item.quantity}</td>
            <td>${item.price}.000.000 ₫</td>
        </tr>
        `;
    }

    return stringOrderCart;
}*/


function clickUpdateStatus(id) {

    const index = orders.findIndex(value => value.order_id == id);

    if (index == -1) {
        alert("Không tìm thấy!");
    } else {
        if (orders[index].status === "Đợi Xác Nhận") {
            orders[index].status = "Đã Xác Nhận";
        }
        localStorage.setItem("orders", JSON.stringify(orders));
        showManageOrder();
    }
}

function deleteOrder(id) {

    const index = orders.findIndex(value => value.order_id == id);

    if (index == -1) {
        alert("Không tìm thấy!");
    } else {
        const result = confirm("Bạn có chắc muốn xóa!");
        if (!result) {
            return;
        }
        orders.splice(index, 1);
        localStorage.setItem("orders", JSON.stringify(orders));
        showManageOrder();
    }
}

function searchOrder() {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    const textSearchValue = document.getElementById("input_search_cart").value.trim().toLowerCase();
    const filteredOrders = orders.filter(order => order.order_name.toLowerCase().includes(textSearchValue));
    showManageOrder(filteredOrders);
}