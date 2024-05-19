import { useState } from 'react';
import './loginSignupSection.css';
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../lib/firebase';

const LoginSection = () => {
    const [visiblePassword, setVisiblePassword] = useState(false);

    function passwordHandler() {
        setVisiblePassword(prev => !prev);
    }

    async function handleLogin(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const { email, password } = Object.fromEntries(formData);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.success("Logged-In successfully");
        } catch (err) {
            console.log(err.message);
            toast.error(err.message);
        }
    }

    return (
        <>
            <div className="login-section border-box">
                <div className="login-container">
                    <h3>Welcome back</h3>
                    <form onSubmit={handleLogin} className="input-container">
                        <input type="email" name='email' placeholder='Email' className='other-input' />
                        <div className="password-box">
                            <input type={visiblePassword ? "text" : "password"} name='password' placeholder='Password' />
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