import ChatTop from './chatTop/chatTop';
import ChatCenter from './chatCenter/chatCenter';
import ChatBottom from './chatBottom/chatBottom';
import './chat.css';
import { useEffect, useRef } from 'react';

const Chat = () => {
    const endRef = useRef(null);

    useEffect(() =>{
        if (endRef.current) {
            endRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }, []);

    return (
        <>
            <div className="chat">
                <ChatTop></ChatTop>
                <ChatCenter reference={endRef}></ChatCenter>
                <ChatBottom></ChatBottom>
            </div>
        </>
    )
};

export default Chat;