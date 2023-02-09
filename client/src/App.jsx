import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Blogs from './pages/Blogs'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'


function App() {

  const [token,setToken] = useState(localStorage.getItem('token'))


  return (
    <div className="App">
      <Routes>
        <Route path='/signup' element={token==='' ? <SignUp /> :<Blogs setToken={setToken}/>} />
        <Route path='/login' element={token==='' ? <Login setToken={setToken}/> :<Blogs setToken={setToken}/>} />
        <Route path='/blogs' element={token!=='' ? <Blogs setToken={setToken}/> :<Home/>} />
        <Route path='/' element={<Home />} />
        <Route path='*' element={<h1> Error Occured </h1>} />
      </Routes>
    </div>
  )
}

export default App
