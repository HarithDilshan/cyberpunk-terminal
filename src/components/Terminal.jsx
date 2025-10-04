import React, { useState, useEffect, useRef } from 'react';
import '../styles/crt-effects.css';
import '../styles/terminal.css';

const Terminal = ({ onCommand }) => {
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom when new lines are added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  // Focus input when clicking anywhere on terminal
  useEffect(() => {
    const handleClick = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    const terminal = terminalRef.current;
    if (terminal) {
      terminal.addEventListener('click', handleClick);
      return () => terminal.removeEventListener('click', handleClick);
    }
  }, []);

  // Auto-focus on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const addLine = (text, type = 'output') => {
    setLines(prev => [...prev, { text, type, timestamp: Date.now() }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!input.trim()) return;

    // Add command to display
    addLine(input, 'command');

    // Add to history
    setHistory(prev => [...prev, input]);
    setHistoryIndex(-1);

    // Execute command
    if (onCommand) {
      const output = onCommand(input);
      if (output && output !== 'CLEAR_SCREEN') {
        // Split multi-line output
        output.split('\n').forEach(line => {
          addLine(line, 'output');
        });
      } else if (output === 'CLEAR_SCREEN') {
        setLines([]);
      }
    }

    setInput('');
  };

  const handleKeyDown = (e) => {
    // Arrow up - previous command
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex + 1;
        if (newIndex < history.length) {
          setHistoryIndex(newIndex);
          setInput(history[history.length - 1 - newIndex]);
        }
      }
    }
    
    // Arrow down - next command
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }

    // Ctrl+L - clear screen
    if (e.ctrlKey && e.key === 'l') {
      e.preventDefault();
      setLines([]);
    }

    // Ctrl+C - clear input
    if (e.ctrlKey && e.key === 'c') {
      e.preventDefault();
      setInput('');
      addLine('^C', 'system');
    }
  };

  return (
    <div className="terminal-container" ref={terminalRef}>
      <div className="terminal-content">
        {lines.map((line, i) => (
          <div key={i} className={`terminal-line terminal-line-${line.type}`}>
            {line.type === 'command' && (
              <span className="terminal-prompt">
                <span className="prompt-user">root</span>
                <span className="prompt-separator">@</span>
                <span className="prompt-host">cyberpunk</span>
                <span className="prompt-separator">:</span>
                <span className="prompt-path">~</span>
                <span className="prompt-symbol">$</span>
              </span>
            )}
            <span className="terminal-text">{line.text}</span>
          </div>
        ))}
        
        {/* Input line */}
<form onSubmit={handleSubmit} className="terminal-input-form">
  <div className="terminal-line terminal-line-input">
    <span className="terminal-prompt">
      <span className="prompt-user">root</span>
      <span className="prompt-separator">@</span>
      <span className="prompt-host">cyberpunk</span>
      <span className="prompt-separator">:</span>
      <span className="prompt-path">~</span>
      <span className="prompt-symbol">$</span>
    </span>
    <span className="terminal-text">{input}</span>
    <span className="cursor-blink"></span>
    <input
      ref={inputRef}
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={handleKeyDown}
      className="terminal-input-hidden"
      autoFocus
      spellCheck="false"
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
    />
  </div>
</form>
      </div>
    </div>
  );
};

export default Terminal;