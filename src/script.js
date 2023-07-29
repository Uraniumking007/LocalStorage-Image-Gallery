const username = document.getElementById("username");
const emailAddress = document.getElementById("emailAddress");
const password = document.getElementById("password");
const contactNumber = document.getElementById("contactNumber");
const container = document.getElementById("form");
const genderEle = document.getElementsByName("gender");

const submit = document.getElementById("submit");
const login = document.getElementById("login");
let storage = JSON.parse(localStorage.getItem("users")) || [];
let genderValue = "";

login.addEventListener("click", () => {
  location.href = `${location.origin}/login.html`;
});

function inputData() {
  storage = JSON.parse(localStorage.getItem("users")) || [];
  genderEle.forEach((element) => {
    if (element.checked) {
      genderValue = element.value;
    }
  });

  try {
    const imageData = localStorage.getItem("imageurl");
    repMail();

    const details = {
      Uid: crypto.randomUUID(),
      user: username.value,
      mail: emailAddress.value,
      pass: password.value,
      phoneNumber: parseInt(contactNumber.value),
      gender: genderValue,
      image: imageData,
      isAdmin: false,
    };
    storage.push(details);
    localStorage.setItem("users", JSON.stringify(storage));
    username.value = "";
    password.value = "";
    emailAddress.value = "";
    contactNumber.value = "";
    genderEle.ariaChecked = false;
    localStorage.setItem("loggedIn", details.Uid);
    location.href = `${location.origin}/dashboard/dashboard.html`;
    localStorage.removeItem("imageurl");
  } catch (error) {
    alert(error);
  }
}

submit.addEventListener("click", (e) => {
  e.preventDefault();
  inputData();
});

function editor() {
  storage = JSON.parse(localStorage.getItem("users")) || [];
  let editId = location.pathname;

  editId = editId.slice(1);
  storage.forEach((element) => {
    if (editId === element.Uid) {
      username.value = element.user;
      emailAddress.value = element.mail;
      contactNumber.value = element.phoneNumber;
      emailAddress.value = element.mail;
      password.value = "";
      password.ariaPlaceholder = "Enter New Password";
      genderEle.forEach((ele) => {
        if (ele.value == element.gender) {
          ele.checked = true;
        }
      });
      submit.className = "hidden";
      const saveBtn = document.createElement("button");
      saveBtn.textContent = "Save";
      saveBtn.addEventListener("click", (e) => {
        e.preventDefault();
        saveNew();
      });
      container.insertAdjacentElement("beforeend", saveBtn);
    }
  });
}

function repMail(value) {
  const email = emailAddress.value;
  const contactNum = contactNumber.value;
  if (!email.includes("@")) {
    throw new Error("Enter Valid Email Address");
  }
  storage.forEach((ele) => {
    if (email == ele.mail) {
      if (value == ele.Uid) {
        return;
      }
      throw new Error("This email is Already Used by Other User");
    }
    return;
  });
  if (contactNum.length != 10) {
    throw new Error("Enter Correct Contact Number");
  }
}

function saveNew() {
  try {
    storage = JSON.parse(localStorage.getItem("users")) || [];
    let editId = location.pathname;
    editId = editId.slice(1);
    repMail(editId);
    genderEle.forEach((element) => {
      if (element.checked) {
        genderValue = element.value;
      }
    });

    const base64 = localStorage.getItem("imageurl");
    storage.forEach((element) => {
      if (element.Uid != editId) {
        return;
      }
      element.user = username.value;
      element.mail = emailAddress.value;
      if (password.value == "" || password.value === null) {
        element.pass;
      } else {
        element.pass = password.value;
      }
      element.phoneNumber = parseInt(contactNumber.value);
      element.gender = genderValue;
      if (base64 === null || base64 == "") {
        element.image;
      } else {
        element.image = base64;
      }
    });
    localStorage.setItem("users", JSON.stringify(storage));
    localStorage.removeItem("imageurl");
    location.href = `${location.origin}/users/users.html`;
  } catch (error) {
    alert(error);
  }
}

editor();

const $file = document.querySelector("#image");
$file.addEventListener("change", (event) => {
  const selectedfile = event.target.files;
  if (selectedfile.length <= 0) {
    return;
  }
  const [imageFile] = selectedfile;
  const fileReader = new FileReader();
  fileReader.onload = () => {
    localStorage.setItem("imageurl", fileReader.result);
  };
  fileReader.readAsDataURL(imageFile);
});
