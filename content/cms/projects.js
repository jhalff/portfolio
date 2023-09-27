import { useState, useEffect } from "react"
import { API_URL } from "../../config"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretRight } from "@fortawesome/free-solid-svg-icons"

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
                            <div className="col-5 img" style={{ background: `url(${item.thumbnail_url})` }}></div>
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

    function DisplayItem(props) {
        const project = props.data

        return (
            <div className="display-item">
                <form>
                    <label>Name</label>
                    <input type="text" name="name" placeholder="Project Name" defaultValue={project !== undefined ? project.name : ""}/>
                    <label>Description</label>
                    <textarea name="description" defaultValue={project !== undefined ? project.description : ""}/>
                    <label>Categories</label>
                    <input type="text" name="categories" placeholder="HTML, CSS" defaultValue={project !== undefined ? project.categories : ""}/>
                    <label>Thumbnail</label>
                    <input type="file" name="thumbnail_file" accept=".png,.jpg"/>
                    <div className="thumbnail-preview" 
                        style={
                            project !== undefined ? 
                                { background: `url(${project.thumbnail_url})` } : {background: "url('/img/placeholder.png')"}
                        } onClick={(e) => { 
                            e.preventDefault()
                            changeImage("thumbnail")
                        }}>
                    </div>
                </form>
            </div>
        )
    }

    function changeImage(type) {
        const fileInput = document.querySelector(`.display-item input[name="${type}_file"]`)
        const filePreview = document.querySelector(`.display-item .${type}-preview`)
        fileInput.click()

        fileInput.addEventListener("change", (e) => {
            e.preventDefault()
            const selectedFile = fileInput.files[0]
            const previewImageUrl = URL.createObjectURL(selectedFile)
            filePreview.style.background = `url("${previewImageUrl}")`
        })
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
                    <DisplayItem data={data} />
                </section>
            </>
        )
    }
}