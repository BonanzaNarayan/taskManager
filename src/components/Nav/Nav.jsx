import { GoTasklist } from 'react-icons/go'
import './Nav.css'
import { BsCheck, BsClockHistory } from 'react-icons/bs'
import { MdPending } from 'react-icons/md'
import { useState } from 'react'
import { BiStar } from 'react-icons/bi'
import { Link, useLocation } from 'react-router-dom'
import { FaCheckCircle, FaHeart } from 'react-icons/fa'



function Nav() {
    const [active] = useState(true)

    const location = useLocation();

    // Check if a path is active
    const isActive = (path) => location.pathname === path;

  return (
    <nav>
        <ul className='status'>
            <Link to="/" className={isActive("/") ? "linksNav active": "linksNav"}>
                <GoTasklist />
            </Link>
            <Link to="/completed" className={isActive("/completed") ? "linksNav active": "linksNav"}>
                <FaCheckCircle />
            </Link>
            <Link to="/pending" className={isActive("/pending") ? "linksNav active": "linksNav"}>
                <BsClockHistory />
            </Link>
            <Link to="/favorites" className={isActive("/favorites") ? "linksNav active": "linksNav"}>
                <FaHeart />
            </Link>
        </ul>

        <div className="flter">
            <ul>
                <Link className={isActive("/") ? "link active" : "link"} to="/">All</Link>
                <Link className={isActive("/low") ? "link active" : "link"} to="/low">Low</Link>
                <Link className={isActive("/medium") ? "link active" : "link"} to="/medium">Medium</Link>
                <Link className={isActive("/high") ? "link active" : "link"} to="/high">High</Link>
            </ul>
        </div>
    </nav>
  )
}

export default Nav