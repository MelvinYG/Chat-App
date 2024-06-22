import { useUserStore } from '../../../../lib/useStore';
import './message.css';

const Message = (prop) => {

    const {currentUser} = useUserStore();
    const img = prop.img;
    const message = prop.message;
    const owns = message.senderId.id === currentUser.id ? true: false;
    const imgType = message.img ? true : false;

    return (
        <>
            <div className={owns ? 'message owns' : 'message'}>
                {!owns && (
                    <img src={message.senderId.avatar || "./avatar.jpg"} alt="" className='profile-pic' />
                )}
                {!imgType && (
                    <div className="texts">
                        <p>{message.message}</p>
                        {/* <span>{message}</span> */}
                    </div>)
                }
                {imgType && (
                    <div className="shared-img">
                        <img src={message.img} alt='' />
                    </div>
                )}
            </div>
        </>
    )
};

export default Message;