import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars,faBookmark,faChevronRight,faClockRotateLeft,faFilm,faFire,faHeart,faHome, faTv,  } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import './Navbar.css';
import Search from "./Search";
import { Link, NavLink,  } from "react-router-dom";

const NavBar = () => {
    const[isHideMenu,setIsHideMenu] = useState(false)


    function handleMenuClick(){
        setIsHideMenu(!isHideMenu);
    

    }

    useEffect(()=>{
    },[])
  return (
    <>
    <header className="w-full bg-white">
<h2 className=" text-3xl pl-2 "><FontAwesomeIcon icon={faBars} className={`mx-2 cursor-pointer `} onClick={handleMenuClick} /><Link to='/'><span>MoviesHub</span ></Link></h2>

    </header>
    <Search/>
 
    <nav className={`p-2 h-full  ${isHideMenu?'menu-hidden':''}`}>

       
            <div className="navbar">

        <section className="">
            <ul className="">
                <NavLink className={({ isActive }) => (isActive ? 'active-nav' : '')}  to='/'><li ><FontAwesomeIcon icon={faHome}/><span>Home</span> </li></NavLink>
                <NavLink className={({ isActive }) => (isActive ? 'active-nav' : '')} to='/trending'><li ><FontAwesomeIcon icon={faFire}/><span>Trending</span></li></NavLink>
            </ul>

        </section>
        <section className="">
            <h3 className="text-2xl border-t-2"> <span>You</span> <FontAwesomeIcon icon={faChevronRight}/> </h3>
            <ul>
                <NavLink to='/history' className={({ isActive }) => (isActive ? 'active-nav' : '')}><li ><FontAwesomeIcon icon={faClockRotateLeft}/><span>History</span></li></NavLink>
                <NavLink className={({ isActive }) => (isActive ? 'active-nav' : '')}  to='/favoritesmovies'><li ><FontAwesomeIcon icon={faHeart} /><span>Favorite</span></li></NavLink>
                <NavLink className={({ isActive }) => (isActive ? 'active-nav' : '')} to='/savedmovies'><li><FontAwesomeIcon icon={faBookmark}/><span>Saved</span></li></NavLink>
            </ul>
        </section>
        <section className="">
        <h3 className="text-2xl border-t-2 "> <span>Explore</span> <FontAwesomeIcon icon={faChevronRight}/> </h3>
        <ul>
                <NavLink className={({ isActive }) => (isActive ? 'active-nav' : '')} to='/movies'><li  ><FontAwesomeIcon icon={faFilm}/><span>Movies</span></li></NavLink>
                <NavLink className={({ isActive }) => (isActive ? 'active-nav' : '')} to='/tvshows'><li ><FontAwesomeIcon icon={faTv}/><span>TV Shows</span></li></NavLink>


        </ul>

        </section>
        </div>
    </nav>
    </>
  )
}

export default NavBar