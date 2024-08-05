import { MQ } from "../styles/breakpoints";
import styled from "styled-components";

const ContentContainer = styled.div`
  flex: auto;
  ${MQ.lg} {
    width: 100%;
  }
  ${MQ.sm} {
    
  }
  margin: auto;
  width: 50%;
`;

export default ContentContainer;