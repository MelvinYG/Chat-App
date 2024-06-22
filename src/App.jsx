import List from './components/list/list';
import Chat from './components/chat/chat';
import Detail from './components/detail/detail';
import Login from './components/login/login';
import Notification from './components/notification/notification';
import './index.css';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';
import { useUserStore } from './lib/useStore';
import { useChatStore } from './lib/chatStore';

function App() {

  const {currentUser, isLoading, fetchUserInfo} = useUserStore();
  const {chatId} = useChatStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });
    
    return () => {
      unSub();
    };
  }, [fetchUserInfo]);
  
   if(isLoading) return (
    <div className='loading'>
      Loading
    </div>
   )

  return (
    <>
      <div className='container'>
        {currentUser ?
          <>
            <List></List>
            {chatId && <Chat></Chat>}
            {chatId && <Detail></Detail>}
          </>
          :
          <Login></Login>
        }
      </div>
      <Notification></Notification>
    </>
  )
}

export default App
