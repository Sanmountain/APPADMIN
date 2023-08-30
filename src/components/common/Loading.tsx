import { styled } from "styled-components";
import SpinnerImg from "../../assets/image/Spinner.gif";

export default function Loading() {
  return (
    <Spinner>
      <SpinnerImage src={SpinnerImg} />
    </Spinner>
  );
}

const Spinner = styled.div`
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 13%;
  height: 22%;
  z-index: 3;
`;

const SpinnerImage = styled.img`
  width: 100%;
  height: 100%;
`;
