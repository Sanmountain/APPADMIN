import { useMutation } from "react-query";
import { instance } from "../instance";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loginState } from "../../stores/loginState";
import { IMMSHistoryResponse } from "../../types/mms/MMSHistory.types";
import { MMSSendListState } from "../../stores/MMSSendListState";
import { MMSSendFilterState } from "../../stores/filter/MMSSendFilterState";

export const getMMSSendList = (page: number | undefined) => {
  const login = useRecoilValue(loginState);
  const filter = useRecoilValue(MMSSendFilterState);
  const setMMSSendList = useSetRecoilState(MMSSendListState);

  return useMutation<IMMSHistoryResponse, unknown, void, unknown>(
    "getMMSSendList",
    () =>
      instance.post("/mms/history", {
        page,
        company: login.company,
        iv_no: filter.invoiceNumber,
        tradesub_cd: filter.tradeSubCode,
        dv_tel: filter.telephone,
        front_date: `${filter.startDate} 00:00:00`,
        rear_date: `${filter.endDate} 23:59:59`,
        state: filter.state,
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
