import UserInfo from './userInfo/userInfo';
import ChatList from './chatList/chatList';
import './list.css';

const List = () =>{
    return (
        <>
        <div className="list">
            <UserInfo />
            <ChatList></ChatList>
        </div>
        </>
    )
};

export default List;