import "@lottiefiles/lottie-player";
const imgContainer = document.getElementById("image-container");
const userLoggedIn = localStorage.getItem("loggedIn");
const file = document.getElementById("file");
const editedFile = document.getElementById("edited");
const animation = document.getElementById("empty-animation");
const logoutBtn = document.getElementById("logout");
const navBar = document.querySelector(".navbar");

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("loggedIn");
  CheckAuth();
});

function CheckAuth() {
  const userLoggedIn = localStorage.getItem("loggedIn") || null;
  if (userLoggedIn != null) {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    users.forEach((element) => {
      const Uid = element.Uid;
      if (userLoggedIn != Uid) {
        return;
      }
      if (!element.isAdmin) {
        return;
      }
      const adminPanel = document.createElement("li");
      adminPanel.className = "btn btn-base-300 mr-4 my-2 px-4 py-2 text-sm";
      adminPanel.textContent = "Admin Panel";
      navBar.insertAdjacentElement("afterbegin", adminPanel);
      adminPanel.addEventListener("click", () => {
        gotoAdminPanel();
      });
    });

    const editUserInfo = document.createElement("li");
    editUserInfo.className = "btn btn-base-300 mr-4 my-2 px-4 py-2 text-sm";
    editUserInfo.textContent = "Edit User Info";
    navBar.insertAdjacentElement("afterbegin", editUserInfo);
    editUserInfo.addEventListener("click", () => {
      editUser(userLoggedIn);
    });

    imageDomGenerator();
    return;
  }
  location.href = `${location.origin}/login.html`;
}
function gotoAdminPanel() {
  location.href = `${location.origin}/users/users.html`;
}

function imageDomGenerator() {
  imgContainer.innerHTML = "";
  const userData =
    JSON.parse(localStorage.getItem(userLoggedIn)) ||
    localStorage.setItem(userLoggedIn, JSON.stringify([])) ||
    [];
  noDataAnimation(userData.length);

  userData.forEach((element, key) => {
    const mainContainer = document.createElement("div");
    mainContainer.className = "flex h-max";
    const img = document.createElement("img");
    img.src = element;
    img.alt = key;
    img.id = key;
    img.className = "w-56 h-56 relative border";
    // img.addEventListener("click", (e) => {
    //   window.location = `${e.target.attributes[0].nodeValue}`;
    // });
    imgContainer.appendChild(mainContainer);
    mainContainer.appendChild(img);
    const functionContainer = document.createElement("div");
    functionContainer.className = "flex flex-col justify-evenly ml-2";
    const editLabel = document.createElement("label");
    editLabel.htmlFor = "edited";
    const pencil = document.createElement("img");
    pencil.src = "/editIcon.svg";
    pencil.alt = "edit";
    pencil.id = key;
    pencil.className = "btn btn-circle btn-secondary p-2 m-0 ";

    pencil.addEventListener("click", (e) => {
      editImage(e.target.id);
    });
    mainContainer.appendChild(functionContainer);
    functionContainer.appendChild(editLabel);
    editLabel.appendChild(pencil);
    const deleteBtn = document.createElement("img");
    deleteBtn.src = "/trash.svg";
    deleteBtn.alt = "delete";
    deleteBtn.id = key;
    deleteBtn.className = "btn btn-circle btn-secondary p-2 m-0 ";

    deleteBtn.addEventListener("click", (e) => {
      deleteImage(e.target.id);
    });
    functionContainer.appendChild(deleteBtn);
  });
}

function editUser(value) {
  const baseUrl = location.origin;
  location.href = `${baseUrl}/${value}`;
}
function noDataAnimation(value) {
  if (value == 0) {
    animation.classList.remove("hidden");
    animation.classList.add("flex");
    imgContainer.classList.add("hidden");
    imgContainer.classList.remove("flex");
    return;
  }
  animation.classList.remove("flex");
  animation.classList.add("hidden");
  imgContainer.classList.remove("hidden");
  imgContainer.classList.add("flex");
}

function deleteImage(value) {
  const confirmation = confirm("Are you sure you want to delete this Image?");
  if (!confirmation) {
    return;
  }
  const userData =
    JSON.parse(localStorage.getItem(userLoggedIn)) ||
    localStorage.setItem(userLoggedIn, JSON.stringify([])) ||
    [];

  userData.splice(value, 1);
  localStorage.setItem(userLoggedIn, JSON.stringify(userData));
  imageDomGenerator();
}

function editImage(value) {
  const userData =
    JSON.parse(localStorage.getItem(userLoggedIn)) ||
    localStorage.setItem(userLoggedIn, JSON.stringify([])) ||
    [];

  editedFile.addEventListener("change", () => {
    const newFile = editedFile.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(newFile);
    reader.onload = () => {
      userData[value] = reader.result;
      localStorage.setItem(userLoggedIn, JSON.stringify(userData));
      imageDomGenerator();
    };
  });
}
file.addEventListener("change", async (e) => {
  const imgFiles = Object.values(e.target.files);
  tobase64Handler(imgFiles);
});

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const userData =
        JSON.parse(localStorage.getItem(userLoggedIn)) ||
        localStorage.setItem(userLoggedIn, JSON.stringify([])) ||
        [];
      userData.push(reader.result);
      localStorage.setItem(userLoggedIn, JSON.stringify(userData));
      imageDomGenerator();
      resolve(reader.result);
    };
    reader.onerror = (error) => reject(error);
  });
}

async function tobase64Handler(files) {
  const filePathsPromises = [];
  files.forEach((file) => {
    filePathsPromises.push(toBase64(file));
  });
  const filePaths = await Promise.all(filePathsPromises);
  return filePaths.map((base64File) => ({
    selectedFile: base64File,
  }));
}

CheckAuth();
