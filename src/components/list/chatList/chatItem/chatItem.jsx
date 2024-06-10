/* eslint-disable react/prop-types */
import './chatItem.css'

const ChatItem = ({chat}) => {
    return (
        <>
            <div className='chat-item'>
                <img src={chat.user.avatar || "./avatar.jpg"} alt="" />
                <div className="texts">
                    <span className='user-name'>{chat.user.username}</span>
                    <p>{chat.lastMessage}</p>
                </div>
                <span className= 'notification'>99+</span>
            </div>
        </>
    )
};

export default ChatItem;