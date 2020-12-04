import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="navbar">
            <div>
                <Link to='/' className='logo-link'>
                    <h1>Portfolio</h1>
                </Link>
            </div>
            <div>
                <form>
                    <label className='search-holder'>
                        <input className='search' placeholder='' type='text' />
                    </label>
                </form>
            </div>
        </div>
    )
}

export default Navbar;