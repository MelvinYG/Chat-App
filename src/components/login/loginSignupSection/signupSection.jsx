import { useState } from 'react';
import './loginSignupSection.css';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth} from '/src/lib/firebase.js';

const SignupSection = () => {
    const [visiblePassword, setVisiblePassword] = useState(false);

    function passwordHandler() {
        setVisiblePassword(prev => !prev);
    }

    async function handleSignup (event){
        event.preventDefault();
        const formData = new FormData(event.target);

        const {username, email, password} = Object.fromEntries(formData);

        try{
            const res = await createUserWithEmailAndPassword(auth,email,password); 
            console.log(res);
        }catch(err){
            console.log(err);
            toast.error(err);
        }
    }

    return (
        <>
            <div className="login-section">
                <div className="login-container">
                    <h3>Create an User</h3>
                    <form onSubmit={handleSignup} className="input-container">
                        <input type="text" placeholder='Username' className='other-input' name='username'/>
                        <input type="email" placeholder='Email' className='other-input' name='email'/>
                        <div className="password-box">
                            <input type={visiblePassword ? "text" : "password"} placeholder='Password' name='password'/>
                            <img src={visiblePassword ? "./hide-eye.png" : "./eye.png"} alt="" onClick={passwordHandler} />
                        </div>
                        <button className='primary'>Sign-Up</button>
                    </form>
                </div>
            </div>
        </>
    )
};

export default SignupSection;