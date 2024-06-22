import { useChatStore } from '../../../lib/chatStore';
import './chatTop.css';

const ChatTop = () => {
    
    const { user } = useChatStore();
    return (
        <>
            <div className="chat-top">
                <div className="user">
                    <img src={user?.avatar || "./avatar.jpg"} alt="" />
                    <div className="user-text">
                        <h3>{user?.username}</h3>
                        <p>Lorem, ipsum dolor wfaf qfdfqwrqew</p>
                    </div>
                </div>
                <div className="options">
                    <img src="./call.png" alt="" />
                    <img src="./video.png" alt="" />
                    <img src="./info.png" alt="" />
                </div>
            </div>
        </>
    )
};

export default ChatTop;