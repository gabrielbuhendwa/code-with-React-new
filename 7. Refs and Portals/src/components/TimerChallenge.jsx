import { useState } from "react";

export default function TimerChallenge({title, targetTime}) {

 const [timerExpired, setTimerExpired] = useState(false);   

 function handleStart(){
    setTimeout(()=> {}, targetTime * 1000);
 }

 return (
 <section className="challenge">
    <h2>{title}</h2>
    <p className="challenge-time">
        {targetTime} second{targetTime > 1 ? 's' : ''}
    </p>
    <p>
        <button>
            Start Challenge
        </button>
    </p>
    <p className="">
        Time is Runnigng.../Timer inactive
    </p>
 </section>
 );
}  