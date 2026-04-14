import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../hooks/useTheme';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useTheme() || {};

  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const navItems = token 
    ? [
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Add Skill', href: '/add-skill' },
        { name: 'Manager View', href: '/manager' },
      ]
    : [
        { name: 'Login', href: '/login' },
        { name: 'Register', href: '/register' },
      ];

  return (
    <nav className="glassmorphism backdrop-blur-xl border-b border-glass/30 sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to={token ? '/dashboard' : '/login'} className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all">
              <span className="text-2xl font-bold text-primary-fg">SP</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Skill Passport
              </h1>
              <p className="text-xs text-foreground/60 font-medium tracking-wide">Blockchain Verified</p>
            </div>
          </Link>

          {/* Desktop Nav */}
<div className="hidden lg:flex items-center space-x-1 sm:space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="px-3 py-2 text-xs sm:px-4 sm:py-2 sm:text-sm rounded-xl sm:rounded-2xl text-foreground/80 hover:text-foreground hover:bg-glass/50 hover:shadow-md transition-all font-medium whitespace-nowrap"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-2xl glassmorphism hover:shadow-3d hover:scale-105 transition-all"
              title={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-2xl glassmorphism hover:shadow-3d transition-all"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-glass/30 pt-4">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="px-4 py-3 rounded-2xl text-foreground hover:bg-primary/10 hover:text-primary font-medium transition-all"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {token && (
                <button
                  onClick={handleLogout}
                  className="px-4 py-3 rounded-2xl text-left text-foreground/80 hover:bg-red-500/20 hover:text-red-400 font-medium transition-all flex items-center gap-2"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

