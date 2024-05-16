import { useState } from 'react';
import './loginSignupSection.css';

const LoginSection = () => {
    const [visiblePassword, setVisiblePassword] = useState(false);

    function passwordHandler() {
        setVisiblePassword(prev => !prev);
    }

    return (
        <>
            <div className="login-section border-box">
                <div className="login-container">
                    <h3>Welcome back</h3>
                    <form action="apple.html" className="input-container">
                        <input type="email" placeholder='Email' className='other-input' />
                        <div className="password-box">
                            <input type={visiblePassword ? "text" : "password"} placeholder='Password' />
                            <img src={visiblePassword ? "./hide-eye.png" : "./eye.png"} alt="" onClick={passwordHandler} />
                        </div>
                        <button className='primary'>Log-In</button>
                    </form>
                </div>
            </div>
        </>
    )
};

export default LoginSection;