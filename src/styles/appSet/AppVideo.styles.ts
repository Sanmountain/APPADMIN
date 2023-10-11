import { styled } from "styled-components";
import { mediaQuery } from "../mediaQuery";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
`;

export const WriteButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  width: 100%;
  height: 40px;
  padding: 10px;
  margin-top: 10px;
`;

export const ContentsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  gap: 10px;

  &:last-child {
    margin-bottom: 50px;
  }
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
  display: flex;
  align-items: center;

  width: 100%;
  height: 180px;
  padding: 5px;
  gap: 30px;
  border: 1px solid gray;
  border-radius: 5px;
  cursor: pointer;

  ${mediaQuery.small`
    height: 100px;
  `}
`;

export const ThumbnailContainer = styled.div`
  width: 25%;
  height: 100%;

  ${mediaQuery.small`
    display: none;
  `}
`;

export const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 65%;
  height: 100%;
  padding: 5px;
  gap: 5px;

  ${mediaQuery.small`
    width: 100%;
    padding: 0;
  `}
`;

export const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 30px;

  ${mediaQuery.small`
    font-size: 18px;
    margin-bottom: 10px;
  `}
`;

export const UploadDate = styled.div`
  font-size: 16px;
  font-weight: 500;

  ${mediaQuery.small`
    font-size: 14px;
  `}
`;

export const UploadUser = styled.div`
  font-size: 14px;
`;

export const PaginationContainer = styled.div`
  width: 100%;
  height: 50px;
  margin-top: 20px;
`;
