/* eslint-disable react/prop-types */
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useChatStore } from '../../../../lib/chatStore';
import './chatItem.css'
import { database } from '../../../../lib/firebase';
import { useUserStore } from '../../../../lib/useStore';

const ChatItem = ({ chat }) => {
    const { changeChat } = useChatStore();
    const { currentUser } = useUserStore();

    const handleChatOpen = async (chat) => {

        try {
            const userChatsRef = doc(database, "userchats", currentUser.id);
            const userChatsSnapshot = await getDoc(userChatsRef);

            if (userChatsSnapshot.exists()) {
                const userChatsData = userChatsSnapshot.data();

                const chatIndex = userChatsData.chats.findIndex(ele => ele.chatId === chat.chatId);

                userChatsData.chats[chatIndex].isSeen = true;

                await updateDoc(userChatsRef, {
                    chats: userChatsData.chats
                });
            }

            changeChat(chat.chatId, chat.user);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            <div className='chat-item' onClick={() => handleChatOpen(chat)}>
                <img src={chat.user.blocked.includes(currentUser.id) ? "./avatar.jpg" : chat.user.avatar || "./avatar.jpg"} alt="" />
                <div className="texts">
                    <span className='user-name'>{chat.user.blocked.includes(currentUser.id) ? "User" : chat.user.username}</span>
                    <p>{chat.lastMessage}</p>
                </div>
                {!chat.isSeen && <span className='notification'></span>}
            </div>
        </>
    )
};

export default ChatItem;