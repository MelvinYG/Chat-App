import './chatItem.css'

const ChatItem = () => {
    return (
        <>
            <div className='chat-item'>
                <img src="./avatar.jpg" alt="" />
                <div className="texts">
                    <span className='user-name'>Melvin George</span>
                    <p>Hey there !!</p>
                </div>
                <span className= 'notification'>99+</span>
            </div>
        </>
    )
};

export default ChatItem;