export interface IAlimtokListData {
  company: string;
  cust_cd: string;
  delivery_code: string;
  dv_nm: string;
  dv_tel1: string;
  dv_tel2: string;
  fcnt: string;
  fmessage: string;
  fsubject: string;
  id: string;
  image_uri: string;
  iv_no: string;
  message: string;
  mid: string;
  pk_nm: string;
  receiver: string;
  recvname: string;
  rslt: string;
  rslt_message: string;
  rsltdate: string;
  scnt: string;
  send_ymd: string;
  sender: string;
  service_cd: string;
  smid: string;
  sms_state: string;
  status: string;
  subject: string;
  success: string;
  template_cd: string;
  total: string;
  tradesub_cd: string;
  tradesub_tel: string;
  type: string;
  unit: string;
  update_date: string;
}

export interface IAlimtokListResponse {
  message: string;
  result: string;
  startPage: number;
  endPage: number;
  lastPage: number;
  currentPage: number;
  list: IAlimtokListData[];
}
