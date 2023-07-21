let totalSections = document.querySelectorAll("section").length
let sectionHeight = document.querySelector("section").offsetHeight
let currentSection = 1
let scrollerActive = false

window.addEventListener("wheel", (e) => {
    if (scrollerActive) return

    scrollerActive = true
    const scrollDown = e.deltaY > 0 ? true : false

    if (scrollDown && currentSection < totalSections) currentSection++
    else if (!scrollDown && currentSection > 1) currentSection--
    
    let scrollToY = sectionHeight * (currentSection - 1)
    if (currentSection === 1) scrollToY = 0
    
    window.scrollTo({
        top: scrollToY,
        behavior: "smooth"
    })

    setTimeout(() => { 
        scrollerActive = false
    }, 250)
})