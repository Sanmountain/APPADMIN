export interface IMMSHistoryData {
  id: string;
  iv_no: number;
  state: string;
  tradesub_cd: number;
  dv_tel: string;
  update_date: string;
  mms_content: string;
  img_uri: string;
  success: string;
  company: string;
}

export interface IMMSHistoryResponse {
  message: string;
  result: string;
  startPage: number;
  endPage: number;
  lastPage: number;
  currentPage: number;
  list: IMMSHistoryData[];
}
