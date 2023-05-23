import React, { useContext } from 'react';
import './Navbar.css';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import ActiveLink from '../ActiveLink/ActiveLink';
import { AuthContext } from '../../../providers/AuthProvider';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const searchIcon = <MagnifyingGlassIcon className="h-4 w-4" />

    const handleLogout = () => logOut()

    return (
        <nav className="relative flex mt-4 justify-around items-center">
            <div className='flex'>
                <ActiveLink to="/">VBA</ActiveLink>
                <div>
                    <span className="left-58 top-2 absolute">{searchIcon}</span>
                    <input
                        type="text"
                        placeholder="Search your destination..."
                        className="pl-4 input input-bordered input-sm w-full max-w-xs"
                    />
                </div>
            </div>
            <div>
                <ActiveLink to="/news">News</ActiveLink>
                <ActiveLink to="/destination">Destination</ActiveLink>
                <ActiveLink to="/blog">Blog</ActiveLink>
                <ActiveLink to="/contact">Contact</ActiveLink>
                {
                    user ? <Link
                        className='text-rose-500 border border-red-500 hover:border-red-600 hover:text-rose-600'
                        onClick={handleLogout}>Logout
                    </Link> :
                        <>
                            <ActiveLink to="/login">Login</ActiveLink>
                            <ActiveLink to="/signup">Sign Up</ActiveLink>
                        </>
                }
            </div>
        </nav>
    );
};

export default Navbar;