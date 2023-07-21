let navbar = document.querySelector(".navbar")
let navbarItems = document.querySelectorAll(".navbar ul li a")

let totalSections = document.querySelectorAll("section").length
let sectionHeight = document.querySelector("section").offsetHeight
let currentSection = 1
let scrollerActive = false

window.addEventListener("scroll", () => { 
    if (currentSection === 1) navbar.classList.remove("bg")
    else navbar.classList.add("bg")
})

window.addEventListener("wheel", (e) => {
    if (scrollerActive) return
    scrollerActive = true

    scrollToNextSection(e, null)
    setActiveNavbarItem(null)

    // Prevent user from scrolling too fast to avoid scrolling past every section
    setTimeout(() => { 
        scrollerActive = false
    }, 250)
})

function scrollToNextSection(e, sectionId) {
    let scrollToY = 0

    // Fired from mousewheel event
    if (sectionId === null) {
        const shouldScrollDown = e.deltaY > 0 ? true : false
        if (shouldScrollDown && currentSection < totalSections) currentSection++
        else if (!shouldScrollDown && currentSection > 1) currentSection--

        scrollToY = sectionHeight * (currentSection - 1)
        if (currentSection === 1) scrollToY = 0
    }

    // Fired from click event
    else {
        scrollToY = sectionHeight * (sectionId)
        currentSection = sectionId + 1
        setActiveNavbarItem(e.target)
    }
    
    window.scrollTo({
        top: scrollToY,
        behavior: "smooth"
    })
}

function setActiveNavbarItem(target) {
    const currentActiveItem = document.querySelector(".navbar .active-item")
    const newActiveItem = target === null ? navbarItems[currentSection - 1] : target

    currentActiveItem.classList.remove("active-item")
    newActiveItem.classList.add("active-item")
}