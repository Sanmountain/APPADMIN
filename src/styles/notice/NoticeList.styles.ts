import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
`;

export const TitleContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr 1fr 1fr;
  align-items: center;
  justify-items: center;
  background-color: #f8f9fa;
  width: 100%;
  height: 50px;
`;

export const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
`;

export const ContentsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 650px;
  gap: 5px;
`;

export const ContentsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr 1fr 1fr;
  align-items: center;
  justify-items: center;
  border: 0.3px solid #bdbdbd;
  border-radius: 5px;
  width: 100%;
  height: 40px;
  cursor: pointer;
`;

export const Contents = styled.div`
  font-size: 16px;
`;

export const PaginationContainer = styled.div`
  width: 100%;
  height: 50px;
`;
