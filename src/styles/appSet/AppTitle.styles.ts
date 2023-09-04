import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  background-color: #fff;
  border-radius: 10px;
  box-shadow:
    0 14px 28px rgba(0, 0, 0, 0.25),
    0 10px 10px rgba(0, 0, 0, 0.22);
  width: 85%;
  height: 400px;
`;

export const TitleInputContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 180px;
  padding: 20px;
`;

export const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 30px;
`;

export const LatestInput = styled.input`
  width: 70%;
  height: 40px;
  padding: 0 10px;
  border-radius: 5px;
  border: none;
  background-color: #ff435e;
  color: #fff;
  font-size: 16px;
  font-weight: 600;

  &:focus {
    outline: none;
  }
`;

export const ChangeInputContainer = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 50px;
`;

export const ChangeInput = styled.input`
  width: 70%;
  height: 40px;
  padding: 0 10px;
  border-radius: 5px;
  border: 1px solid #ff435e;
  background-color: #fff;
  color: black;
  font-size: 16px;
  margin-right: 30px;

  &:focus {
    outline: 1px solid #ff435e;
  }
`;
