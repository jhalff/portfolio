export default function Navbar() {
    return (
        <>
            <div className="navbar">
                <ul>
                    <li><a className="active-item" id="link-0" onClick="scrollToNextSection(event, 0)">Home</a></li>
                    <li><a id="link-1" onClick="scrollToNextSection(event, 1)">About</a></li>
                    <li><a id="link-2" onClick="scrollToNextSection(event, 2)">Projects</a></li>
                    <li><a className="call-to-action" id="link-3" onClick="scrollToNextSection(event, 3)">Contact Me</a></li>
                </ul>
            </div>
        </>
    )
}