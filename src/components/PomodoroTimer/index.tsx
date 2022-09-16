import { OutlineCircle } from "../OutlineCircle";
import { Wrapper } from "./styles";
import { useState } from "react";

import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";

import { getMinutes, getSeconds } from "../../utils";
import { FilledCircle } from "../FilledCircle";

const circularProgressBarStyles = buildStyles({
  pathColor: "#FFFFFF",
  trailColor: "#FFFFFF33"
})

export const PomodoroTimer = () => {

  const initialTime = 1500;
  const [sessionTime, setSessionTime] = useState(initialTime)
  const [progress, setProgress] = useState(0)
  const [buttonState, setButtonState] = useState("START")

  const [intervalIdState, setIntervalIdState] = useState<NodeJS.Timer>()
  const [timeoutIdState, setTimeoutIdState] = useState<NodeJS.Timer>()

  const resetCounter = (intervalId : NodeJS.Timer | undefined, timeoutId : NodeJS.Timer | undefined) => {
    clearInterval(intervalId)
    clearTimeout(timeoutId)
    setSessionTime(initialTime)
  }

  const startCounter = () => {
    setButtonState(buttonState == "START" ? "RESET" : "START")

    if(progress == 4){
      setProgress(0)
      setButtonState("START")

    } else if (buttonState == "START") {
        const intervalId = setInterval(() => {
          setSessionTime(prevState => prevState - 1)
        }, 1000)
    
        setIntervalIdState(intervalId)
    
        const timeoutId = setTimeout(() => {
          setProgress(prevState => prevState + 1)
          resetCounter(intervalId, timeoutId)
          setButtonState("START")
        }, initialTime * 1000)
    
        setTimeoutIdState(timeoutId)

      } else if (buttonState == "RESET") {
          clearInterval(intervalIdState)
          clearTimeout(timeoutIdState)
          setSessionTime(initialTime)
        }
  }

  const minutesLeft = getMinutes(sessionTime)
  const secondsLeft = getSeconds(sessionTime)

  return (
    <Wrapper>
      <CircularProgressbarWithChildren strokeWidth={3} value={-sessionTime} minValue={-initialTime} maxValue={0} styles={circularProgressBarStyles}>
        <h1>{minutesLeft < 10 ? "0" + minutesLeft : minutesLeft}:{secondsLeft < 10 ? "0" + secondsLeft : secondsLeft}</h1>
      </CircularProgressbarWithChildren>
      <div>
        <button onClick={startCounter}>{buttonState}</button>
      </div>
      <figure>
				{ progress >= 1 ? <FilledCircle/> : <OutlineCircle/> }
				{ progress >= 2 ? <FilledCircle/> : <OutlineCircle/> }
				{ progress >= 3 ? <FilledCircle/> : <OutlineCircle/> }
				{ progress >= 4 ? <FilledCircle/> : <OutlineCircle/> }
			</figure>
    </Wrapper>
  );
};
