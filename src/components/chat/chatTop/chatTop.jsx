import './chatTop.css';

const ChatTop = () => {
    return (
        <>
            <div className="chat-top">
                <div className="user">
                    <img src="./avatar.jpg" alt="" />
                    <div className="user-text">
                        <h3>Melvin George</h3>
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