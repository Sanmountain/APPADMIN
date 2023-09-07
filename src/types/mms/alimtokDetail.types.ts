export interface IAlimtokDetailData {
  button_json: string;
  message: string;
  mid: string;
  msgid: string;
  phone: string;
  reportdate: string;
  reqdate: string;
  rslt: string;
  rslt_message: string;
  rsltdate: string;
  sender: string;
  senderKey: string;
  sentdate: string;
  smid: string;
  sms_state: string;
  status: string;
  total: string;
  tpl_code: string;
  type: string;
  unit: string;
}

export interface IAlimtokDetailResponse {
  message: string;
  result: string;
  startPage: string;
  endPage: string;
  lastPage: string;
  currentPage: string;
  list: IAlimtokDetailData;
}
