import styled from "styled-components";
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
  height: 20px;
  padding: 0px 20px;
  margin-top: 20px;
`;

export const BackIcon = styled(IoMdArrowBack)`
  font-size: 25px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    color: #ff435e;
  }
`;

export const TableContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 500px;
  padding: 20px;
  /* margin-bottom: 20px; */
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
