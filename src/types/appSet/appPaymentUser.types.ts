export interface IAppPaymentUserData {
  id: string;
  user_id: string;
  phone_no: string;
  free_user: "Y" | "N";
  payment_date: string;
  expire_date: string;
  company: string;
  reg_date: string;
  update_date: string;
}

export interface IAppPaymentUserResponse {
  message: string;
  result: string;
  list: IAppPaymentUserData[];
  startPage: number;
  endPage: number;
  lastPage: number;
  currentPage: number;
}

export interface IPaymentFilter {
  userId: string | null;
  phoneNumber: string;
  isFreeUser: "N" | "Y" | "";
}

export interface IAppPaymentUserRegistResponse {
  message: string;
  result: string;
  count: number;
  fail: number;
  success_list: string[] | [];
  fail_list: string[] | [];
}

export interface IPaymentUser {
  user_id: string;
  phone_no: string;
  payment_date: string;
  expire_date: string;
  free_user: string;
  qa: number;
}

export interface IPaymentUserEdit {
  [id: string]: {
    user_id: string;
    phone_no: string;
    payment_date: string;
    expire_date: string;
    free_user: string;
    month: number;
  };
}
