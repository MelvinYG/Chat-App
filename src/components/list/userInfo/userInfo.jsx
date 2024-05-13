import './userInfo.css'

const UserInfo = () => {
    return (
        <>
            <div className="user-info">
                <div className="user-wrapper">
                    <img src="./avatar.jpg" alt="" />
                    <div className="info">
                        <p>John Doe</p>
                        <span>Lorem ipsum dolor sit.</span>
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