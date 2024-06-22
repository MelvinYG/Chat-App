import { useChatStore } from '../../../lib/chatStore';
import './chatCenter.css';
import Message from './message/message';

const ChatCenter = (prop) => {
    const chat = prop.chat;
    const img = prop.img;
    const reference = prop.reference

    const {isCurrentUserBlocked, isReceiverBlocked} = useChatStore();

    return (
        <>
            <div className='chat-center'>
                {!isReceiverBlocked && chat?.messages?.map((message, index) => (
                    <Message message={message} key={index} img={img}></Message>
                ))
                }
                {img.url && (
                    <div className='message owns'>
                        <div className="shared-img">
                            <img src={img.url} alt='' />
                        </div>
                    </div>
                )}
                <div ref={reference}></div>
            </div>
        </>
    )
};

export default ChatCenter;