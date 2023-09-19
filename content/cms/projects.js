import { useState, useEffect } from "react"
import { API_URL } from "../../config"

export default function Projects() {
    const [items, setItems] = useState([])

    useEffect(() => {
        fetchItems()
    }, [])

    async function fetchItems() {
        const response = await fetch(`${API_URL}/projects`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        })
    
        const results = await response.json()
        setItems(results)
    }

    return (
        <>
            <section>
                <div className="row header">
                    <div className="col-6">
                        <h2>Projects</h2>
                    </div>
                    <div className="col-6">
                        <button>New</button>
                    </div>
                </div>
                <div className="items">
                    { items.map((item) => {
                        return (
                            <div className="row item">
                                <div className="col-5 img" style={{ background: `url(${item.primary_image_url})` }}></div>
                                <div className="col-7 preview">
                                    <h2>{item.name}</h2>
                                    <p>{item.categories}</p>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        )
                    }) }
                </div>
            </section>
        </>
    )
}