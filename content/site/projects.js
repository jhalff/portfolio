import { useState, useEffect } from "react"
import { API_URL } from "../../config"

export default function ProjectsSection() {
    const [items, setItems] = useState([])

    let isDown = false
    let startX
    let scrollLeft
    let slider

    useEffect(() => {
        fetchItems()
        slider = document.querySelector(".slider .items")
        slider.addEventListener("mousedown", start)
        slider.addEventListener("touchstart", start)
        slider.addEventListener("mousemove", move)
        slider.addEventListener("touchmove", move)
        slider.addEventListener("mouseleave", end)
        slider.addEventListener("mouseup", end)
        slider.addEventListener("touchend", end)
    }, [])

    async function fetchItems() {
        const response = await fetch(`${API_URL}/projects`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        })
    
        const results = await response.json()
        setItems(results)
    }

    const end = () => {
        isDown = false
        slider.classList.remove("active")
    }

    const start = (e) => {
        isDown = true
        slider.classList.add("active")
        startX = e.pageX || e.touches[0].pageX - slider.offsetLeft
        scrollLeft = slider.scrollLeft
    }

    const move = (e) => {
        if(!isDown) return

        e.preventDefault()
        const x = e.pageX || e.touches[0].pageX - slider.offsetLeft
        const dist = (x - startX)
        slider.scrollLeft = scrollLeft - dist
    }

    return (
        <>
            <section className="projects">
                <div className="container">
                    <div className="header">
                        <h3>Interested in what I make?</h3>
                        <h2>Projects</h2>
                        <div className="section-id"><span>02</span></div>
                    </div>
                    <div className="center-content">
                        <div className="slider">
                            <ul className="items">
                                { items.map((item) => {
                                    return (
                                        <li className="item" key={item.id} style={{background: `url('${item.thumbnail_url}')`}} onClick={(e) => {
                                            e.preventDefault()
                                            window.location.href = `/projects?id=${item.id}`
                                        }}>
                                            <div className="hover-info">
                                                <div className="center-content">
                                                    <div>
                                                        <b>{item.name}</b>
                                                        <p>{item.categories}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                }) }
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}