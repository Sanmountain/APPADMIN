export interface IAlimtokInvoiceData {}

export interface IAlimtokInvoiceResponse {
  message: string;
  result: string;
  startPage: number;
  endPage: number;
  lastPage: number;
  currentPage: number;
  list: IAlimtokInvoiceData[];
}
