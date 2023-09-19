import { useState, useEffect } from "react"
import { API_URL } from "../config"

import Login from "../content/cms/login"
import Sidebar from "../content/cms/sidebar"
import Dashboard from "../content/cms/dashboard"
import Projects from "../content/cms/projects"

export default function Cms() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [currentContent, setCurrentContent] = useState("cms-dashboard")

    useEffect(() => {
        if (!loggedIn) {
            const cachedToken = sessionStorage.getItem("token")
            if (cachedToken !== null) loginWithCachedToken(cachedToken)
            else loginEventListener()
        }
        else {
            setCurrentContent(sessionStorage.getItem("cached-content") || "cms-dashboard")
            logoutEventListener()
            switchContentListener()
        }
    }, [loggedIn, currentContent])

    async function loginWithCachedToken(token) {
        const response = await fetch(`${API_URL}/login?token=${token}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        })

        const result = await response.json()
        if (result.username === undefined) return
        else setLoggedIn(true)
    }
    
    function loginEventListener() {
        const loginForm = window.document.querySelector(".login form")
    
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault()
    
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: document.querySelector("input[name='username']").value,
                    password: document.querySelector("input[name='password']").value
                })
            })
    
            const result = await response.json()
            if (result.user === undefined) return
            else {
                sessionStorage.setItem("token", result.user.token)
                setLoggedIn(true)
            }
        })
    }

    function logoutEventListener() {
        const logoutLink = window.document.querySelector("#logout-link")

        logoutLink.addEventListener("click", (e) => {
            e.preventDefault()
            sessionStorage.removeItem("token")
            setLoggedIn(false)
        })
    }

    function switchContentListener() {
        const links = window.document.querySelectorAll(".sidebar .item")
        links.forEach(link => {
            if (link.id === currentContent) link.classList.add("active")

            link.addEventListener("click", (e) => {
                e.preventDefault()
                setCurrentContent(link.id)
                sessionStorage.setItem("cached-content", link.id)
            })
        })
    }
    
    function Layout() {
        return (
            <>
                <div className="cms fluid-container full-height">
                    <div className="row full-height">
                        <div className="col-2 sidebar">
                            <Sidebar />
                        </div>
                        <div className="col-10 content">
                            { currentContent === "cms-dashboard" ? <Dashboard /> : "" }
                            { currentContent === "cms-projects" ? <Projects /> : "" }
                        </div>
                    </div>
                </div>
            </>
        )
    }

    if (loggedIn) return <Layout />
    else return <Login />
}
