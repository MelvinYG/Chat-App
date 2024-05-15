import ChatTop from './chatTop/chatTop';
import ChatCenter from './chatCenter/chatCenter';
import ChatBottom from './chatBottom/chatBottom';
import './chat.css';

const Chat = () => {
    return (
        <>
            <div className="chat">
                <ChatTop></ChatTop>
                <ChatCenter></ChatCenter>
                <ChatBottom></ChatBottom>
            </div>
        </>
    )
};

export default Chat;