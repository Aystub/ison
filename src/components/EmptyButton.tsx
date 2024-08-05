import styled from "styled-components";
import {MQ} from "../styles/breakpoints.ts";

const EmptyButton = styled.div`
  border-radius: 12px;
  height: 150px;
  width: 150px;
  ${MQ.md} {
    width: 25%;
    font-size: 16px;
  }
  padding: 12px;
  margin: 0 8px;
  color: white;
  font-weight: bold;
  font-size: 24px;
  line-height: 150px;
  text-align: center;
`;

export default EmptyButton;