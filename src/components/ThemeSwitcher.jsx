import React, { useState, useEffect } from 'react';
import './ThemeSwitcher.css';

const ThemeSwitcher = () => {
  const [currentTheme, setCurrentTheme] = useState('green');
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    { id: 'green', name: 'GREEN PHOSPHOR', color: '#33ff33' },
    { id: 'amber', name: 'AMBER TERMINAL', color: '#ffaa00' },
    { id: 'cyan', name: 'CYAN MATRIX', color: '#00ffff' },
    { id: 'ibm', name: 'CLASSIC IBM', color: '#00ff00' },
    { id: 'apple', name: 'APPLE II', color: '#33ff33' },
  ];

  useEffect(() => {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('terminal-theme');
    if (savedTheme) {
      setCurrentTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const changeTheme = (themeId) => {
    setCurrentTheme(themeId);
    document.documentElement.setAttribute('data-theme', themeId);
    localStorage.setItem('terminal-theme', themeId);
    setIsOpen(false);
  };

  return (
    <div className="theme-switcher">
      <button 
        className="theme-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="theme-icon">◆</span>
        <span className="theme-label">THEME: {themes.find(t => t.id === currentTheme)?.name}</span>
      </button>

      {isOpen && (
        <div className="theme-menu">
          <div className="theme-menu-header">
            ┌─[ SELECT COLOR THEME ]──────────┐
          </div>
          {themes.map(theme => (
            <button
              key={theme.id}
              className={`theme-option ${currentTheme === theme.id ? 'active' : ''}`}
              onClick={() => changeTheme(theme.id)}
              style={{ '--theme-color': theme.color }}
            >
              <span className="theme-indicator">
                {currentTheme === theme.id ? '▶' : ' '}
              </span>
              <span className="theme-name">{theme.name}</span>
              <span className="theme-sample" style={{ color: theme.color }}>
                █████
              </span>
            </button>
          ))}
          <div className="theme-menu-footer">
            └──────────────────────────────────┘
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;