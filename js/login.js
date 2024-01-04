const userNameLog = document.getElementById("userNameLog")
const passwordLog = document.getElementById("passwordLog")
const errUserNameLog = document.getElementById("username-log-error")
const errPasswordLog = document.getElementById("password-log-error")

let fileNameGlobal = ""
const NOTEMPTY = "Không được để trống"

const fullName = document.getElementById("fullname")
const userNameReg = document.getElementById("username-reg")
const email = document.getElementById("email")
const passwordReg = document.getElementById("password-reg")
const confirmPassword = document.getElementById("confirm-password")
const avatar = document.getElementById("avatar")
const avatarPreview = document.getElementById("avatar-preview")

const errFullName = document.getElementById("fullname-error")
const errUserNameReg = document.getElementById("username-reg-error")
const errEmail = document.getElementById("email-error")
const errPasswordReg = document.getElementById("password-reg-error")
const errConfirmPassword = document.getElementById("confirm-password-error")

let users = JSON.parse(localStorage.getItem("users")) || []

const arrInput = document.querySelectorAll("input")
for (const input of arrInput) {
    input.addEventListener("click", function (e) {
        this.parentNode.querySelector("").innerHTML = "";
    })
}

function toggleRegister() {
    document.getElementById("form_login").classList.toggle("hiden")
    document.getElementById("login").reset()
    document.getElementById("form_register").classList.toggle("hiden")
    document.getElementById("register").reset()
    const arrError = document.querySelectorAll(".error-message")
    arrError.forEach(e => e.innerHTML = "")
    fileNameGlobal = ""
    avatarPreview.src = ""
}

function getNewId() {
    if (users.length == 0) {
        return 1
    } else {
        let idMax = users[users.length - 1].user_id
        return ++idMax
    }
}

function checkDataField(field, errField, regex, errMessage) {
    if (field == "") {
        if (errField !== null) {
            errField.innerHTML = NOTEMPTY;
        }
    } else if (!regex.test(field)) {
        if (errField !== null) {
            errField.innerHTML = errMessage;
        }
    } else {
        if (errField !== null) {
            errField.innerHTML = "";
        }
    }
}

function checkInfoRegister(user, confirmPassword) {
    const regexName = /^[a-zA-Z]{2,}$/;
    const regexUserName = /^[a-zA-Z0-9]{6,}$/;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexPassword = /^(?=.*[A-Z])(?=.*\d).{6,}$/;

    checkDataField(user.fullName, errFullName, regexName, "Có ít nhất 2 ký tự");
    checkDataField(user.userName, errUserNameReg, regexUserName, "Có ít nhất 6 ký tự");
    checkDataField(user.email, errEmail, regexEmail, "Không đúng định dạng email");
    checkDataField(user.password, errPasswordReg, regexPassword, "Có ít nhất: một chữ hoa, một số, 6 ký tự");

    if (confirmPassword === "") {
        errConfirmPassword.innerHTML = NOTEMPTY;
    } else if (confirmPassword !== user.password) {
        errConfirmPassword.innerHTML = "Xác nhận lại mật khẩu";
    } else {
        errConfirmPassword.innerHTML = "";
    }


    const existingUserName = users.find((u) => u.userName === user.userName);
    if (existingUserName) {
        errUserNameReg.innerHTML = "Tên đăng nhập đã tồn tại";
        return false;
    }
    const existingUserEmail = users.find((u) => u.email === user.email);
    if (existingUserEmail) {
        errEmail.innerHTML = "Email đã tồn tại";
        return false;
    }


    const arrError = document.querySelectorAll("#register .error-message");
    let check = true;
    arrError.forEach((e) => {
        if (e.innerHTML !== "") {
            check = false;
            return;
        }
    });

    return check;
}


document.getElementById("register").addEventListener("submit", function (e) {
    e.preventDefault()
    const user = {
        user_id: getNewId(),
        fullName: fullName.value.trim(),
        userName: userNameReg.value.trim(),
        email: email.value.trim(),
        password: passwordReg.value.trim(),
        avatar: fileNameGlobal,
        role: "user",
        cart:[]
    }
    const checkInFo = checkInfoRegister(user, confirmPassword.value.trim(),)
    if (checkInFo) {
        users.push(user)
        localStorage.setItem("users", JSON.stringify(users))
        alert("Tạo tài khoản thành công!");
        window.location.href = "../html/login.html"
        toggleForm()
    }
})

document.getElementById("avatar").addEventListener("change", function (e) {
    const file = e.target.files[0];
    const fileName = file.name;
    if (fileName !== "") {
        fileNameGlobal = fileName;
    } else {
        fileNameGlobal = "";
    }
    avatarPreview.src = URL.createObjectURL(file);
});

document.getElementById("login").addEventListener("submit", function (e) {
    e.preventDefault();
    let userName = userNameLog.value.trim();
    let password = passwordLog.value.trim();
    let users = JSON.parse(localStorage.getItem("users"));
    let index = users.findIndex(function (e) {
        return e.userName == userName;
    });
    if (index == -1) {
        errUserNameLog.innerHTML = "Không có tài khoản này";
    } else {
        errUserNameLog.innerHTML = "";
        if (users[index].password != password) {
            errPasswordLog.innerHTML = "Sai mật khẩu";
        } else {
            errPasswordLog.innerHTML = "";

            if (users[index].role == "user") {
                localStorage.setItem("userLogin", JSON.stringify(users[index]));
                window.location.href = "../index.html";
            } else if (users[index].role == "admin") {
                localStorage.setItem("adminLogin", JSON.stringify(users[index]));
                window.location.href = "../html/manage.html"
            }
            this.reset();

        }
    }
});

function loadInfo() {
    const idUserLogin = JSON.parse(localStorage.getItem("userLogin"))
    let users = JSON.parse(localStorage.getItem("users"))
    const index = users.findIndex(user => user.user_id == idUserLogin.user_id);
    if (index == -1) {
        window.location.href = "../html/login.html"
    } else
        document.getElementById("load_name").innerHTML = users[index].fullName
    document.getElementById("load_img").src = `image/avata/${users[index].avatar}`
    /*document.getElementById("count_number").innerHTML = `${idUserLogin.cart.length}`;*/
}
loadInfo();


