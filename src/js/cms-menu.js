let currentPage = ""

window.onload = () => {
    currentPage = sessionStorage.getItem("cms-page") || "dashboard"
    document.querySelector(`.sidebar .item #${currentPage}`).click()
}

function switchToSection(event) {
    const currentSection = document.querySelector(`.${currentPage}`)
    const currentActiveLink = document.querySelector(".sidebar .item .active")
    const newSection = document.querySelector(`.${event.target.id}`) 
    const newActiveLink = event.target

    currentSection.style.display = "none"
    newSection.style.display = "block"

    currentActiveLink.classList.remove("active")
    newActiveLink.classList.add("active")

    currentPage = event.target.id
    sessionStorage.setItem("cms-page", event.target.id)
}