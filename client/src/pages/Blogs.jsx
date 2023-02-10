import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';

function Blogs({ setToken }) {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const [isDeleted, setIsDeleted] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token');
    // fetch('http://localhost:3000/auth/blogs', {
    fetch('https://sore-gray-oyster-coat.cyclic.app/blogs/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      }
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result.err)
          refreshToken();
        else
          setBlogs(result.blogs);
      })
      .catch((err) => console.log('error occured', err))
  }, [, isDeleted])

  function refreshToken() {
    const _refreshToken = localStorage.getItem('refreshToken');
    fetch('https://sore-gray-oyster-coat.cyclic.app/auth/refreshtoken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${_refreshToken}`
      },
      body: JSON.stringify({username: localStorage.getItem('username')})
    })
      .then((resp) => {
        console.log({resp})
        return resp.json()
      })
      .then((result) => {
        console.log({result})
        setToken(result.token)
        localStorage.setItem('token', result.token);
      })
      .catch((err) => console.log(err))
  }

  function deleteBlog(blog_id) {
    //fetch operation for delete
    const token = localStorage.getItem('token');
    fetch('https://sore-gray-oyster-coat.cyclic.app/blogs/delete/' + blog_id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      }
    })
      .then((resp) => resp.json())
      .then((result) => setIsDeleted(!isDeleted))
      .catch((err) => console.log(err))
  }

  return (
    <div className='blogs'>
      <h1>Blogs</h1>
      {blogs?.map((blog, i) =>
        <div className="blog" key={i}>
          <h4>{blog.title} <span onClick={() => deleteBlog(blog._id)}>X</span></h4>
          <span className='desc'>{blog.desc}</span>
          <span className="blogfooter">
            <i>created on: {blog.createdOn}</i>
            <i>created by: {blog.createdBy}</i>
          </span>
        </div>
      )}

      <div className='button-container' style={{ display: 'flex', marginTop: '30px' }}>
        <Link to={'/newblog'}><button> Add New Blog </button></Link>
      </div>

    </div>
  )
}

export default Blogs