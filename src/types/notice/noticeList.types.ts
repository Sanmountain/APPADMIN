export interface INoticeListData {
  id: string;
  title: string;
  content: string;
  file_name: string | null;
  file_uuid: string | null;
  user_id: string;
  reg_date: string;
  update_date: string;
  company: string;
  trades: string;
  popup: "Y" | "N";
  expire: string;
}

export interface INoticeListResponse {
  message: string;
  result: string;
  startPage: number;
  lastPage: number;
  currentpage: number;
  list: INoticeListData[];
}
