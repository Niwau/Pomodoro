import { getMinutes, getSeconds } from "../../utils";
import { useState } from "react";
import { Wrapper } from "./styles";

import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import { OutlineCircle } from "../OutlineCircle";
import { FilledCircle } from "../FilledCircle";

type resetSessionType = (
  interval: NodeJS.Timer | undefined,
  timeout: NodeJS.Timer | undefined
) => void;

export const PomodoroTimer = () => {
  const [seconds, setSeconds] = useState(5);
  const [playButton, setPlayButton] = useState("START");
  const [progress, setProgress] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timer>();
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timer>();
	const [sessionCount, setSessionCount] = useState(0);

  const playSession = () => {
    if (playButton == "START" && sessionCount != 4) {

			setPlayButton("PAUSE");

      const interval = setInterval(() => {
        setSeconds((prevState) => prevState - 1);
        setProgress((prevState) => prevState + 1);
      }, 1000);
      setIntervalId(interval);

      const timeout: NodeJS.Timer = setTimeout(() => {
					setSessionCount(prevState => prevState + 1);
					resetSession(interval, timeout);
				},seconds * 1000
      );

      setTimeoutId(timeout);

    } else {
			setSessionCount(0);
      clearInterval(intervalId);
      clearTimeout(timeoutId);
      setPlayButton("START");
    }
  }

  const resetSession: resetSessionType = (interval, timeout) => {
    clearInterval(interval);
    clearTimeout(timeout);
    setSeconds(5);
    setProgress(0);
    setPlayButton("START");
  };

  const minutesRemaining = getMinutes(seconds);
  const secondsRemaining = getSeconds(seconds);

  return (
    <Wrapper>
      <CircularProgressbarWithChildren
				strokeWidth={3}
        value={progress}
        minValue={0}
        maxValue={5}
        styles={buildStyles({ pathColor: "#FFFFFF", trailColor: "#FFFFFF33" })}
      >
        <h1>
          {minutesRemaining}:
          {secondsRemaining < 10 ? "0" + secondsRemaining : secondsRemaining}
        </h1>
      </CircularProgressbarWithChildren>
      <div>
        <button onClick={playSession}>{playButton}</button>
        <button onClick={() => resetSession(intervalId, timeoutId)}>
          RESET
        </button>
      </div>
      <figure>
				{sessionCount < 1 ? <OutlineCircle/> : <FilledCircle/>}
				{sessionCount < 2 ? <OutlineCircle/> : <FilledCircle/>}
				{sessionCount < 3 ? <OutlineCircle/> : <FilledCircle/>}
				{sessionCount < 4 ? <OutlineCircle/> : <FilledCircle/>}
			</figure>
    </Wrapper>
  );
};
