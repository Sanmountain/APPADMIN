import { Dispatch, SetStateAction } from "react";
import { UseMutateFunction } from "react-query";

export interface IPaginationProps {
  total: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  mutate: UseMutateFunction<any>;
}
