import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 85%;
  max-width: 100%;
  min-height: 750px;
  padding: 25px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow:
    0 14px 28px rgba(0, 0, 0, 0.25),
    0 10px 10px rgba(0, 0, 0, 0.22);
`;

export const HeadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100px;
`;

export const Title = styled.div`
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 20px;
`;

export const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 95%;
  height: 40px;
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: center;

  width: 50%;
  gap: 50px;
  margin-left: 10px;
`;

export const Info = styled.div`
  font-size: 20px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 22%;
  gap: 10px;
  margin-right: 10px;
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
`;
