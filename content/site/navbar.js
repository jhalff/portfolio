import { useState, useEffect } from "react"

export default function Navbar() {
    const [firstLoad, setFirstLoad] = useState(true)

    let navbar
    let navbarItems
    let totalSections
    let sectionHeight
    
    let currentSection = 0
    let scrollActive = false

    useEffect(() => {
        if (firstLoad) {
            setFirstLoad(false)

            navbar = document.querySelector(".navbar")
            navbarItems = document.querySelectorAll(".navbar ul li a")
            totalSections = document.querySelectorAll("section").length - 1
            sectionHeight = document.querySelector("section").offsetHeight
            
            for(let i = 0; i < navbarItems.length; i++) {
                navbarItems[i].addEventListener("click", () => {
                    currentSection = i
                    scrollToSection(i)
                })
            }

            window.addEventListener("wheel", (event) => handleWheelScroll(event))
            window.addEventListener("scrollend", () => scrollActive = false)

            const cachedSection = sessionStorage.getItem("current-section")
            if (cachedSection !== null) {
                currentSection = cachedSection
                scrollToSection(cachedSection)
            }
        }
    }, [])
    
    const handleWheelScroll = (event) => {
        if (scrollActive === true) return
        scrollActive = true

        const prevSection = currentSection
        const shouldScrollDown = event.deltaY > 0 ? true : false

        if (shouldScrollDown && currentSection < totalSections) currentSection = currentSection + 1
        else if (!shouldScrollDown && currentSection > 0) currentSection = currentSection - 1

        if (prevSection !== currentSection && currentSection < navbarItems.length) scrollToSection(currentSection)
        else scrollActive = false
    }

    function scrollToSection(id) {
        const scrollToY = sectionHeight * id
        const currentActiveItem = document.querySelector(".navbar ul li a.active-item")
        const newActiveItem = navbarItems[id]
        
        currentActiveItem.classList.remove("active-item")
        newActiveItem.classList.add("active-item")

        if (currentSection === 0) navbar.classList.remove("bg")
        else navbar.classList.add("bg")
        
        window.scrollTo({
            top: scrollToY,
            behavior: "smooth"
        })

        sessionStorage.setItem("current-section", id)
    }

    return (
        <>
            <div className="navbar">
                <ul>
                    <li><a className="active-item">Home</a></li>
                    <li><a>About</a></li>
                    <li><a>Projects</a></li>
                    <li><a className="call-to-action">Contact Me</a></li>
                </ul>
            </div>
        </>
    )
}