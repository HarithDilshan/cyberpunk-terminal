import React, { useState, useEffect } from 'react';
import BootSequence from './components/BootSequence';
import Terminal from './components/Terminal';
import SystemMonitor from './components/SystemMonitor';
import MatrixRain from './components/MatrixRain';
import ThemeSwitcher from './components/ThemeSwitcher';
import { createCommandSystem } from './utils/commands';
import './styles/crt-effects.css';
import './styles/terminal.css';
import './styles/themes.css';
import './App.css';

function App() {
  const [bootComplete, setBootComplete] = useState(false);
  const [showMonitor, setShowMonitor] = useState(false);
  const [showMatrix, setShowMatrix] = useState(false);
  const [terminalRef, setTerminalRef] = useState(null);

  // Skip boot sequence with space bar
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === ' ' && !bootComplete) {
        setBootComplete(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [bootComplete]);

  // Command handler
  const handleCommand = (input) => {
    const commandSystem = createCommandSystem(
      (line) => {
        // This would add lines to terminal, but we'll handle it in Terminal component
      },
      setShowMonitor,
      () => setShowMatrix(true)
    );

    const result = commandSystem(input);

    if (result === 'CLEAR_SCREEN') {
      // Special case - will be handled in Terminal component
      return null;
    }

    return result;
  };

  return (
    <div className="app">
      {/* CRT Effects */}
      <div className="crt-screen">
        <div className="crt-screen-glow"></div>
        
        {/* Boot Sequence */}
        {!bootComplete && (
          <div className="boot-overlay">
            <BootSequence onComplete={() => setBootComplete(true)} />
            <div className="skip-hint">
              Press SPACE to skip boot sequence
            </div>
          </div>
        )}

        {/* Main Interface */}
        {bootComplete && (
          <>
            {/* Theme Switcher */}
            <ThemeSwitcher />

            {/* System Monitor Toggle */}
            {showMonitor ? (
              <SystemMonitor />
            ) : (
              <Terminal 
                ref={setTerminalRef}
                onCommand={handleCommand}
              />
            )}
          </>
        )}

        {/* CRT Bezel */}
        <div className="crt-bezel"></div>
        
        {/* Power LED */}
        <div className="power-led"></div>
      </div>

      {/* Matrix Rain Easter Egg */}
      {showMatrix && (
        <MatrixRain onClose={() => setShowMatrix(false)} />
      )}
    </div>
  );
}

export default App;