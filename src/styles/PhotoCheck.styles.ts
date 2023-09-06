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

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;

  width: 95%;
  height: 35px;
  margin-bottom: 20px;
  gap: 20px;
`;

export const WorkSelectBox = styled.select`
  width: 120px;
  height: 100%;
`;

export const WorkInput = styled.input`
  width: 30%;
  height: 100%;
  margin-right: 10px;
`;

export const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 95%;
  min-height: 600px;
  height: fit-content;
  margin-bottom: 20px;
`;

export const ImageInfo = styled.div`
  font-size: 18px;
  text-align: center;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
`;
