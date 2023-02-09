import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

function Blogs({setToken}) {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:3000/auth/blogs', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      }
    })
      .then((resp) => resp.json())
      .then((result) => setBlogs(result.blogs))
      .catch((err) => console.log(err))
  }, [])

  function LogOffHandler(e) {
    localStorage.setItem('token', '');
    setToken('')
    navigate('/login')
  }


  return (
    <div className='blogs'>
      <h1>Blogs</h1>
      {blogs?.map((blog, i) =>
        <div className="blog" key={i}>
          <h4>{blog.title}</h4>
          <span className='desc'>{blog.desc}</span>
          <i>{blog.createdBy}</i>
        </div>
      )}

      <button type='button' onClick={(e) => LogOffHandler()}>Log off</button>
    </div>
  )
}

export default Blogs