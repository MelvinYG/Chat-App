import { useState } from 'react';
import './chatList.css';
import ChatItem from './chatItem/chatItem';

const ChatList = () => {

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
                    <ChatItem className="item"></ChatItem>
                    <ChatItem className="item"></ChatItem>
                    <ChatItem className="item"></ChatItem>
                    <ChatItem className="item"></ChatItem>
                    <ChatItem className="item"></ChatItem>
                    <ChatItem className="item"></ChatItem>
                    <ChatItem className="item"></ChatItem>
                    <ChatItem className="item"></ChatItem>
                    <ChatItem className="item"></ChatItem>
                    <ChatItem className="item"></ChatItem>
                    <ChatItem className="item"></ChatItem>
                </div>
            </div>
        </>
    )
};

export default ChatList;