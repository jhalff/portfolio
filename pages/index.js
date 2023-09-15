import Navbar from "../content/site/navbar"
import HomeSection from "../content/site/home"
import AboutSection from "../content/site/about"
import ProjectsSection from "../content/site/projects"
import ContactSection from "../content/site/contact"

export default function Index() {
    return (
        <>
            <div className="fluid-container">
                <Navbar />
                <HomeSection />
                <AboutSection />
                <ProjectsSection />
                <ContactSection />
            </div>
        </>
    )
}