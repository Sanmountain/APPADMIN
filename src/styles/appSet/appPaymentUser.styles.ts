import { styled } from "styled-components";
import { mediaQuery } from "../mediaQuery";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
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
  grid-template-columns: 0.7fr 1fr 1fr 1fr 0.7fr 0.5fr 0.5fr;
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
  grid-template-columns: 0.7fr 1fr 1fr 1fr 0.7fr 0.5fr 0.5fr;
  align-items: center;
  justify-items: center;
  width: 100%;
  height: 60px;
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
  padding: 5px 10px;
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
  text-align: center;
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
