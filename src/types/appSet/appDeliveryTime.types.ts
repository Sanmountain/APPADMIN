export interface IAppDeliveryTimeData {
  id: number;
  dv_time_cd: number | null;
  dv_time_nm: string;
  start_date: string;
  dv_type: string;
  company: string;
  user_id: string;
  trade_cd: number;
  expire: string;
  seq: number | null;
  print: "N" | "Y";
  reg_date: string;
  update_date: string;
}

export interface IAppDeliveryTimeResponse {
  message: string;
  result: string;
  list: IAppDeliveryTimeData[];
}

export interface IDeliveryInfo {
  id?: number | null;
  dv_time_cd: null | number;
  dv_time_nm: string;
  dv_type: string;
  start_date: string;
  expire: string;
  seq: null | number;
  print: "N" | "Y";
}

export interface IAppDeliveryTimeRegistResponse {
  message: string;
  result: string;
  count: number;
  fail: number;
  success_list: string[] | [];
  fail_list: string[] | [];
}

export interface IAppDeliveryTimeDeleteResponse {
  result: string;
  message: string;
  count: number;
  fail: number;
  success_list: string[] | [];
  fail_list: string[] | [];
}
