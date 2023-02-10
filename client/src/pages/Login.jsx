import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Login({ setToken }) {
  const [isError, setIsError] = useState(false)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const errorMsg = <div className="errorMsg">
    <p>Error while Login. try again</p>
    <button onClick={(e) => setIsError(false)}>Close</button>
  </div>

  function changeHandler(field, value) {
    setFormData({ ...formData, [field]: value });
  }

  function loginHandler() {
    // fetch('http://localhost:3000/auth/login', {
      fetch('https://sore-gray-oyster-coat.cyclic.app/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
        .then((resp) => resp.json())
        .then((result) => {
          console.log({result})
          localStorage.setItem('token', result.token);
          localStorage.setItem('refreshToken', result.refreshToken);
          localStorage.setItem('username', formData.username);
          setToken(result.token);
          navigate('/blogs');
        })
        .catch((err) => setIsError(true))
  }

  return (
    <div className='login'>
      {isError && errorMsg}

      <form action="POST">
        <h2>Login</h2>
        <input type="text"
          placeholder='username'
          value={formData.username}
          onChange={(e) => changeHandler('username', e.target.value)} />

        <input type="password"
          placeholder='password'
          value={formData.password}
          onChange={(e) => changeHandler('password', e.target.value)} />

        <input type="button" value="Login" onClick={(e) => loginHandler(e)} />
      </form>
    </div>
  )
}

export default Login