import LoginSection from './loginSignupSection/loginSection';
import SignupSection from './loginSignupSection/signupSection';
import './login.css';

const Login = () => {
    return (
        <>
            <div className="login">
                <LoginSection></LoginSection>
                <SignupSection></SignupSection>
            </div>
        </>
    )
};

export default Login;