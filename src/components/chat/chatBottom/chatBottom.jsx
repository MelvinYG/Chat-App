/* eslint-disable react/prop-types */
import { useState } from 'react';
import './chatBottom.css';
import EmojiPicker from 'emoji-picker-react';
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { database } from '../../../lib/firebase';
import { useChatStore } from '../../../lib/chatStore';
import { useUserStore } from '../../../lib/useStore';
import upload from '../../../lib/upload';

const ChatBottom = ({img, setImg}) => {
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);
    const [attachOpen, setAttachOpen] = useState(false);
    const { currentUser } = useUserStore();
    const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } = useChatStore();

    const imageHandler = (event) => {
        if (event.target.files[0]) {
            const file = event.target.files[0];
            const url = URL.createObjectURL(file);
            setImg({ file, url });
            console.log('Image selected:', file, url);
        }
    };

    const inputHandler = (event) => {
        setMessage(event.target.value);
    };

    const emojiHandler = () => {
        setOpen(prev => !prev);
    };

    const addEmojiHandler = (event) => {
        setMessage(prev => prev + event.emoji);
    };

    const attachHandler = () => {
        setAttachOpen(prev => !prev);
    };

    const handleMessageSent = async () => {
        if (message === "" && !img.file) return;

        let imgUrl = null;

        try {
            if (img.file) {
                console.log('Attempting to upload image:', img.file);
                setAttachOpen(false);
                imgUrl = await upload(img.file);
                console.log('Image uploaded successfully:', imgUrl);
            }

            await updateDoc(doc(database, "chats", chatId), {
                messages: arrayUnion({
                    senderId: currentUser,
                    message,
                    ...(imgUrl && { img: imgUrl }),
                    createdAt: new Date(),
                })
            });

            const userIds = [currentUser.id, user.id];

            for (const id of userIds) {
                const userChatsRef = doc(database, "userchats", id);
                const userChatsSnapshot = await getDoc(userChatsRef);

                if (userChatsSnapshot.exists()) {
                    const userChatsData = userChatsSnapshot.data();
                    const chatIndex = userChatsData.chats.findIndex(ele => ele.chatId === chatId);

                    if (chatIndex !== -1) {
                        userChatsData.chats[chatIndex].lastMessage = message;
                        userChatsData.chats[chatIndex].isSeen = id === currentUser.id ? true : false;
                        userChatsData.chats[chatIndex].updatedAt = Date.now();

                        await updateDoc(userChatsRef, {
                            chats: userChatsData.chats
                        });
                    }
                }
            }
        } catch (err) {
            console.error('Error sending message:', err);
        }

        setMessage("");
        setOpen(false);
        setImg({
            file: null,
            url: ""
        });
    };

    return (
        <>
            <div className="chat-bottom">
                <div className="emoji" >
                    <img src="./emoji.png" alt="" onClick={emojiHandler} className={isCurrentUserBlocked || isReceiverBlocked ? "disabled": ""}/>
                    <div className="picker">
                        <EmojiPicker open={open} onEmojiClick={addEmojiHandler}></EmojiPicker>
                    </div>
                </div>
                <div className="attachment-box" disabled={isCurrentUserBlocked || isReceiverBlocked}>
                    <img src="./attachment.png" alt="" onClick={attachHandler}  className={isCurrentUserBlocked || isReceiverBlocked ? "disabled": ""}/>
                    <div className='row' style={{ display: attachOpen === true ? 'flex' : 'none' }}>
                        <div className="col">
                            <label htmlFor="file" style={{ display: "flex", alignItems: "center", gap: 15 }}>
                                <img src="./photo.png" alt="" />
                                <p>Photos &amp; videos</p>
                            </label>
                            <input type="file" id="file" name="file" style={{ display: "none" }} onChange={imageHandler} />
                        </div>
                        <div className="col">
                            <img src="./camera.png" alt="" />
                            <p>Camera</p>
                        </div>
                        <div className="col">
                            <img src="./document.png" alt="" />
                            <p>Documents</p>
                        </div>
                    </div>
                </div>
                <input type="text" placeholder={isCurrentUserBlocked || isReceiverBlocked ? 'Un-block to start messaging' : 'Message'} value={message} onChange={inputHandler} disabled={isCurrentUserBlocked || isReceiverBlocked} />
                <img src={"./send.png"} alt="" onClick={handleMessageSent}  className={isCurrentUserBlocked || isReceiverBlocked ? "disabled": ""}/>
            </div>
        </>
    );
};

export default ChatBottom;