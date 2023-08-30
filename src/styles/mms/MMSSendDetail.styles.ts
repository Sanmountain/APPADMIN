import { styled } from "styled-components";
import { IoMdArrowBack } from "react-icons/io";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

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

export const TopContainer = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 20px;
  padding: 0px 20px;
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

export const ImageTableContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  width: 100%;
  height: 400px;
  padding: 10px;
  margin-bottom: 20px;
`;

export const Image = styled.img`
  width: 45%;
  height: 90%;
`;

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 40%;
  height: 100%;
`;

export const Table = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 40px;
  border-bottom: 1px solid #bdbdbd;
  font-size: 16px;
`;

export const TableTitle = styled.div`
  font-weight: 700;
  width: 30%;
`;

export const TableContent = styled.div`
  width: 65%;
  text-align: start;
`;

export const MMSContainer = styled.div`
  width: 92%;
  min-height: 400px;
  padding: 20px 10px;
  margin-bottom: 50px;
  border: 3px solid gray;
`;
