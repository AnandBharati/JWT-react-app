import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
    const token = localStorage.getItem('token');

    return (
        <div className='home'>
            {!token ?
                (<>
                    <Link to={'/signup'}>Sign Up</Link>
                    <Link to={'/login'}>Login</Link>
                </>) :
                <Link to={'/blogs'}>blog</Link>
            }
        
        </div>
    )
}

export default Home