import { styled } from "styled-components";
import { IoMdArrowBack } from "react-icons/io";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
`;

export const TopContainer = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 50px;
  gap: 50px;
  padding: 0 10px;
  margin-top: 10px;
`;

export const BackIcon = styled(IoMdArrowBack)`
  font-size: 25px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    color: #ff435e;
  }
`;

export const TextContainer = styled.div`
  font-size: 16px;
  font-weight: 600;
  width: fit-content;
`;

export const TitleContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
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

export const ContentsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-items: center;
  border: 0.3px solid #bdbdbd;
  border-radius: 5px;
  width: 100%;
  height: 40px;
`;

export const Contents = styled.div`
  font-size: 16px;
`;
