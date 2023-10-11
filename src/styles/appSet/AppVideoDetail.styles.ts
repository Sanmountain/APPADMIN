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
`;

export const HeadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100px;
  margin-top: 20px;

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
    width: 95%;
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

export const VideoContainer = styled.div`
  width: 95%;
  height: 500px;
  border: 1px solid #bdbdbd;
  border-radius: 5px;
  margin: 20px 0;

  ${mediaQuery.small`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 200px;
    overflow: hidden;
  `}
`;

export const ContentsContainer = styled.div`
  width: 95%;
  height: fit-content;
  padding: 10px;
  margin-bottom: 50px;
  font-size: 16px;
`;
