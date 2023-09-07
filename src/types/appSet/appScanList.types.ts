export interface IAppScanListData {
  scan_ymd2: string;
  count: string;
}

export interface IAppScanListResponse {
  result: string;
  message: string;
  list: IAppScanListData[];
}
