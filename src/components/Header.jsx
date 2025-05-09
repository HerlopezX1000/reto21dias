import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className='header'>
      <div className="contenedor">
        <Link to="/" className='logo'>
            <img src='/logo.png' alt='logo reto 21'/>
        </Link>

        <nav className="menu">
            <Link to="/" className='item'>Inicio</Link>
        </nav>
        <div className="navbar-social">
           <a href="https://www.facebook.com/r21globalteam" target="_blank" rel="noopener noreferrer">
               <i className="fab fa-facebook"></i>
            </a>
           <a href="https://www.instagram.com/r21globalteam/" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
           </a>
           <a href="https://www.youtube.com/@R21GlobalTeam" target="_blank" rel="noopener noreferrer">
                 <i class="fa-brands fa-youtube"></i>
           </a>
           <a href="http://www.tiktok.com/@r21globalteam" target="_blank" rel="noopener noreferrer">
                <i class="fa-brands fa-tiktok"></i>
           </a>
           <a href="https://wa.me/+573118006484" target="_blank" rel="noopener noreferrer">
                 <i className="fab fa-whatsapp"></i>
           </a>
          </div>
        </div>
    </header>
  );
};

export default Header;
