import { styled } from "styled-components";
import {
  FiChevronsLeft,
  FiChevronLeft,
  FiChevronRight,
  FiChevronsRight,
} from "react-icons/fi";

export const Container = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 5px;
`;

export const PaginationButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  min-width: 32px;
  height: 32px;
  padding: 8px;
  margin: 0;
  background-color: transparent;
  border: none;
  color: black;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;

  &[disabled] {
    color: #bdbdbd;
    background-color: transparent;
    border: none;
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background-color: #ff435e;
    color: #fff;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;

export const FirstIcon = styled(FiChevronsLeft)`
  font-size: 16px;
`;

export const PrevIcon = styled(FiChevronLeft)`
  font-size: 16px;
`;

export const NextIcon = styled(FiChevronRight)`
  font-size: 16px;
`;

export const LastIcon = styled(FiChevronsRight)`
  font-size: 16px;
`;
