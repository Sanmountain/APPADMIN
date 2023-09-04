import { styled } from "styled-components";
import { mediaQuery } from "../mediaQuery";

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 85%;
  min-height: 400px;
  height: fit-content;

  background-color: #fff;
  border-radius: 10px;
  box-shadow:
    0 14px 28px rgba(0, 0, 0, 0.25),
    0 10px 10px rgba(0, 0, 0, 0.22);
`;

export const TotalTitleContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
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
  gap: 5px;

  &:last-child {
    margin-bottom: 50px;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 350px;
`;

export const TotalContentsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  align-items: center;
  justify-items: center;
  border: 0.3px solid #bdbdbd;
  border-radius: 5px;
  width: 100%;
  height: 40px;
  cursor: pointer;
`;

export const Contents = styled.div`
  width: 100%;
  font-size: 16px;
  text-align: center;
  white-space: normal;

  &.small {
    font-size: 14px;
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 130px;
  padding: 0 10px;
  margin-top: 30px;
  margin-bottom: 10px;
`;

export const FilterFlexContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-column-gap: 30px;
  grid-row-gap: 10px;

  width: 100%;
  margin-bottom: 7px;

  ${mediaQuery.largeMedium`
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr ;
  `}
`;

export const DateInput = styled.input`
  min-width: 100px;
  height: 35px;
  font-size: 16px;
`;

export const Input = styled.input`
  min-width: 100px;
  height: 35px;
`;

export const SelectBox = styled.select`
  min-width: 100px;
  height: 35px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  width: 100%;
  height: 35px;
`;

export const TitleContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr 1.5fr 1fr 1fr 1fr 1fr 1fr 1fr 1.5fr 0.7fr 0.7fr;
  grid-column-gap: 5px;
  align-items: center;
  justify-items: center;
  background-color: #f8f9fa;
  width: 100%;
  height: 50px;
  margin-top: 10px;
`;

export const NoDataContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 250px;
  font-size: 16px;
  font-weight: 500;
`;

export const ContentsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr 1.5fr 1fr 1fr 1fr 1fr 1fr 1fr 1.5fr 0.7fr 0.7fr;
  grid-column-gap: 5px;
  align-items: center;
  justify-items: center;
  border: 0.3px solid #bdbdbd;
  border-radius: 5px;
  width: 100%;
  height: 50px;
  text-align: center;
  cursor: pointer;
`;

export const PaginationContainer = styled.div`
  width: 100%;
  height: 50px;
  margin-top: 20px;
`;
