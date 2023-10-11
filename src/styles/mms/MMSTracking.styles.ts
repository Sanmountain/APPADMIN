import styled from "styled-components";
import {
  FaComputer,
  FaWarehouse,
  FaTruckFast,
  FaHouseChimney,
  FaHouseCircleCheck,
} from "react-icons/fa6";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const TopContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100px;
  padding: 0 10px;
  background-color: #f5f5f5;
`;

export const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 40px;
  gap: 30px;
  padding: 0 10px;
`;

export const FilterTitle = styled.label`
  font-size: 18px;
  font-weight: 700;
`;

export const Input = styled.input`
  width: 350px;
  height: 100%;
`;

export const TitleContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  align-items: center;
  justify-items: center;
  background-color: #f8f9fa;
  width: 100%;
  height: 50px;
  margin-top: 30px;

  &.tracking {
    grid-template-columns: 1fr 1fr 1fr;
  }

  &.log {
    grid-template-columns: 0.5fr 1fr 2fr 1fr;
  }
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
  grid-template-columns: 1fr 1fr 1fr 1fr;
  align-items: center;
  justify-items: center;
  border: 0.3px solid #bdbdbd;
  border-radius: 5px;
  width: 100%;
  height: 40px;

  &.tracking {
    grid-template-columns: 1fr 1fr 1fr;
  }

  &.log {
    grid-template-columns: 0.5fr 1fr 2fr 1fr;
  }
`;

export const Contents = styled.div`
  font-size: 16px;
`;

export const ShipmentContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 85%;
  height: 150px;
  margin-top: 50px;
  margin-bottom: 70px;

  &::before {
    content: "";
    position: absolute;
    top: 43%;
    left: 0.5%;
    right: 0;
    width: 99%;
    height: 2px;
    background-color: #bdbdbd;
  }
`;

export const IconTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100px;
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  background-color: #f8f9fa;
  border-radius: 50%;
  z-index: 2;
`;

export const IconTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin-top: 10px;
`;

export const ComputerIcon = styled(FaComputer)`
  width: 50px;
  height: 50px;
  color: black;

  &.active {
    color: #ff4b2b;
  }
`;

export const WarehouseIcon = styled(FaWarehouse)`
  width: 50px;
  height: 50px;
  color: black;

  &.active {
    color: #ff4b2b;
  }
`;

export const TruckIcon = styled(FaTruckFast)`
  width: 50px;
  height: 50px;
  color: black;

  &.active {
    color: #ff4b2b;
  }
`;

export const HouseIcon = styled(FaHouseChimney)`
  width: 50px;
  height: 50px;
  color: black;

  &.active {
    color: #ff4b2b;
  }
`;

export const HouseCheckIcon = styled(FaHouseCircleCheck)`
  width: 50px;
  height: 50px;
  color: black;

  &.active {
    color: #ff4b2b;
  }
`;

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
`;

export const TableTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
`;
