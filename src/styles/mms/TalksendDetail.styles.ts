import { styled } from "styled-components";
import { IoMdArrowBack } from "react-icons/io";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  padding: 20px;
`;

export const BackButtonContainer = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 30px;
  padding: 10px;
`;

export const BackIcon = styled(IoMdArrowBack)`
  font-size: 25px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    color: #ff435e;
  }
`;

export const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 500px;
  padding: 10px;
  margin-bottom: 20px;
`;

export const SeparateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 48%;
  height: 100%;
  gap: 10px;
`;

export const ContentsContainer = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 40px;
  gap: 30px;
  padding: 5px;
  border-bottom: 1px solid #bdbdbd;
`;

export const Title = styled.div`
  width: 35%;
  font-size: 18px;
  font-weight: 700;
`;

export const Contents = styled.div`
  font-size: 16px;
`;

export const BottomContainer = styled.div`
  display: flex;

  width: 100%;
  height: max-content;
  min-height: 400px;
  padding: 20px 10px;
  margin-bottom: 50px;
  border: 3px solid gray;
`;
