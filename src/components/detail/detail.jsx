import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { useChatStore } from '../../lib/chatStore';
import { auth, database } from '../../lib/firebase';
import { useUserStore } from '../../lib/useStore';
import './detail.css'
import Options from './options/options';

const Detail = () => {

    const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } = useChatStore();
    const { currentUser } = useUserStore();

    const handleBlock = async () => {
        if(!user) return;

        const userDocRef = doc(database, "users", currentUser.id);

        try{
            await updateDoc(userDocRef,{
                blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id)
            });
            changeBlock();
            console.log("Chanegs");
        }catch(err){
            console.log(err);
        }
    }
    return (
        <>
            <div className="detail">
                <div className="detail-top">
                    <img src={user?.avatar || "./avatar.jpg"} alt="" />
                    <h3>{user?.username}</h3>
                    <p>Lorem ipsum dolor sit amet.</p>
                </div>
                <div className="detail-options">
                    <Options value={"Chat settings"} icon="./setting.png"></Options>
                    <Options value={"Privacy & Help"} icon="./privacy.png"></Options>
                    <Options value={"Shared media"} icon="./photo.png"></Options>
                    <Options value={"Shared Files"} icon="./document.png"></Options>
                    <div className='detail-bottom'>
                        <button className='danger' onClick={handleBlock}>{isReceiverBlocked ? "Un-block User" : "Block User"}</button>
                        <button className='primary' onClick={() => auth.signOut()}>Logout</button>
                    </div>
                </div>
            </div >
        </>
    )
};

export default Detail;