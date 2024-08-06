import styled from "styled-components";
import {MQ} from "../styles/breakpoints.ts";

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 24px;
  ${MQ.sm} {
    align-self: center;
    width: 100vw;
    margin: 12px 0;
  }
`;

export default ButtonContainer;