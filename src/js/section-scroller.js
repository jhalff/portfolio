let totalSections = document.querySelectorAll("section").length
let sectionHeight = screen.height
let currentSection = 1

window.addEventListener("wheel", (e) => {
    const scrollDown = e.deltaY > 0 ? true : false

    if (scrollDown && currentSection < totalSections) currentSection++
    else if (!scrollDown && currentSection > 1) currentSection--
    
    let scrollToY = sectionHeight * (currentSection)
    if (currentSection === 1) scrollToY = 0

    window.scrollTo({
        top: scrollToY,
        behavior: "smooth"
    })
})