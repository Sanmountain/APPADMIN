import { styled } from "styled-components";
import { SiMicrosoftexcel } from "react-icons/si";
import { FaUsers } from "react-icons/fa";

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

export const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 50px;
  padding: 0 10px;
`;

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  height: 50px;
  padding: 0 10px;
`;

export const FirstFilterContainer = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 50px;
  gap: 30px;
  padding-left: 10px;
`;

export const DateContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 270px;
  font-size: 16px;
  font-weight: 600;
`;

export const DateInput = styled.input`
  width: 120px;
  height: 35px;
`;

export const WorkSelectBox = styled.select`
  width: 120px;
  height: 35px;
`;

export const Input = styled.input`
  width: 150px;
  height: 35px;
`;

export const ExcelIcon = styled(SiMicrosoftexcel)`
  font-size: 25px;
  font-weight: 700;
  margin-right: 10px;
  cursor: pointer;

  &:hover {
    color: #ff435e;
  }
`;

export const UserIcon = styled(FaUsers)`
  font-size: 25px;
  font-weight: 700;
  margin-right: 10px;
  cursor: pointer;

  &:hover {
    color: #ff435e;
  }
`;

export const FilterTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  padding: 10px;
`;

export const TitleContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
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

export const NoDataContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 250px;
  font-size: 16px;
  font-weight: 500;
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
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
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
  margin-top: 20px;
`;
