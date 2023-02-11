import { useEffect, useState } from 'react'
import { Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import AddBlog from './pages/AddBlog'
import Blogs from './pages/Blogs'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'


function App() {
  const navigate = useNavigate()
  const [token, setToken] = useState(localStorage.getItem('token') ?? '');
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken'));
  // const [userInfo, setUserInfo] = useState({ username: '' });

  function logoutHandler(e) {
    const username = localStorage.getItem('username');

    fetch('https://sore-gray-oyster-coat.cyclic.app/auth/logout', {
      method: 'post',
      headers: {
        authorization: `Bearer ${refreshToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username })
    })
      .then((resp) => resp.json())
      .then((result) => {
        localStorage.setItem('token', '');
        localStorage.setItem('username', '');
        setToken('');
        setRefreshToken('');
        navigate('/login')
      })
      .catch((error) => {
        
        navigate('/login')
      })
  }

  return (
    <div className="App">
      <nav>
        <ul>
          {!token && <>
            <li>
              <NavLink to='/signup'
                className={({ isActive }) => isActive ? 'nav-active' : undefined}>
                Signup
              </NavLink>
            </li>
            <li>
              <NavLink to='/login' className={({ isActive }) => isActive ? 'nav-active' : undefined}>
                Login
              </NavLink>
            </li>
          </>}
          {token && <>
            <li>
              <NavLink to='/blogs' className={({ isActive }) => isActive ? 'nav-active' : undefined}>
                All blogs
              </NavLink>
            </li>
            <li>
              <NavLink to='/newblog' className={({ isActive }) => isActive ? 'nav-active' : undefined}>
                Create new
              </NavLink>
            </li>
            <li onClick={logoutHandler}>
              <NavLink to='/' className={({ isActive }) => isActive ? 'nav-active' : undefined}              >
                log Off
              </NavLink>
            </li>
          </>
          }
        </ul>
      </nav>

      <Routes>
        <Route path='/signup' element={token === '' ? <SignUp /> : <Blogs setToken={setToken} />} />
        <Route path='/login' element={token === '' ? <Login setToken={setToken} setRefreshToken={setRefreshToken} /> : <Blogs setToken={setToken} />} />
        <Route path='/blogs' element={token !== '' ? <Blogs setToken={setToken} /> : <Home />} />
        <Route path='/newblog' element={token !== '' ? <AddBlog setToken={setToken} /> : <Home />} />
        <Route path='/' element={<Home />} />
        <Route path='*' element={<h1> Error Occured </h1>} />
      </Routes>
    </div>
  )
}

export default App
