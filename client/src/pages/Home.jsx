import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
    const token = localStorage.getItem('token');

    return (
        <div className='home'>
            <div className="homeControls">
                <span>This website will demonstrate jsonwebtoken</span>
                {!token ?
                    (<div className='button-container' style={{ display: 'flex', marginTop: '30px' }}>
                        <Link to={'/signup'}><button> Sign Up </button></Link>
                        <Link to={'/login'}><button> Login </button></Link>
                    </div>) :
                    (<div className='button-container' style={{ display: 'flex', marginTop: '30px' }}>
                        < Link to={'/blogs'}><button> Blogs </button></Link>
                        < Link to={'/newblog'}><button> Add New Blog </button></Link>
                    </div>)
                    
                }
        </div>

        </div >
    )
}

export default Home