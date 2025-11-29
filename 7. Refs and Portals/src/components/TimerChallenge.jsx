import { useState } from "react";

export default function TimerChallenge({title, targetTime}) {
 const [timerStarted, setTimerStarted] = usesState(false);
 const [timerExpired, setTimerExpired] = useState(false);   

 //starting the challenge timer 
 function handleStart(){
    setTimeout(()=> {
        setTimerExpired(true);
    }, targetTime * 1000);

    setTimerStarted(true);
 }

 //finishing the challenge timer
 function handleStop(){
    
 }



 <section className="challenge">
    <h2>{title}</h2>
    {timerExpired && <p>You lost</p>}
    <p className="challenge-time">
        {targetTime} second{targetTime > 1 ? 's' : ''}
    </p>
    <p>
        <button onClick={handleStart}>
            {Start ? 'stop' : 'Start'} Challenge
        </button>
    </p>
    <p className={timerStarted ? 'active' : undefined }>
        {timerStarted ? 'Time is Runnigng...' : 'Timer inactive'}
    </p>
 </section>
 );
}  