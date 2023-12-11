import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
`;

export const FilterContainer = styled.div`
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

export const TitleContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.7fr 0.7fr 0.7fr 1fr 1fr;
  align-items: center;
  justify-items: center;
  background-color: #f8f9fa;
  width: 100%;
  height: 50px;
  margin-top: 10px;

  &.history {
    grid-template-columns: 0.7fr 0.7fr 1fr 1fr 1fr 1fr;
  }
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
  grid-template-columns: 1fr 0.7fr 0.7fr 0.7fr 1fr 1fr;
  align-items: center;
  justify-items: center;
  width: 100%;
  height: 40px;
  border: 0.3px solid #bdbdbd;
  border-radius: 5px;

  &.history {
    grid-template-columns: 0.7fr 0.7fr 1fr 1fr 1fr 1fr;
  }
`;

export const NoDataContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 400px;
  font-size: 16px;
  font-weight: 500;
`;

export const Contents = styled.div`
  width: 90%;
  outline: none;
  font-size: 16px;
  text-align: center;
`;

export const PaginationContainer = styled.div`
  width: 100%;
  height: 50px;
  margin-top: 20px;
`;
