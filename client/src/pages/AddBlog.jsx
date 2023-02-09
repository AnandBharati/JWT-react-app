import React, { useState } from 'react'

function AddBlog({userInfo}) {
    const [formData, setFormData] = useState({
        title: '',
        desc: '',
        createdBy: '',
        createdOn: '',
    })

    function changeHandler(field,value){
        setFormData({...formData, [field]: value})
    }

    function SubmitHandler(){
        //fetch operation for creating new blog
        fetch('https://sore-gray-oyster-coat.cyclic.app/blogs/newblog', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
          })
          .then((res)=>res.json())
          .then((result)=>console.log(result))
          .catch((err)=>console.log(err))
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

                <button type='button' onClick={SubmitHandler}>Submit</button>
            </form>
        </div>
    )
}

export default AddBlog