import React, { useState, useEffect } from 'react';

const TypingText = ({ text,currentIndex, setCurrentIndex }) => {
  const [displayedText, setDisplayedText] = useState('');
  useEffect(() => {
    const typingInterval = 20; // Adjust the typing speed (milliseconds)
    const typingTimer = setTimeout(() => {
      setDisplayedText(text.slice(0, currentIndex + 1));
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, typingInterval);
    
    // Clear the timers when the component is unmounted or when the text is fully displayed
    return () => {
      clearTimeout(typingTimer);
    };
  }, [currentIndex, text]);

  return (
    <div>
      <span>{displayedText}</span>
      {displayedText?.length < text?.length && <span className="animate-ping font-[900] text-2xl">&nbsp;|</span>}
    </div>
  );
};

export default TypingText;
