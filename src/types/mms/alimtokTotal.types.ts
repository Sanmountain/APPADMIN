export interface IAlimtokTotalData {
  alim_month: string;
  count: string;
  total: string;
  type: string;
}

export interface IAlimtokTotalResponse {
  message: string;
  result: string;
  startPage: number;
  endPage: number;
  lastPage: number;
  currentPage: number;
  list: IAlimtokTotalData[];
}
