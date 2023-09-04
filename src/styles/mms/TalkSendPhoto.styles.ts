import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 85%;
  min-height: 400px;
  height: fit-content;

  background-color: #fff;
  border-radius: 10px;
  box-shadow:
    0 14px 28px rgba(0, 0, 0, 0.25),
    0 10px 10px rgba(0, 0, 0, 0.22);
  padding: 10px;
`;

export const TopContainer = styled.div`
  display: flex;
  align-items: center;

  width: 95%;
  height: 35px;
  font-size: 16px;
  font-weight: 600;
  margin: 20px 10px;
  gap: 15px;
`;

export const SelectBox = styled.select`
  width: 150px;
  height: 100%;
`;

export const Input = styled.input`
  width: 300px;
  height: 100%;
`;

export const ImageContainer = styled.div`
  width: 95%;
  min-height: 700px;
  height: fit-content;
  margin-bottom: 20px;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
`;
