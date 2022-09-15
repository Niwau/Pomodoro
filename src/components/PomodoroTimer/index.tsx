import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";

import { useState } from "react";
import { getMinutes, getSeconds } from "../../utils";

export const PomodoroTimer = () => {

  const [seconds, setSeconds] = useState(10);
  const [playButton, setPlayButton] = useState("START");
	const [progress, setProgress] = useState(0);
	const [intervalId, setIntervalId] = useState<NodeJS.Timer>()
	const [timeoutId, setTimeoutId] = useState<NodeJS.Timer>()

  const playSession = () => {

    if(playButton == "START") {

			setPlayButton("PAUSE");

			const interval = setInterval(() => { 
				setSeconds(prevState => prevState - 1);
				setProgress(prevState => prevState + 1);
			}, 1000);
			setIntervalId(interval);

			const timeout = setTimeout(() => {
				clearInterval(interval);
				setPlayButton("START");
				setSeconds(10);
				setProgress(0);
			}, seconds * 1000);
			setTimeoutId(timeout);

    }	else {
      clearInterval(intervalId);
			clearTimeout(timeoutId);
      setPlayButton("START");
    }
		
  };

  const minutesRemaining = getMinutes(seconds);
  const secondsRemaining = getSeconds(seconds);

  return (
    <div>
      <CircularProgressbarWithChildren
        value={progress}
				minValue={0}
				maxValue={10}
        styles={buildStyles({ pathColor: "blue", trailColor: 'red'})}
      >
				<h1>{minutesRemaining}:{secondsRemaining}</h1>
      </CircularProgressbarWithChildren>
      <button onClick={playSession}>{playButton}</button>
    </div>
  );
};
