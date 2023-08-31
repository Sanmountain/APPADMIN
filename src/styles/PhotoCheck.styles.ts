import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 1100px;
  max-width: 100%;
  min-height: 400px;
  height: fit-content;

  background-color: #fff;
  border-radius: 10px;
  box-shadow:
    0 14px 28px rgba(0, 0, 0, 0.25),
    0 10px 10px rgba(0, 0, 0, 0.22);
`;

export const TitleInputContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 80px;
  padding: 20px;
`;

export const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 30px;
`;

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;
  height: 30px;
  padding: 0 30px;
  margin-bottom: 15px;
`;

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;
  height: 30px;
`;

export const WorkSelectBox = styled.select`
  width: 120px;
  height: 30px;
`;

export const WorkTitle = styled.div`
  font-size: medium;
  font-weight: 800;
  margin-right: 10px;
`;

export const WorkInput = styled.input`
  width: 60%;
  height: 30px;
  margin-right: 10px;
`;
