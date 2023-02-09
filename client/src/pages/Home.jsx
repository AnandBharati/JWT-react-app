import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
    const token = localStorage.getItem('token');

    return (
        <div className='home'>
            <div className="homeControls">
                <span>This website will demonstrate jsonwebtoken</span>
                {!token ?
                    (<div className='button-container' style={{display: 'flex', marginTop: '30px'}}>
                        <Link to={'/signup'}><button> Sign Up </button></Link>
                        <Link to={'/login'}><button> Login </button></Link>
                    </div>) :
                    <Link to={'/blogs'}>blog</Link>
                }
            </div>

        </div>
    )
}

export default Home