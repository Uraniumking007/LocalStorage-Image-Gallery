const listDOM = document.getElementById("users-list");

let storage = JSON.parse(localStorage.getItem("users")) || [];
/*
<div tabindex="0" class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
  <div class="collapse-title text-xl font-medium">
    Focus me to see content
  </div>
  <div class="collapse-content">
    <p>tabindex="0" attribute is necessary to make the div focusable</p>
  </div>
</div>
*/
function usersDOM() {
  listDOM.innerHTML = "";
  storage = JSON.parse(localStorage.getItem("users")) || [];

  storage.forEach((element, index) => {
    const container = document.createElement("div");
    const userDiv = document.createElement("div");
    const userName = document.createElement("span");
    const insideCollapse = document.createElement("div");
    const imageContainer = document.createElement("img");
    const dataContainer = document.createElement("div");
    const detailsContainer = document.createElement("div");
    const BtnContainer = document.createElement("div");
    const editBtn = document.createElement("img");
    const deleteBtn = document.createElement("img");

    container.tabIndex = 0;
    container.className =
      "collapse collapse-arrow border border-base-300 bg-base-100 rounded-box p-4 py-2 w-[100%] ";
    container.id = element.Uid;
    userDiv.className =
      "p-2 collapse-title flex items-center text-base font-medium";
    userName.className = "ml-4";
    userName.textContent = `${element.user}`;
    insideCollapse.className =
      "collapse-content items-center flex justify-evenly items-center gap-2";
    imageContainer.src = `${element.image}`;
    imageContainer.style.width = "4rem";
    imageContainer.style.height = "4rem";
    imageContainer.alt = element.user;
    detailsContainer.className =
      "flex flex-col h-[100%] justify-center items-center";
    detailsContainer.innerText = `Uid : ${element.Uid}
    Email : ${element.mail}
    Gender : ${element.gender}
    Contact Number : ${element.phoneNumber}`;
    BtnContainer.className =
      "flex justify-evenly h-[100%] flex-col items-evenly";
    editBtn.src = "/editIcon.svg";
    editBtn.className = "w-4 h-4";
    editBtn.alt = "edit";
    editBtn.id = element.Uid;
    editBtn.addEventListener("click", (e) => {
      editUser(e.target.id);
    });
    deleteBtn.src = "/trash.svg";
    deleteBtn.className = "w-4 h-4";
    deleteBtn.id = index;
    deleteBtn.alt = "delete";
    deleteBtn.addEventListener("click", (e) => {
      deleteUser(e.target.id);
    });
    const dashboard = document.createElement("img");
    dashboard.src = "/magnify.svg";
    dashboard.className = "w-4 h-4";
    dashboard.id = element.Uid;
    dashboard.alt = "dashboard";
    dashboard.addEventListener("click", (e) => {
      gotoDashboard(e.target.id);
    });
    container.appendChild(userDiv);
    container.appendChild(insideCollapse);
    userDiv.appendChild(imageContainer);
    userDiv.appendChild(userName);
    insideCollapse.appendChild(dataContainer);
    dataContainer.appendChild(detailsContainer);
    insideCollapse.appendChild(BtnContainer);
    BtnContainer.appendChild(editBtn);
    BtnContainer.appendChild(deleteBtn);
    BtnContainer.appendChild(dashboard);
    listDOM.appendChild(container);
  });
}

function gotoDashboard(value) {
  localStorage.setItem("loggedIn", JSON.stringify(value));
  const base = location.origin;
  location.href = `${base}/dashboard/dashboard.html`;
}

function editUser(value) {
  const baseUrl = location.origin;
  location.href = `${baseUrl}/${value}`;
}

function deleteUser(value) {
  storage = JSON.parse(localStorage.getItem("users")) || [];
  storage.splice(value, 1);
  localStorage.setItem("users", JSON.stringify(storage));
  usersDOM();
}

usersDOM();
