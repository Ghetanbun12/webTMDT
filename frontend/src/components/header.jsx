// Header.jsx
import React, { useState } from 'react';
import { Search, ShoppingCart, User, Facebook, Instagram, Twitter, Menu, X } from 'lucide-react';
import '../styles/header.css';
import lucide from 'lucide-react';
import CartPopup from './cart/cartpopup';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {searchProducts} from '../api/products';

const Header = () => {
  const Navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [current, setCurrent] = useState('shop-all');
  const [cartCount, setCartCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [keyword, setKeyword] = useState('');
  const navigationItems = [
    { key: 'shop-all', label: 'Shop All', href: '/' },
    { key: 'our-story', label: 'Our Story', href: '/story' },
    { key: 'our-craft', label: 'Our Craft', href: '/story' },
    { key: 'gift-card', label: 'Gift Card', href: '/story' },
    { key: 'contact', label: 'Contact', href: '/story' },
  ];

  const handleNavClick = (key) => {
    setCurrent(key);
    setMobileMenuOpen(false);
  };
 const handleSearch = async () => {
    try {
      console.log(keyword);
      const res = await searchProducts(keyword);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    } 
  };
  return (
    <div>
      <header className="header">
        {/* Top Bar with Social Icons */}
        <div className="top-bar">
          <div className="top-bar-container">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <Facebook size={18} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <Instagram size={18} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <Twitter size={18} />
            </a>
          </div>
        </div>

        {/* Main Header */}
        <div className="main-header-container">
          <div className="main-header">
            {/* Search Icon - Left */}
            <div className="header-left">
              <div className="search-box">
                <input 
                type="text" 
                placeholder="Search..." 
                value={keyword} 
                onChange={(e) => setKeyword(e.target.value)}

                />
                <button className="search-btn" 
                onClick={handleSearch}
                >
                  <Search size={18} />
                </button>
              </div>
            </div>


            {/* Logo - Center */}
            <div className="logo-container">
              <a href="/" className="logo">
                adalene.
              </a>
            </div>

            {/* Right Icons */}
            <div className="header-right">
              <button className="icon-button user-button" onClick={() => { Navigate("/login") }}>
                <User size={20} />
                <span className="sr-only">Log In</span>
              </button>
              <button className="icon-button cart-button" onClick={() => setIsCartOpen(!isCartOpen)}>
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="cart-badge">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Navigation Menu - Desktop */}
          <nav className="desktop-nav">
            <ul className="nav-list">
              {navigationItems.map((item) => (
                <li key={item.key}>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      "nav-link " + (isActive ? "nav-link-active" : "")
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

        </div>
      </header>
      <CartPopup isOpen={isCartOpen} onClose={() => { setIsCartOpen(false) }} />
    </div>
  );
};

export default Header;