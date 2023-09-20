import { useState, useEffect } from "react"
import { API_URL } from "../../config"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'

export default function Projects() {
    const [items, setItems] = useState([])
    const [activeItem, setActiveItem] = useState(null)

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

    function ItemList() {
        return (
            <div className="item-list">
                { items.map((item) => {
                    return (
                        <div className="row item" key={item.id} onClick={(e) => {
                            e.preventDefault()
                            setActiveItem(item.id)
                        }}>
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
        )
    }

    function Item(data) {
        return (
            <div className="row item">
                
            </div>
        )
    }

    if (activeItem === null) {
        return(
            <>
                <section>
                    <div className="row header">
                        <div className="col-6">
                            <h2>Projects</h2>
                        </div>
                        <div className="col-6">
                            <button onClick={(e) => {
                                e.preventDefault()
                                setActiveItem(0)
                            }}>New</button>
                        </div>
                    </div>
                    <ItemList />
                </section>
            </>
        )
    }
    else {
        const data = items[activeItem - 1]

        return (
            <>
                <section>
                    <div className="row header">
                        <div className="col-6">
                            <h2>
                                Projects <span className="divider"><FontAwesomeIcon icon={faCaretRight} /></span>
                                <span>{ activeItem > 0 ? ` ${data.name}` : " New" }</span>
                            </h2>
                        </div>
                        <div className="col-6">
                            <button onClick={(e) => {
                                e.preventDefault()
                                setActiveItem(null)
                            }}>Cancel</button>
                        </div>
                    </div>
                    <Item data={data} />
                </section>
            </>
        )
    }
}