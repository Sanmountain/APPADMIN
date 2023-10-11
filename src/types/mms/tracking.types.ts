export interface IBarcodeInfoList {
  iv_no: string;
  point_nm: string;
  scan_ymd: string;
  trade_nm: string;
  trade_tel: string;
  tradesub_nm: string;
  tradesub_tel: string;
}

export interface ITrackingLogList {
  iv_no: string;
  scan_cd: string;
  log_state: string;
  log_dt: string;
  screen_nm: string;
}

export interface ITrackingDetail {
  base_ymd2: string;
  cust1_cd: string;
  cust2_cd: string;
  dv_addr: string;
  dv_addr_string: null | string;
  dv_nm: string;
  dv_sign_it: null | string;
  dv_sign_nm: string;
  dv_tel1: string;
  dv_tel2: string;
  dv_trade_cd: string;
  dv_tradesub_cd: string;
  dv_ymd2: string;
  fare_am: string;
  iv_no: string;
  iv_st_cd: string;
  mms_mode: null | string;
  pk_addr: string;
  pk_addr_string: null | string;
  pk_nm: string;
  pk_tel: string;
  pk_tel1: string;
  pk_tel2: string;
  pk_trade_cd: string;
  pk_trade_nm: string;
  pk_trade_tel: null | string;
  pk_tradesub_cd: string;
  pk_tradesub_nm: string;
  pk_tradesub_tel: string;
  pk_ymd2: string;
  rs_it: string;
  service2_cd: string;
  sp_nm: string;
  sz_nm: null | string;
  th_it: string;
  th_nm: string;
}

export interface ITrackingData extends ITrackingDetail {
  barcode_info_list: IBarcodeInfoList[];
  tracking_log_list: ITrackingLogList[];
}

export interface ITrackingResponse {
  result: string;
  message: string;
  data: ITrackingData[];
}
