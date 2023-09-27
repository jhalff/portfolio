import { useState, useEffect } from "react"
import { API_URL } from "../config"

export default function Projects() {
    const [data, setData] = useState({})

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        const id = window.location.search.replace("?id=", "")
        const response = await fetch(`${API_URL}/projects?id=${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        })
    
        const data = await response.json()
        setData(data)
    }

    return (
        <>
            <div className="container project-view">
                <div className="back">
                    <a href="/">Back</a>
                </div>
                <div className="row">
                    <div className="col-7">
                        <img src={data.thumbnail_url}></img>
                    </div>
                    <div className="col-5">
                        <div className="header">
                            <h2>{data.name}</h2>
                        </div>
                        <h4>{data.categories}</h4>
                        <p>{data.description}</p>
                    </div>
                </div>
            </div>
        </>
    )
}