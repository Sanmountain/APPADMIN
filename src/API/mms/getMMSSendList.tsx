import { useMutation } from "react-query";
import { instance } from "../instance";
import { useRecoilValue } from "recoil";
import { loginState } from "../../stores/loginState";
import { Dispatch, SetStateAction } from "react";
import {
  IMMSHistoryData,
  IMMSHistoryResponse,
} from "../../types/mms/MMSHistory.types";

export const getMMSSendList = (
  page: number,
  ivNo: number | null,
  tradesubCd: number | null,
  dvTel: string,
  startDate: string,
  endDate: string,
  state: string,
  setMMSSendList: Dispatch<SetStateAction<IMMSHistoryData[]>>,
) => {
  const login = useRecoilValue(loginState);

  return useMutation<IMMSHistoryResponse, unknown, void, unknown>(
    "getMMSSendList",
    () =>
      instance.post("/mms/history", {
        page,
        company: login.company,
        iv_no: ivNo,
        tradesub_cd: tradesubCd,
        dv_tel: dvTel,
        front_date: `${startDate} 00:00:00`,
        rear_date: `${endDate} 23:59:59`,
        state,
      }),
    {
      onSuccess: (data) => {
        if (data.result === "00" || data.result === "25") {
          // NOTE data.result 25는 데이터 없는 경우
          setMMSSendList(data.list);
        }
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
};
