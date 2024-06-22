import ChatTop from './chatTop/chatTop';
import ChatCenter from './chatCenter/chatCenter';
import ChatBottom from './chatBottom/chatBottom';
import './chat.css';
import { useEffect, useRef, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { database } from '../../lib/firebase';
import { useChatStore } from '../../lib/chatStore';



const Chat = () => {
    const endRef = useRef(null);
    const [chat,setChat] = useState();
    const {chatId} = useChatStore();
    const [img, setImg] = useState({
        file: null,
        url: ""
    });

    useEffect(() =>{
        if (endRef.current) {
            endRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }, []);

    useEffect(() => {
        const unSub = onSnapshot(doc(database, "chats", chatId), (res) => {
            setChat(res.data());
        });

        return () => {
            unSub();
        };
    },[chatId]);

    return (
        <>
            <div className="chat">
                <ChatTop ></ChatTop>
                <ChatCenter chat={chat} img={img}></ChatCenter>
                <div ref={endRef}></div>
                <ChatBottom img={img} setImg={setImg}></ChatBottom>
            </div>
        </>
    )
};

export default Chat;