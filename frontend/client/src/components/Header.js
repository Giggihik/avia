import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="nav-container">
        {/* НОВЫЙ 3D ЛОГОТИП */}
        <Link to="/" className="logo">
          <svg className="logo-plane" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
          </svg>
          <span className="logo-text">YCON</span>
        </Link>

        <nav className="main-nav">
          <ul className="main-nav-list">
            <li><Link to="/">РЕЙСЫ</Link></li>
            <li><Link to="/booking">БРОНИРОВАНИЕ</Link></li>
            <li><Link to="/auth" className="user-icon">👤 ВХОД / РЕГИСТРАЦИЯ</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;