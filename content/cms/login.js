export default function Login() {
    return (
        <>
            <section className="login">
                <div className="animations-container">
                    <div className="stars"></div>
                    <div className="twinkling"></div>
                    <div className="clouds"></div>
                </div>
                <div className="center-content">
                    <div className="content">
                        <form>
                            <h1>Admin Login</h1>
                            <p>Username</p><input type="text" name="username" />
                            <p>Password </p><input type="password" name="password" /><br /><input type="submit" value="Login" />
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}