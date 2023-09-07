import { styled } from "styled-components";
import { mediaQuery } from "../mediaQuery";

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

export const TopContainer = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 50px;
  padding: 20px;
  margin: 10px 0;
  gap: 20px;
`;

export const Input = styled.input`
  width: 180px;
  height: 35px;
`;

export const SelectBox = styled.select`
  width: 180px;
  height: 35px;
`;

export const TitleContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 0.7fr 0.7fr 0.5fr;
  align-items: center;
  justify-items: center;
  background-color: #f8f9fa;
  width: 100%;
  height: 50px;
  margin-top: 10px;
`;

export const Title = styled.div`
  font-size: 18px;
  font-weight: 700;
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
  grid-template-columns: 1fr 1fr 1fr 1fr 0.7fr 0.7fr 0.5fr;
  align-items: center;
  justify-items: center;
  width: 100%;
  height: 60px;

  &.register {
    border: 1px solid rgb(233, 233, 233);
    border-radius: 10px;
    margin: 10px 0;
  }
`;

export const Contents = styled.input`
  width: 90%;
  height: 35px;
  border: none;
  border-radius: 10px;
  outline: none;
  background-color: rgb(233, 233, 233);
  font-size: 16px;
  text-align: center;
`;

export const ContentsTextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 90%;
`;

export const ContentsWithTitle = styled.input`
  width: 50%;
  height: 35px;
  border: none;
  border-radius: 10px;
  outline: none;
  background-color: rgb(233, 233, 233);
  font-size: 16px;
  text-align: center;
`;

export const ContentsSelectBox = styled.select`
  width: 88%;
  height: 35px;
  border: none;
  border-radius: 10px;
  background-color: rgb(233, 233, 233);
  outline: none;
  padding: 0 5px;
`;

export const HiddenDiv = styled.div`
  width: 90%;
  height: 35px;
  opacity: 0;
`;

export const InfoDiv = styled.div`
  width: 100%;
  height: 35px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;

  ${mediaQuery.largeMedium`
    font-size: 12px;
  `}
`;

export const PaginationContainer = styled.div`
  width: 100%;
  height: 50px;
  margin-top: 20px;
`;
