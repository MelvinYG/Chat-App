import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './notification.css';

const Notification = () => {
    return (
        <>
            <div className="">
                <ToastContainer position='bottom-right' theme='dark'></ToastContainer>
            </div>
        </>
    )
};

export default Notification;