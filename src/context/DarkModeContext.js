import React, { createContext, useState, useEffect } from 'react';

const DarkModeContext = createContext();

const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedDarkMode = localStorage.getItem('darkMode') === 'true';
      if (savedDarkMode) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
      setIsDarkMode(savedDarkMode);
      setIsInitialLoad(false);
    }
  }, []);

  useEffect(() => {
    if (!isInitialLoad) {
      if (isDarkMode) {
        document.body.classList.add('dark');
        localStorage.setItem('darkMode', 'true');
      } else {
        document.body.classList.remove('dark');
        localStorage.setItem('darkMode', 'false');
      }
    }
  }, [isDarkMode, isInitialLoad]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export { DarkModeContext, DarkModeProvider };
