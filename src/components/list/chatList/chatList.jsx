import { useEffect, useState } from 'react';
import './chatList.css';
import ChatItem from './chatItem/chatItem';
import { useUserStore } from '../../../lib/useStore';
import { doc, onSnapshot } from 'firebase/firestore';
import { database } from '../../../lib/firebase';

const ChatList = () => {

    const {currentUser} = useUserStore();
    const [chats,setChats] = useState([]);

    useEffect(() => {
        const unsub = onSnapshot(doc(database, "userchats", currentUser.id), (doc) => {
            setChats(doc.data());
        });

        return () => {
            unsub();
        }
    }, [currentUser.id]);

    const [addMode, setAddMobe] = useState(false);

    function addHandler(){
        setAddMobe(prev => !prev);
    }
    return (
        <>
            <div className='chat-list'>
                <div className="search">
                    <div className="search-bar">
                        <img src="./search.png" alt="" />
                        <input type="text" placeholder='Search' />
                    </div>
                    <img src={addMode ? "./minus.png" : "./plus.png"} onClick={addHandler} alt="" />
                </div>
                {/* List of recent chats */}
                <div className="recent-chats">
                    {chats.length>0 && chats.map((chat,index) => (
                        <ChatItem className="item" key={index} chat={chat}></ChatItem>
                    ))}
                </div>
            </div>
        </>
    )
};

export default ChatList;