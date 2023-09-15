import Sidebar from "../content/cms/sidebar"
import Dashboard from "../content/cms/dashboard"

export default function Cms() {
    return (
        <>
            <div className="cms fluid-container full-height">
                <div className="row full-height">
                    <div className="col-2 sidebar">
                        <Sidebar />
                    </div>
                    <div className="col-10 content">
                        <Dashboard />
                    </div>
                </div>
            </div>
        </>
    )
}