const addToCart = (idPro) => {

    let userLogin = JSON.parse(localStorage.getItem("userLogin"))|| [];
    if (userLogin == null) {
        alert("Vui lòng đăng nhập đề xem giở hàng");
        location.href = "../html/login.html";
    }

    let indexCartItem = userLogin.cart.findIndex(
        (cartIt) => cartIt.idProduct == idPro
    );
    if (indexCartItem > -1) {
        userLogin.cart[indexCartItem].quantity += 1;
    } else {
        let cartItem = {
            idProduct: idPro,
            quantity: 1,
        };
        userLogin.cart.push(cartItem);
    }
    localStorage.setItem("userLogin", JSON.stringify(userLogin));
    alert("Thêm sản phẩm thành công")
};
