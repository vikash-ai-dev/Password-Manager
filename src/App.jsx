import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import Manager from './Components/Manager'
import PasswordList from './Components/PasswordList'
import Footer from './Components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [refresh, setRefresh] = useState(0);
  const [editPassword, setEditPassword] = useState(null)


  return (
    <div className='min-h-screen flex flex-col'>

      <Navbar />
      <main className='flex-1'>

        <Manager
          editPassword={editPassword}
          onCancelEdit={() => { setEditPassword(null) }}
          onPasswordAdded={() => setRefresh(refresh + 1)} />

      </main>

      <PasswordList
        onEdit={setEditPassword}
        refresh={refresh} />

      <Footer />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark" />

    </div>
  )
}

export default App
