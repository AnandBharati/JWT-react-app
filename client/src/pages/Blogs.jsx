import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import refreshToken from '../helpers/refreshToken'

function Blogs({ setToken }) {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const [isDeleted, setIsDeleted] = useState(false)

  useEffect(() => {
    fetchAllBlogs();
  }, [, isDeleted])

  function fetchAllBlogs() {
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
        if (result.err) {
          refreshToken(fetchAllBlogs);
          setToken(localStorage.getItem('token'))
        }
        else
          setBlogs(result.blogs);
      })
      .catch((err) => console.warn('error occured', err))
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
      .then((result) => {
        if (result.err) {
          refreshToken(()=>deleteBlog(blog_id));
          setToken(localStorage.getItem('token'))
        }
        else
          setIsDeleted(!isDeleted)
      })
      .catch((err) => console.warn(err))
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