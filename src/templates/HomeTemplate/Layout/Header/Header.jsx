import React, { memo, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css'
function Header(props) {
    const [scrollHeader,setScrollHeader]=useState(false)
    useEffect(()=>{

        const handleScroll = ()=>{
            setScrollHeader(window.scrollY>0)
        }

        window.addEventListener('scroll', handleScroll)

        // clean up function
        return  ()=> {
            window.removeEventListener('scroll',handleScroll)
        }
        
    },[])


    return (
        <header className={scrollHeader?'header': 'header opacity-80'}>
            <div className="header-container">
                <a rel="noopener noreferrer" href="#" aria-label="Back to homepage" className="header__logo">
                    <img className="header__logo-img" src="https://cdn-icons-png.flaticon.com/512/230/230994.png" />
                </a>
                <ul className="header__navbar ">
                    <li className="header__navbar-item">
                        <NavLink to="/home" className=" header__navbar-item-link" activeClassName="header__navbar-item-link--active">Home</NavLink>
                    </li>
                    <li className="header__navbar-item">
                        <NavLink to="/contact" className="header__navbar-item-link" activeClassName="header__navbar-item-link--active">Contact</NavLink>
                    </li>
                    <li className="header__navbar-item">
                        <NavLink to="/news" className="header__navbar-item-link" activeClassName="header__navbar-item-link--active">News</NavLink>
                    </li>
                    
                </ul>
                <div className="items-center flex-shrink-0 hidden lg:flex">
                    <button className="self-center px-8 py-3 rounded">Sign in</button>
                    <button className="self-center px-8 py-3 font-semibold rounded dark:bg-violet-400 text-coolGray-900">Sign up</button>
                </div>
                <button className="p-4 lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-coolGray-100">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </header>

    )
}

export default memo(Header)