import { useState } from 'react';
import './chatBottom.css';
import EmojiPicker from 'emoji-picker-react';

const ChatBottom = () => {
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);
    const [attachOpen, setAttachOpen] = useState(false);

    function inputHandler(event) {
        setMessage(event.target.value);
    }

    function emojiHandler() {
        setOpen(prev => !prev);
    }

    function addEmojiHandler(event) {
        setMessage(prev => prev + event.emoji);
    }

    function attachHandler() {
        setAttachOpen(prev => !prev);
    }

    return (
        <>
            <div className="chat-bottom">
                <div className="emoji">
                    <img src="./emoji.png" alt="" onClick={emojiHandler} />
                    <div className="picker">
                        <EmojiPicker open={open} onEmojiClick={addEmojiHandler}></EmojiPicker>
                    </div>
                </div>
                <div className="attachment-box">
                    <img src="./attachment.png" alt="" onClick={attachHandler} />
                    <div className='row' style={{ display: attachOpen === true ? 'flex' : 'none' }}>
                        <div className="col">
                            <img src="./photo.png" alt="" />
                            <p>Photos &amp; videos</p>
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
                <input type="text" placeholder='Message' value={message} onChange={inputHandler} />

                <img src={message === "" ? "./microphone.png" : "./send.png"} alt="" />
            </div>
        </>
    )
};

export default ChatBottom;