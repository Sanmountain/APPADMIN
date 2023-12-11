import { Dispatch, SetStateAction } from "react";

export interface IQueryPaginationProps {
  total: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}
