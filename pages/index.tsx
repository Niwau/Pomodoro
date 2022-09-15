import styled from "styled-components";
import { PomodoroTimer } from "../src/components/PomodoroTimer";

const Home = () => {

  return (
    <Main>
      <PomodoroTimer/>
    </Main>
  );
};

const Main = styled.div``;

export default Home;
