import './detail.css'
import Options from './options/options';

const Detail = () => {
    return (
        <>
            <div className="detail">
                <div className="detail-top">
                    <img src="./avatar.jpg" alt="" />
                    <h3>Melvin George</h3>
                    <p>Lorem ipsum dolor sit amet.</p>
                </div>
                <div className="detail-options">
                    <Options value={"Chat settings"} icon="./setting.png"></Options>
                    <Options value={"Privacy & Help"} icon="./privacy.png"></Options>
                    <Options value={"Shared media"} icon="./photo.png"></Options>
                    <Options value={"Shared Files"} icon="./document.png"></Options>
                    <div className='detail-bottom'>
                        <button className='danger'>Block User</button>
                        <button className='primary'>Logout</button>
                    </div>
                </div>
            </div >
        </>
    )
};

export default Detail;