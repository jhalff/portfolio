import Navbar from '../components/navbar'

import HomeSection from '../sections/home'
import AboutSection from '../sections/about'
import ProjectsSection from '../sections/projects'
import ContactSection from '../sections/contact'

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