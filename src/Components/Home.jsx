import React, { useState, useEffect } from 'react';

const Home = () => {
  const [titleColor, setTitleColor] = useState('#000');
  const [moveBorder, setMoveBorder] = useState(false); 

  useEffect(() => {
    // Change title color every second
    const intervalColor = setInterval(() => {
      const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
      setTitleColor(randomColor);
    }, 1000);
 
    const intervalMove = setInterval(() => {
      setMoveBorder((prev) => !prev);
    }, 3000);

    
    return () => {
      clearInterval(intervalColor);
      clearInterval(intervalMove);
    };
  }, []);

  return (
    <div className="text-center mt-10">
      <h1 style={{ color: titleColor }} className="text-4xl font-bold mb-4">
        Bug Tracker
      </h1>
      <div
        className={`relative inline-block overflow-hidden ${moveBorder ? 'border-yellow-500' : 'border-transparent'
          }`}
        style={{ animation: moveBorder ? 'borderMove 2s infinite' : 'none' }}
      >
        <img
          src="https://framerusercontent.com/images/vJl5Ru2ctOe9Tws3A1iSpC9wg.jpg" 
          alt="Bug Tracker"
          className="rounded-lg"
          style={{ width: '650px', height: '450px' }}
        />
      </div>
      <p className="text-lg mt-4">
        Welcome to the Bug Tracker! Here you can chat after login with your email and create a bug
        report.
      </p>
      <style>
        {`
          @keyframes borderMove {
            0% {
              transform: translate(0, 0);
            }
            25% {
              transform: translate(15px, 0);
            }
            50% {
              transform: translate(0, 15px);
            }
            75% {
              transform: translate(-15px, 0);
            }
            100% {
              transform: translate(0, -15px);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Home;
