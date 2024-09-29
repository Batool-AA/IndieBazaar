import Slogan from "../../components/slogan/slogan.jsx";
import LoginForm from  "../../components/login-form/login-form.jsx";
import "./login-page.css"

function Login() {
    return (
        <div className="login-page-container">
            <div className="login-page-slogan-container">
                <Slogan />
            </div>
            <div className="login-page-form-container">
                <h1>IndieBazaar</h1>
                <LoginForm />
            </div>
        </div>
    )
}

export default Login;