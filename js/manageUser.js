const users = JSON.parse(localStorage.getItem("users")) || [];
const textSearch = document.getElementById("input_search_user");
let showManageUserFunction;

function loadInfo() {

    const idUserLogin = JSON.parse(localStorage.getItem("adminLogin"));
    const index = users.findIndex(user => user.user_id == idUserLogin.user_id);
    if (index == -1) {
        window.location.href = "../html/login.html";
    } else {
        document.getElementById("load_name").innerHTML = users[index].fullName;
        document.getElementById("load_img").src = `../image/avata/${users[index].avatar}`;
    }
}

loadInfo();

users.sort(function (a, b) {
    return b.user_id - a.user_id;
});

document.addEventListener("DOMContentLoaded", () => {
    const displayElementUser = document.getElementById("displayUser");
    const paginationContainerUser = document.getElementById("pagination-container-user");
    let currentPage = 1;
    const productsPerPage = 4;
    showManageUserFunction = showManageUser;

    function showManageUser(currentUser = users) {
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const currentUsers = currentUser.slice(startIndex, endIndex);
        displayElementUser.innerHTML = "";
        for (let i = 0; i < currentUsers.length; i++) {
            let user = currentUsers[i];
            const row = document.createElement("tr");
            row.innerHTML = `
              <td>${user.user_id}</td>
              <td>${user.fullName}</td>
              <td>
                <img src="../image/avata/${user.avatar}" alt="img">
              </td>
              <td>${user.email}</td>
              <td>${user.userName}</td>
              <td>****************</td>
              <td>${user.role}</td>
              <td>
                <div class="action_col">
                  <button class="btn btn_edit" onclick="clickUpdate(${user.user_id})">Set Role</button>
                  <button class="btn btn_delete" onclick="deleteUser(${user.user_id})">Delete</button>
                </div>
              </td>
            `;
            displayElementUser.appendChild(row);
        }
        paginationContainerUser.innerHTML = "";
        const totalPages = Math.ceil(users.length / productsPerPage);
        const previousPageLink = document.createElement("a");
        previousPageLink.href = "#";
        previousPageLink.textContent = "Trang trước";
        previousPageLink.addEventListener("click", () => {
            if (currentPage > 1) {
                currentPage--;
                showManageUser();
            }
        });
        const nextPageLink = document.createElement("a");
        nextPageLink.href = "#";
        nextPageLink.textContent = "Trang sau";
        nextPageLink.addEventListener("click", () => {
            if (currentPage < totalPages) {
                currentPage++;
                showManageUser();
            }
        });
        paginationContainerUser.appendChild(previousPageLink);
        for (let i = 1; i <= totalPages; i++) {
            const pageLink = document.createElement("a");
            pageLink.href = "#";
            pageLink.textContent = i;
            if (i === currentPage) {
                pageLink.classList.add("active");
            }
            pageLink.addEventListener("click", () => {
                currentPage = i;
                showManageUser();
            });
            paginationContainerUser.appendChild(pageLink);
        }
        paginationContainerUser.appendChild(nextPageLink);
    }

    showManageUser();
    this.reload()

});

function searchUser() {
    const users = JSON.parse(localStorage.getItem("users"))|| []
    const textSearchValue = textSearch.value.trim().toLowerCase();
    const filteredUsers = users.filter(user => user.fullName.toLowerCase().includes(textSearchValue));
    console.log(filteredUsers)
    showManageUserFunction(filteredUsers);
}

function deleteUser(id) {
    const index = users.findIndex(user => user.user_id == id);

    if (index == -1) {
        alert("Không tìm thấy User!");
    } else {
        const result = confirm("Bạn có chắc muốn xóa!");
        if (!result) {
            return;
        }
        users.splice(index, 1);
        localStorage.setItem("users", JSON.stringify(users));
        showManageUserFunction();

    }
}


function clickUpdate(id) {
    const index = users.findIndex(user => user.user_id == id);

    if (index == -1) {
        alert("Không tìm thấy User!");
    } else {
        if (users[index].role === "user") {
            users[index].role = "admin";
        } else {
            users[index].role = "user";
        }
        localStorage.setItem("users", JSON.stringify(users));
        showManageUserFunction();
    }
}

