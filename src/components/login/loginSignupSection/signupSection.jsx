import { useState } from 'react';
import './loginSignupSection.css';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore";
import { auth, database } from '../../../lib/firebase';
import upload from '../../../lib/upload';

const SignupSection = () => {
    const [visiblePassword, setVisiblePassword] = useState(false);
    const [avatar, setAvatar] = useState({
        file: null,
        url: ""
    })

    // for form status => to be updated to useFormStatus hook from React 19
    const [loading, setLoading] = useState(false);

    function passwordHandler() {
        setVisiblePassword(prev => !prev);
    }

    function avatarHandler(event) {
        if (event.target.files[0]) {
            setAvatar({
                file: event.target.files[0],
                url: URL.createObjectURL(event.target.files[0])
            })
        }
    }

    async function handleSignup(event) {
        event.preventDefault();
        setLoading(true);
        const formData = new FormData(event.target);

        const { username, email, password } = Object.fromEntries(formData);

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);

            const imgURL = await upload(avatar.file);

            // Add a new document in collection "users" and then to chats
            await setDoc(doc(database, "users", res.user.uid), {
                username,
                email,
                avatar: imgURL,
                id: res.user.uid,
                blocked: []
            });

            await setDoc(doc(database, "userchats", res.user.uid), {
                chats: []
            });

            toast.success("SignUp successful");
        } catch (err) {
            toast.error(err.message);
        }finally{
            setLoading(false);
        }
    }

    return (
        <>
            <div className="login-section">
                <div className="login-container">
                    <h3>Create an User</h3>
                    <form onSubmit={handleSignup} className="input-container">
                        <label htmlFor="file">
                            <img src={avatar.url || './avatar.jpg'} alt="" />
                            Upload an image</label>
                        <input type="file" name="file" id="file" style={{ display: "none" }} onChange={avatarHandler} />
                        <input type="text" placeholder='Username' className='other-input' name='username' />
                        <input type="email" placeholder='Email' className='other-input' name='email' />
                        <div className="password-box">
                            <input type={visiblePassword ? "text" : "password"} placeholder='Password' name='password' />
                            <img src={visiblePassword ? "./hide-eye.png" : "./eye.png"} alt="" onClick={passwordHandler} />
                        </div>
                        <button className='primary' disabled={loading}>{loading ? "Loading" : "Sign-Up"}</button>
                    </form>
                </div>
            </div>
        </>
    )
};

export default SignupSection;