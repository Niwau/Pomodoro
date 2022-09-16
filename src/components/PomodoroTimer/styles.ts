import styled from "styled-components";

export const Wrapper = styled.div`
  width: 15rem;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  h1 {
    color: #FFFFFF;
    font-weight: 900;
    font-size: 3rem;
  }

  > div {

    margin-top: 2rem;
    display: flex;
    justify-content: space-between;

    > button {
      cursor: pointer;
      border: none;
      background: none;
      font-weight: 700;
      color: #FFFFFF;
      font-size: 2rem;
    }

    
  }
  
  > figure {
    margin-top: 2rem;
    display: flex;
    justify-content: space-between;
  }

`;
