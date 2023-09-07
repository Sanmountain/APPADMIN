export interface IAlimtokInvoiceListResponse {
  currentPage: number;
  endPage: number;
  lastPage: number;
  list: { iv_no: number }[];
  message: string;
  result: string;
  startPage: number;
}
