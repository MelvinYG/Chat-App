import './message.css';

const Message = (prop) => {
    const owns = prop.owns === "owner";
    const imgType = prop.type === 'img';

    return (
        <>
            <div className={owns ? 'message owns' : 'message'}>
                {!owns && (
                    <img src="./avatar.jpg" alt="" className='profile-pic' />
                )}
                {!imgType && (
                    <div className="texts">
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero magnam beatae blanditiis numquam ex tempore explicabo exercitationem modi est corrupti.</p>
                        <span>1 min ago</span>
                    </div>)
                }
                {imgType && (
                    <div className="shared-img">
                        <img src="./wallpaper-3.jpg" alt='' />
                    </div>
                )}
            </div>
        </>
    )
};

export default Message;