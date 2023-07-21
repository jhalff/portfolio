let totalSections = document.querySelectorAll("section").length - 1
let sectionHeight = screen.height
let currentSection = 0

window.addEventListener("wheel", (e) => {
    const scrollDown = e.deltaY > 0 ? true : false

    if (scrollDown && currentSection < totalSections) currentSection++
    else if (!scrollDown && currentSection > 0) currentSection--
    
    let scrollToY = sectionHeight * (currentSection + 1)
    if (currentSection === 0) scrollToY = 0

    window.scrollTo({
        top: scrollToY,
        behavior: "smooth"
    })
})