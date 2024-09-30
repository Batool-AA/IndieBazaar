import Slogan from "../../components/slogan/slogan.jsx";
import SignupForm from  "../../components/signup-form/signup-form.jsx";
import "./signup-page.css"

function Signup() {
    return (
        <div className="signup-page-container">
            <div className="signup-page-slogan-container">
                <Slogan />
            </div>
            <div className="signup-page-form-container">
                <h1>IndieBazaar</h1>
                <SignupForm />
            </div>
        </div>
    )
}

export default Signup;