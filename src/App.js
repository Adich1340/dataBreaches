import React, { useState, useEffect } from 'react';
import Fetching from './components/Fetching';
import './Style/style.css'

function App() {
  const [darkMode, setDarkMode] = useState(getInitialMode());

  useEffect(() => {
    localStorage.setItem('dark', JSON.stringify(darkMode))
  }, [darkMode])

  function getInitialMode() {
    const savedMode = JSON.parse(localStorage.getItem('dark'));
    return savedMode || false; 
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
      <Fetching />
    </div>
  );
}

export default App;
