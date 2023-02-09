import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function AddBlog({ userInfo }) {
    const [formData, setFormData] = useState({
        title: '',
        desc: '',
        createdBy: userInfo.username,
        createdOn: '',
    })

    function changeHandler(field, value) {
        setFormData({ ...formData, [field]: value })
    }

    function SubmitHandler() {
        const token = localStorage.getItem('token')
        setFormData({ ...formData, createdOn: Date.now() })//setting up date
        userInfo.username &&
            fetch('https://sore-gray-oyster-coat.cyclic.app/blogs/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            })
                .then((res) => res.json())
                .then((result) => console.log(result))
                .catch((err) => console.log(err))
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

                <p>createdBy: {userInfo.username} </p>

                

                <div className='button-container' style={{ display: 'flex', marginTop: '30px' }}>
                        <button type='button' onClick={SubmitHandler}>Submit</button>
                        <Link to={'/blogs'}><button> View all Blogs </button></Link>
                    </div>
            </form>
        </div>
    )
}

export default AddBlog