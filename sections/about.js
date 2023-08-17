export default function AboutSection() {
    return (
        <>
            <section className="about">
                <div className="container">
                    <div className="center-content">
                        <div className="row">
                            <div className="col image">
                                <div className="frame"></div>
                            </div>
                            <div className="col content">
                                <div className="header">
                                    <h3>Discover </h3>
                                    <h2>About Me</h2>
                                    <div className="section-id"><span>01</span></div>
                                </div>
                                <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus porta est elit, a ultrices sapien semper vitae.
                                    Suspendisse potenti. Nullam non ex felis. Donec vestibulum vel mauris eget aliquet. Proin ultrices, elit sit amet
                                    ullamcorper pellentesque, est nisi ultrices risus, sit amet sollicitudin magna ligula nec sem.</p>
                                <div className="row details">
                                    <div className="col">
                                        <ul>
                                            <li> <b>Age: </b>21</li>
                                            <li> <b>Name: </b>Jelmer Halff</li>
                                            <li> <b>Experience: </b>5 years of education</li>
                                            <li> <b>Location: </b>The Netherlands</li>
                                        </ul>
                                    </div>
                                    <div className="col">
                                        <ul>
                                            <li> <a href="https://github.com/jhalff" target="_blank"> <i className="fa-brands fa-github"></i>github.com/jhalff</a></li>
                                            <li> <a href="https://www.linkedin.com/in/jhalff/" target="_blank"> <i className="fa-brands fa-linkedin-in"></i>linkedin.com/in/jhalff</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <button>Download CV</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}