import { getMinutes, getSeconds } from "../../utils";
import { useReducer, useState } from "react";

import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";

type resetSessionType = (interval : NodeJS.Timer | undefined, timeout : NodeJS.Timer | undefined) => void

export const PomodoroTimer = () => {

  const [seconds, setSeconds] = useState(10);
  const [playButton, setPlayButton] = useState("START");
  const [progress, setProgress] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timer>();
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timer>();


  const playSession = () => {

    if (playButton == "START") {
      setPlayButton("PAUSE");

      const interval = setInterval(() => {
        setSeconds(prevState => prevState - 1);
        setProgress( prevState => prevState + 1)}, 1000
			);
			setIntervalId(interval);

      const timeout : NodeJS.Timer = setTimeout(() => resetSession(interval, timeout), seconds * 1000);
      setTimeoutId(timeout);

    } else {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
      setPlayButton("START");
    }

  };

	const resetSession : resetSessionType = (interval, timeout) => {
		clearInterval(interval);
		clearTimeout(timeout);
		setSeconds(10);
    setProgress(0);
		setPlayButton("START");
	}

  const minutesRemaining = getMinutes(seconds);
  const secondsRemaining = getSeconds(seconds);

  return (
    <div>
      <CircularProgressbarWithChildren
        value={progress}
        minValue={0}
        maxValue={10}
        styles={buildStyles({ pathColor: "blue", trailColor: "red" })}
      >
        <h1>
          {minutesRemaining}:{secondsRemaining}
        </h1>
      </CircularProgressbarWithChildren>
      <div>
				<button onClick={playSession}>{playButton}</button>
				<button onClick={() => resetSession(intervalId, timeoutId)}>RESET</button>
			</div>
    </div>
  );
};
