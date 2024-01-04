//làm đồng hồ
function showTime() {
    const time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();

    document.getElementById("clock").innerHTML = `${hours}:${minutes}`
    setTimeout(showTime, 1000);
}

//làm tapbar
let tapBar = document.querySelector(".tap_bar");
let tapBarOffsetTop = tapBar.offsetTop;
window.addEventListener("scroll", function () {
    if (window.pageYOffset >= tapBarOffsetTop) {
        tapBar.classList.add("sticky");
    } else {
        tapBar.classList.remove("sticky");
    }
});

//đến dòng chỉ định
function scrollToTarget() {
    const targetLine = document.getElementById("targetLine");
    targetLine.scrollIntoView({behavior: "smooth"});
}

// lên đầu trang
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("scrollBtn").style.display = "block";
    } else {
        document.getElementById("scrollBtn").style.display = "none";
    }
}

// nav quảng cáo
let images = [
    "image/dongho.jpg",
    "image/iphone.jpg",
    "image/mac.jpg",
    "image/chup.jpg"
];
let texts = [
    "Apple Watch Series 8",
    "Iphone 14 Series",
    "Mac,MacBook 2023",
    "Apple AirPods Max 2023"

];

let interval = 5000;
let nav = document.querySelector(".background_home");
let textSale = document.getElementById("text_sale");
let imageIndex = 0;
let textIndex = 0;

function changeBackgroundImage() {
    if (imageIndex >= images.length) {
        imageIndex = 0;
        textIndex = 0;
    }
    let imageUrl = images[imageIndex];
    nav.style.backgroundImage = 'url("' + imageUrl + '")';
    imageIndex++;
    let textId = texts[textIndex];
    textSale.innerHTML = textId;
    textIndex++;
}

changeBackgroundImage();
setInterval(changeBackgroundImage, interval);




let swiper = new Swiper('.swiper-container', {
    loop: true,
    slidesPerView: 3,
    spaceBetween: 30,
});


document.addEventListener("DOMContentLoaded", function () {
    var mySlider = new Swiper('.my-slider', {
        slidesPerView: 1,
        spaceBetween: 10,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
});

function toggleCategoryProduct(categoryId) {
    filterProductsByCategory(categoryId);

    const displayCategoryProduct = document.getElementById("form_scope_categoryProduct");
    displayCategoryProduct.classList.toggle("hide");
    displayCategoryProduct.classList.toggle("show");

    const popupOverlay = document.getElementById("popupOverlay");
    popupOverlay.style.display = displayCategoryProduct.classList.contains("show") ? "block" : "none";
}

function hidePopup() {
    const formScopeCategoryProduct = document.getElementById("form_scope_categoryProduct");
    formScopeCategoryProduct.classList.add("hide");

    const popupOverlay = document.getElementById("popupOverlay");
    popupOverlay.style.display = "none";
}


const minusButtons = document.querySelectorAll('.minus-button');
const plusButtons = document.querySelectorAll('.plus-button');
minusButtons.forEach(function (minusButton) {
    minusButton.addEventListener('click', function () {
        let currentValue = parseInt(this.nextElementSibling.value);
        if (currentValue > 1) {
            this.nextElementSibling.value = currentValue - 1;
        }
    });
});
plusButtons.forEach(function (plusButton) {
    plusButton.addEventListener('click', function () {
        let currentValue = parseInt(this.previousElementSibling.value);
        this.previousElementSibling.value = currentValue + 1;
    });
});


