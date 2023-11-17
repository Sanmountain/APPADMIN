import { styled } from "styled-components";
import { mediaQuery } from "../mediaQuery";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  padding: 20px;

  ${mediaQuery.small`
    padding: 10px;
  `}

  &.popup {
    padding: 10px;
  }
`;

export const HeadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100px;

  ${mediaQuery.small`
    margin-top: 20px;
    height: fit-content;
  `}
`;

export const Title = styled.div`
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 20px;

  ${mediaQuery.small`
    font-size: 22px;
  `}
`;

export const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 95%;
  height: 40px;

  ${mediaQuery.small`
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    height: 80px;
    gap: 10px;
  `}
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: center;

  width: 50%;
  gap: 50px;
  margin-left: 10px;

  ${mediaQuery.small`
    width: 100%;
    margin-left: 0;
    justify-content: space-between;
    align-item: center;
    margin-bottom: 10px;
    gap: 0;
  `}
`;

export const Info = styled.div`
  font-size: 20px;

  ${mediaQuery.small`
    font-size: 16px;
  `}
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 22%;
  gap: 10px;
  margin-right: 10px;

  ${mediaQuery.small`
    width: 100%;
  `}
`;

export const EditDeleteButton = styled.button`
  font-size: 18px;
  font-weight: 600;
  color: black;
  padding: 5px 10px;
  background-color: transparent;
  border: 1px solid gray;
  border-radius: 10px;
  cursor: pointer;
`;

export const DetailContainer = styled.div`
  width: 95%;
  height: fit-content;
  padding: 10px;

  ${mediaQuery.small`
    margin-bottom: 10px;
  `}

  &.popup {
    width: 100%;
    padding: 0;
  }
`;

export const DateContainer = styled.div`
  display: flex;
  align-items: center;
  width: 95%;
  height: fit-content;
  padding: 20px 10px;
  gap: 15px;
  margin-top: 20px;
  border-top: 1px solid #bdbdbd;
`;

export const DateInfo = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
`;

export const DateInput = styled.input`
  width: 150px;
  height: 35px;
`;
