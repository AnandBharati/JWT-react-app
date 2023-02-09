import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const [isError, setIsError] = useState(false)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const errorMsg = <div className="errorMsg">
        <p>Error while Sign-up. try again</p>
        <button onClick={(e)=>setIsError(false)}>Close</button>
    </div>

    function changeHandler(field, value) {
        setFormData({ ...formData, [field]: value });
    }

    function submitHandler(e) {
        // e.preventDefault();
        console.log('inside submit handller')
        fetch('https://sore-gray-oyster-coat.cyclic.app/auth/signup/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
            .then((resp) => resp.json())
            .then((result) => {
                if (result) {
                    navigate('/login');
                }
            })
            .catch((err) => console.log('error', err));
    }

    return (
        <div className='signup'>
            {isError && errorMsg}
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