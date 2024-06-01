import { useUserStore } from '../../../lib/useStore';
import './userInfo.css'

const UserInfo = () => {
    const {currentUser} = useUserStore();
    return (
        <>
            <div className="user-info">
                <div className="user-wrapper">
                    <img src={currentUser.avatar || "./avatar.jpg"} alt="" />
                    <div className="info">
                        <p>{currentUser.username}</p>
                    </div>
                </div>
                <div className="icons">
                    <img src="./more.png" alt="" />
                    <img src="./video.png" alt="" />
                    <img src="./edit.png" alt="" />
                </div>
            </div>
        </>
    )
};

export default UserInfo;