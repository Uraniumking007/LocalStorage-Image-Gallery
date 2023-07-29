const username = document.getElementById("username");
const password = document.getElementById("password");
const container = document.getElementById("main");
const login = document.getElementById("login");
const register = document.getElementById("register");

const storage = JSON.parse(localStorage.getItem("users")) || [];

login.addEventListener("click", (e) => {
  e.preventDefault();
  authUser();
});

register.addEventListener("click", () => {
  location.href = location.origin;
});

function authUser() {
  container.innerHTML = "";
  const verify = storage.find((element) => {
    return element.user === username.value && element.pass === password.value;
  });
  if (verify === undefined) {
    password.classList.add("dark:border-red-600");
    password.classList.remove("dark:border-gray-600");
    username.classList.add("dark:border-red-600");
    username.classList.remove("dark:border-gray-600");
    const span = document.createElement("span");
    span.textContent = "Invalid username or Password";
    span.className = "text-red-500";
    span.id = "invalid";
    container.append(span);
    return;
  }

  storage.forEach((element) => {
    if (!(element.user === username.value && element.pass === password.value)) {
      return;
    }
    localStorage.setItem("loggedIn", element.Uid);
    location.href = `${location.origin}/dashboard/dashboard.html`;
    return;
  });
}
