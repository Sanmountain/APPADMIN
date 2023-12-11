export interface IAppPaymentHistoryData {
  amount: string;
  aqu_cd: string;
  auth_number: string;
  cash_receipt: string;
  escrow: string;
  id: string;
  installment_type: string;
  interest_type: string;
  iss_cd: string;
  msg1: string;
  msg2: string;
  order_email: string;
  order_name: string;
  order_number: string;
  pay_method: string;
  phone_no: string;
  price: string;
  product_name: string;
  qa: string;
  reg_date: string;
  result_cd: string;
  success: string;
  trade_date: string;
  trade_number: string;
  trade_time: string;
  tradesub_cd: string;
  update_date: string;
  wh_cid: string;
  wh_ctype: string;
  wh_hash: string;
}

export interface IAppPaymentHistoryResponse {
  currentPage: number;
  endPage: number;
  lastPage: number;
  list: IAppPaymentHistoryData[];
  message: string;
  result: string;
  startPage: number;
}
