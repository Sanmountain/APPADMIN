import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 85%;
  min-height: 400px;
  height: fit-content;

  background-color: #fff;
  border-radius: 10px;
  box-shadow:
    0 14px 28px rgba(0, 0, 0, 0.25),
    0 10px 10px rgba(0, 0, 0, 0.22);
`;

export const TitleContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr 1fr 1fr 0.5fr 0.7fr 0.7fr;
  align-items: center;
  justify-items: center;
  background-color: #f8f9fa;
  width: 100%;
  height: 50px;
`;

export const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  text-align: center;
`;

export const ContentsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 650px;
  gap: 10px;
`;

export const ContentsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr 1fr 1fr 0.5fr 0.7fr 0.7fr;
  align-items: center;
  justify-items: center;
  width: 100%;
  height: 60px;
`;

export const Contents = styled.input`
  width: 90%;
  height: 32px;
  border: none;
  border-radius: 10px;
  outline: none;
  background-color: rgb(233, 233, 233);
  font-size: 16px;
  text-align: center;
`;

export const CheckBox = styled.input`
  width: 20px;
  height: 20px;
`;
