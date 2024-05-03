import React, { useState, useEffect } from 'react';

const MessageOverlay = ({ message, duration, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(0, 0, 0, 0.8)', color: 'white', padding: '20px', borderRadius: '8px', display: isVisible ? 'block' : 'none' }}>
      {message}
    </div>
  );
};

export default MessageOverlay;
