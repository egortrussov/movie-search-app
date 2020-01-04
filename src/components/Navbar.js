import React from 'react'
import { Link } from 'react-router-dom'

import './Navbar.css'

const Navbar = () => {
    return (
        <nav>
            <div className="nav-left">
                <Link to="/">
                    <h2>Movie Search</h2>
                </Link>
                
            </div>
            <div className="nav-right">
                <a href="https://github.com/egortrussov">Github</a>
            </div>
        </nav>
    )
}

export default Navbar
