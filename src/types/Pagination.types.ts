import { Dispatch, SetStateAction } from "react";

export interface IPaginationProps {
  total: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}
