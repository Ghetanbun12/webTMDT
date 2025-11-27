// Header.jsx
import React, { useState } from 'react';
import { Search, ShoppingCart, User, Facebook, Instagram, Twitter, Menu, X } from 'lucide-react';
import '../styles/header.css';
import lucide from 'lucide-react';
import CartPopup from './cart/cartpopup';

const Header = () => {
  const [current, setCurrent] = useState('shop-all');
  const [cartCount, setCartCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigationItems = [
    { key: 'shop-all', label: 'Shop All', href: '/shop' },
    { key: 'our-story', label: 'Our Story', href: '/story' },
    { key: 'our-craft', label: 'Our Craft', href: '/craft' },
    { key: 'gift-card', label: 'Gift Card', href: '/gift-card' },
    { key: 'contact', label: 'Contact', href: '/contact' },
  ];

  const handleNavClick = (key) => {
    setCurrent(key);
    setMobileMenuOpen(false);
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
            <button className="icon-button">
              <Search size={20} />
            </button>
          </div>

          {/* Logo - Center */}
          <div className="logo-container">
            <a href="/" className="logo">
              adalene.
            </a>
          </div>

          {/* Right Icons */}
          <div className="header-right">
            <button className="icon-button user-button">
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
                <a
                  href={item.href}
                  onClick={() => handleNavClick(item.key)}
                  className={`nav-link ${current === item.key ? 'nav-link-active' : ''}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
    <CartPopup isOpen={isCartOpen} onClose={()=>{setIsCartOpen(false)}}/>
    </div>
  );
};

export default Header;