import React, { useState, useEffect } from 'react';
import './BootSequence.css';

const BootSequence = ({ onComplete }) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [completed, setCompleted] = useState(false);

  const bootMessages = [
    { text: '█████████████████████████████████████████', delay: 100 },
    { text: '███╗   ███╗ ██████╗██╗   ██╗██████╗ ███████╗██████╗ ', delay: 50 },
    { text: '████╗ ████║██╔════╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔══██╗', delay: 50 },
    { text: '██╔████╔██║██║      ╚████╔╝ ██████╔╝█████╗  ██████╔╝', delay: 50 },
    { text: '██║╚██╔╝██║██║       ╚██╔╝  ██╔══██╗██╔══╝  ██╔══██╗', delay: 50 },
    { text: '██║ ╚═╝ ██║╚██████╗   ██║   ██████╔╝███████╗██║  ██║', delay: 50 },
    { text: '╚═╝     ╚═╝ ╚═════╝   ╚═╝   ╚═════╝ ╚══════╝╚═╝  ╚═╝', delay: 50 },
    { text: '█████████████████████████████████████████', delay: 100 },
    { text: '', delay: 200 },
    { text: 'CYBER OS v2.077.1984', delay: 100 },
    { text: 'Copyright (c) 2077 Cyberpunk Systems Inc.', delay: 50 },
    { text: '', delay: 300 },
    { text: 'Initializing neural interface...', delay: 400 },
    { text: '[████████████████████████████████] 100%', delay: 200 },
    { text: '', delay: 100 },
    { text: 'Loading kernel modules:', delay: 200 },
    { text: '  • quantum_processor.ko .................. [  OK  ]', delay: 150 },
    { text: '  • neural_link.ko ........................ [  OK  ]', delay: 150 },
    { text: '  • cyber_defense.ko ...................... [  OK  ]', delay: 150 },
    { text: '  • holographic_display.ko ................ [  OK  ]', delay: 150 },
    { text: '', delay: 100 },
    { text: 'Checking system integrity:', delay: 200 },
    { text: '  Scanning memory sectors ................. [  OK  ]', delay: 180 },
    { text: '  Verifying quantum signatures ............ [  OK  ]', delay: 180 },
    { text: '  Testing neural pathways ................. [  OK  ]', delay: 180 },
    { text: '', delay: 100 },
    { text: 'Mounting file systems:', delay: 200 },
    { text: '  /dev/neural0 on /mnt/consciousness ...... [  OK  ]', delay: 150 },
    { text: '  /dev/quantum0 on /mnt/reality ........... [  OK  ]', delay: 150 },
    { text: '  /dev/cyber0 on /mnt/matrix .............. [  OK  ]', delay: 150 },
    { text: '', delay: 100 },
    { text: 'Starting network services:', delay: 200 },
    { text: '  • Establishing quantum entanglement ..... [  OK  ]', delay: 180 },
    { text: '  • Connecting to neural network .......... [  OK  ]', delay: 180 },
    { text: '  • Initializing blockchain sync .......... [  OK  ]', delay: 180 },
    { text: '  • Activating firewall protocols ......... [  OK  ]', delay: 180 },
    { text: '', delay: 100 },
    { text: 'Running system diagnostics:', delay: 200 },
    { text: '  CPU cores: 128 threads @ 5.8 GHz ........ [  OK  ]', delay: 150 },
    { text: '  Memory: 256 GB DDR7 ..................... [  OK  ]', delay: 150 },
    { text: '  Neural processor: 1024 TOPS ............. [  OK  ]', delay: 150 },
    { text: '  Quantum cores: 2048 qubits .............. [  OK  ]', delay: 150 },
    { text: '', delay: 200 },
    { text: 'System initialization complete.', delay: 300 },
    { text: 'All systems operational.', delay: 200 },
    { text: '', delay: 100 },
    { text: 'Welcome to CYBER OS.', delay: 300 },
    { text: 'Type "help" for available commands.', delay: 200 },
    { text: '', delay: 500 },
  ];

  useEffect(() => {
    if (currentLine < bootMessages.length) {
      const timer = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
      }, bootMessages[currentLine].delay);

      return () => clearTimeout(timer);
    } else if (!completed) {
      setCompleted(true);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 1000);
    }
  }, [currentLine, bootMessages, completed, onComplete]);

  return (
    <div className="boot-sequence">
      <div className="boot-content">
        {bootMessages.slice(0, currentLine + 1).map((msg, i) => (
          <div key={i} className="boot-line">
            {msg.text}
          </div>
        ))}
        {currentLine < bootMessages.length && !completed && (
          <span className="cursor"></span>
        )}
      </div>
    </div>
  );
};

export default BootSequence;