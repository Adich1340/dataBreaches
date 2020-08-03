import React, { useState, useEffect } from 'react';
import Posts from './components/Posts';
import './Style/style.css'

function App() {
  const [darkMode, setDarkMode] = useState(getInitialMode());

  useEffect(() => {
    localStorage.setItem('dark', JSON.stringify(darkMode))
  }, [darkMode])

  function getInitialMode() {
    const isReturningUser = "dark" in localStorage;
    const savedMode = JSON.parse(localStorage.getItem('dark'));
    const userPrefersDark = getPrefColorScheme();
    if(isReturningUser){
      return savedMode;
    } else if(userPrefersDark){
      return true;
    } else {
      return false;
    }
  }

  function getPrefColorScheme() {
    if(!window.matchMedia) return;

    return window.matchMedia("(prefers-color-scheme: dark)").matches; 
  }

  return (
    <div className={darkMode? "dark-mode" : "light-mode"}>
      <nav>
        <div className="toggle-conatiner">
          <span className="toggle">
            <input
              checked={darkMode}
              onChange={() => setDarkMode(prevMode => !prevMode)}
              type="checkbox"
              className="checkbox"
              id="checkbox"
            />
          </span>
        </div>        
      </nav>
      <Posts />
    </div>
  );
}

export default App;