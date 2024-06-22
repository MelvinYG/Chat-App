import { useEffect, useState } from 'react';
import './chatList.css';
import ChatItem from './chatItem/chatItem';
import { useUserStore } from '../../../lib/useStore';
import { arrayUnion, collection, doc, getDoc, getDocs, onSnapshot, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { database } from '../../../lib/firebase';

const ChatList = () => {

    const { currentUser } = useUserStore();
    const [chats, setChats] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        const unsub = onSnapshot(doc(database, "userchats", currentUser.id), async (res) => {
            const items = res.data().chats;

            const promises = items.map(async (item) => {
                const userDocRef = doc(database, "users", item.receiverId);
                const userDocSnap = await getDoc(userDocRef);

                const user = userDocSnap.data();

                return { ...item, user };
            });

            const chatData = await Promise.all(promises);
            setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt)); // to sort the recent chants first 
        });

        return () => {
            unsub();
        }
    }, [currentUser.id]);

    // -------------------------- Above logic to update the userchat list -------------------------- //

    // -------------------------- Below logic for adding user ----------------------- //
    const [addMode, setAddMode] = useState(false);

    function addHandler() {
        setAddMode(prev => !prev);
    }

    const [user, setUser] = useState(null);

    const handleSearch = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const username = formData.get("username");
    
        try {
            const userRef = collection(database, "users");
            const q = query(userRef, where("username", "==", username));
            const querySnapshot = await getDocs(q); // Correct function for queries
    
            if (!querySnapshot.empty) {
                setUser(querySnapshot.docs[0].data()); // Assuming you only need the first match
            }
        } catch (err) {
            console.error("Error searching user:", err);
        }
    }

    

    // ------------------- Adding user to the chatlist -------------------------- //

    const addUserHandle = async () => {
        const chatRef = collection(database,"chats");
        const userChatsRef = collection(database, "userchats");

        try{
            const newChatRef = doc(chatRef); // created a newchat with user and current user

            await setDoc(newChatRef, {
                createdAt: serverTimestamp(),
                messages:[],
            });
            //  document update for user we are chatting with
            await updateDoc(doc(userChatsRef, user.id), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: "",
                    receiverId: currentUser.id,
                    updatedAt: Date.now(), 
                    // as we are already using a firebase method so cant use servertimestamp here
                })
            });

            await updateDoc(doc(userChatsRef, currentUser.id), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: "",
                    receiverId: user.id,
                    updatedAt: Date.now(),
                })
            });
            setAddMode(prev => !prev);

        }catch (err) {
            console.log(err);
        }
    }

    // Search filter

    const filteredChats = chats.filter((chat) => chat.user.username.toLowerCase().includes(searchInput.toLowerCase()));

    return (
        <>
            <div className='chat-list'>
                <div className="search">
                    <div className="search-bar">
                        <img src="./search.png" alt="" />
                        <input type="text" placeholder='Search' onChange={(event) => {setSearchInput(event.target.value)}}/>
                    </div>
                    <img src={addMode ? "./minus.png" : "./plus.png"} onClick={addHandler} alt="" />
                    {addMode ? (<div className="add-user-div">
                        <form className="search-user" onSubmit={handleSearch}>
                            <div className="search-field">
                                <input type="text" placeholder='Username' name='username' />
                            </div>
                            <button className='btn primary'>Search</button>
                        </form>
                        {user && (<div className="user-searchlist">
                            <div className="user-item">
                                <div className="user-details">
                                    <div className="img-container">
                                        <img src={user.avatar ||"./avatar.jpg"} alt="" />
                                    </div>
                                    <span>{user.username}</span>
                                </div>
                                <button className='btn add-btn primary' onClick={addUserHandle}>Add User</button>
                            </div>
                        </div> )}
                    </div>)  : <></>}
                </div>
                {/* List of recent chats */}
                <div className="recent-chats">
                    {filteredChats.length > 0 && filteredChats.map((chat, index) => (
                        <ChatItem className="item" key={index} chat={chat}></ChatItem>
                    ))}
                </div>
            </div>
        </>
    )
};

export default ChatList;