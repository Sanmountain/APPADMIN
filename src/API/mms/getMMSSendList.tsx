import { useMutation } from "react-query";
import { instance } from "../instance";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loginState } from "../../stores/loginState";
import { IMMSHistoryResponse } from "../../types/mms/MMSHistory.types";
import { MMSSendListState } from "../../stores/MMSSendListState";

export const getMMSSendList = (
  page: number,
  ivNo: number | null,
  tradesubCd: number | null,
  dvTel: string,
  startDate: string,
  endDate: string,
  state: string,
) => {
  const login = useRecoilValue(loginState);
  const setMMSSendList = useSetRecoilState(MMSSendListState);

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
          console.log("data", data.list);
          setMMSSendList(data.list);
        }
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
};
