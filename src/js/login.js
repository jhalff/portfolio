const loginButton = document.querySelector("input[type=submit]")
const usernameInput = document.querySelector("input[type=text]")
const passwordInput = document.querySelector("input[type=password")

loginButton.addEventListener("click", () => {
    sessionStorage.setItem("username", usernameInput.value)
    sessionStorage.setItem("password", passwordInput.value)
})