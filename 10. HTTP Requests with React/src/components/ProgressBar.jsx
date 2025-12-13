import { useState, useEffect } from 'react'; // Import useState and useEffect hooks from React

export default function ProgressBar({ timer }) {
  // State to keep track of the remaining time for the progress bar
  const [remainingTime, setRemainingTime] = useState(timer); // Initialize remainingTime with the total timer duration

  useEffect(() => {
    // Set up an interval that updates the remainingTime every 10ms for a smooth progress bar animation
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 10); // Decrease remainingTime by 10ms on each tick
    }, 10);

    // Cleanup function to clear the interval when the component unmounts or effect reruns
    return () => {
      clearInterval(interval); // Prevent memory leaks or multiple intervals running at once
    };
  }, []); // Empty dependency array ensures this effect runs only once after mount

  // Render an HTML <progress> element to visually display the countdown
  // The value prop reflects the current remaining time, and max prop is the initial timer value
  return <progress value={remainingTime} max={timer} />;
}
