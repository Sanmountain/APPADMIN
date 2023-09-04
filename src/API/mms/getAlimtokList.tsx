import { useMutation } from "react-query";
import { alimtokInstance } from "../instance";
import { useRecoilValue } from "recoil";
import { loginState } from "../../stores/loginState";
import { Dispatch, SetStateAction } from "react";
import {
  IAlimtokListData,
  IAlimtokListResponse,
} from "../../types/mms/alimtokList.types";

export const getAlimtokList = (
  page: number,
  messageType: string,
  mid: number | null,
  templateCd: string | null,
  ivNo: number | null,
  tradesubCd: number | null,
  custCd: number | null,
  smsState: string,
  serviceCd: string,
  receiver: string,
  frontDate: string,
  rearDate: string,
  setTalkSendList: Dispatch<SetStateAction<IAlimtokListData[]>>,
) => {
  const login = useRecoilValue(loginState);

  return useMutation<IAlimtokListResponse, unknown, void, unknown>(
    "getAlimtokList",
    () =>
      alimtokInstance.post("/history/db_list", {
        page,
        message_type: messageType,
        mid,
        template_cd: templateCd,
        iv_no: ivNo,
        tradesub_cd: tradesubCd,
        cust_cd: custCd,
        sms_state: smsState,
        service_cd: serviceCd,
        receiver,
        front_date: frontDate,
        rear_date: rearDate,
        company: login.company,
      }),
    {
      onSuccess: (data) => {
        if (data.result === "00") {
          // NOTE data.result 25는 데이터 없는 경우
          setTalkSendList(data.list);
        } else if (data.result === "25") {
          setTalkSendList([]);
        }
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
};
