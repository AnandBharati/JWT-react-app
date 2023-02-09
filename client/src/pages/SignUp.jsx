import React, { useState } from 'react'

function SignUp() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    })

    function changeHandler(field, value) {
        setFormData({ ...formData, [field]: value });
    }

    function submitHandler(e) {
        // e.preventDefault();
        console.log('inside submit handller')
        fetch('http://localhost:3000/auth/signup/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then((resp) => resp.json())
            .then((result) => {
                if (result) {

                }
            }
            )
            .catch((err) => console.log('error', err));
    }

    return (
        <div className='signup'>
            <form action="POST">
                <h2>Sign up</h2>
                <input type="text"
                    placeholder='username'
                    value={formData.username}
                    onChange={(e) => changeHandler('username', e.target.value)} />
                <input type="text"
                    placeholder='email'
                    value={formData.email}
                    onChange={(e) => changeHandler('email', e.target.value)} />
                <input type="password"
                    placeholder='password'
                    value={formData.password}
                    onChange={(e) => changeHandler('password', e.target.value)} />

                <input type="button" value="Submit" onClick={(e) => submitHandler(e)} />
            </form>
        </div>
    )
}

export default SignUp