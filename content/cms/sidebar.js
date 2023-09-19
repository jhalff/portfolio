import { logout } from "../../pages/cms"

export default function Sidebar() {
    return (
        <>
            <ul>
                <li className="title">
                    <p>CMS</p>
                    <a id="logout-link">Logout</a>
                </li>
                <li className="category">
                    <p>Main</p>
                </li>
                <li className="item">
                    <a>Dashboard</a>
                </li>
                <li className="category">
                    <p>Content</p>
                </li>
                <li className="item">
                    <a>Projects</a>
                </li>
            </ul>
        </>
    )
}