export interface IAppVideoListData {
  id: string;
  title: string;
  content: string;
  file_name: string;
  file_uuid: string;
  thumbnail_name: string;
  thumbnail_uuid: string;
  user_id: string;
  read_count: number;
  reg_date: string;
  update_date: string;
  company: string;
  del_it: number;
  user_name: string;
}

export interface IAppVideoListResponse {
  message: string;
  result: string;
  startPage: number;
  endPage: number;
  lastPage: number;
  currentPage: number;
  list: IAppVideoListData[];
}
