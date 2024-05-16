import './chatCenter.css';
import Message from './message/message';

const ChatCenter = (prop) => {
    return (
        <>
            <div className='chat-center'>
                <Message owns={'owner'} type={'text'}></Message>
                <Message type={'text'}></Message>
                <Message owns={'owner'} type={'text'}></Message>
                <Message type={'text'}></Message>
                <Message  type={'img'}></Message>
                <Message owns={'owner'} type={'text'}></Message>
                <Message owns={'owner'} type={'text'}></Message>
                <Message></Message>
                <div ref={prop.reference}></div>
            </div>
        </>
    )
};

export default ChatCenter;