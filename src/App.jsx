import List from './components/list/list';
import Chat from './components/chat/chat';
import Detail from './components/detail/detail';
import Login from './components/login/login';
import './index.css';

function App() {

  const user = false;

  return (
    <>
      <div className='container'>
        {user ?
          <>
            <List></List>
            <Chat></Chat>
            <Detail></Detail>
          </>
          :
          <Login></Login>
        }
      </div>
    </>
  )
}

export default App
