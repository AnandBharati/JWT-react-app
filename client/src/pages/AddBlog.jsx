import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import domain from '../helpers/ApiDomain'
import refreshToken from '../helpers/refreshToken'

function AddBlog({setToken}) {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        title: '',
        desc: '',
        createdBy: localStorage.getItem('username'),
        createdOn: '',
    })

    function changeHandler(field, value) {
        setFormData({ ...formData, [field]: value })
    }

    function SubmitHandler() {
        const token = localStorage.getItem('token');
        localStorage.getItem('username') &&
            fetch(domain+'/blogs/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`
                },
                body: JSON.stringify({...formData, createdOn: Date.now()})
            })
                .then((res) => res.json())
                .then((result) => {
                    if (result.err) {
                        refreshToken(SubmitHandler);
                        setToken(localStorage.getItem('token'))
                    }
                    else
                        navigate('/blogs')
                })
                 .catch((err) => console.warn(err))
    }

    return (
        <div className='addBlog'>
            <form action="POST">
                <h2>Add Blog</h2>
                <input type="text"
                    placeholder='Enter title'
                    value={formData.title}
                    onChange={(e) => changeHandler('title', e.target.value)} />

                <textarea type="text"
                    placeholder='Enter description'
                    value={formData.desc}
                    onChange={(e) => changeHandler('desc', e.target.value)} />

                <p>createdBy: {localStorage.getItem('username')} </p>



                <div className='button-container' style={{ display: 'flex', marginTop: '30px' }}>
                    <button type='button' onClick={SubmitHandler}>Submit</button>
                    <Link to={'/blogs'}><button> View all Blogs </button></Link>
                </div>
            </form>
        </div>
    )
}

export default AddBlog