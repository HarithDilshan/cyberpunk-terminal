import React, { useRef, useEffect } from 'react';
import './MatrixRain.css';

const MatrixRain = ({ onClose }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Characters - Katakana, Latin, and numbers
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ';
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    
    // Array of drops - one per column
    const drops = Array(columns).fill(1);
    
    // Speed variation for each column
    const speeds = Array(columns).fill(0).map(() => Math.random() * 0.5 + 0.5);

    const draw = () => {
      // Semi-transparent black to create trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Matrix rain color
      ctx.fillStyle = '#0f0';
      ctx.font = `${fontSize}px monospace`;

      drops.forEach((y, i) => {
        // Random character
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        
        // Draw the character
        ctx.fillText(text, x, y * fontSize);

        // Randomly reset drop to top
        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        // Move drop down with individual speed
        drops[i] += speeds[i];
      });
    };

    // Animation loop
    const interval = setInterval(draw, 33);

    // Cleanup
    return () => clearInterval(interval);
  }, []);

  // Click to close
  const handleClick = () => {
    if (onClose) onClose();
  };

  return (
    <div className="matrix-rain-container" onClick={handleClick}>
      <canvas ref={canvasRef} className="matrix-canvas" />
      <div className="matrix-overlay">
        <div className="matrix-message">
          <h1>WAKE UP, NEO...</h1>
          <p>The Matrix has you.</p>
          <p className="matrix-hint">Click anywhere to exit</p>
        </div>
      </div>
    </div>
  );
};

export default MatrixRain;