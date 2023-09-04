import { useMutation } from "react-query";
import { alimtokInstance } from "../instance";
import { useRecoilValue } from "recoil";
import { loginState } from "../../stores/loginState";
import { IAlimtokInvoiceResponse } from "../../types/mms/alimtokInvoice.types";
import { talkSendFilterState } from "../../stores/filter/talkSendFilterState";
import { Dispatch, SetStateAction } from "react";

export const getAlimtokInvoice = (
  invoiceNumber: number | null,
  setImageUrl: Dispatch<SetStateAction<any>>,
) => {
  const login = useRecoilValue(loginState);
  const talkSendFilter = useRecoilValue(talkSendFilterState);

  return useMutation<IAlimtokInvoiceResponse, unknown, void, unknown>(
    "getAlimtokInvoice",
    () =>
      alimtokInstance.post("/history/db_invoice", {
        company: login.company,
        front_date: talkSendFilter.startDate,
        rear_date: talkSendFilter.endDate,
        template_cd: talkSendFilter.templateCode,
        delivery_code: String(invoiceNumber),
        type: talkSendFilter.messageType,
      }),
    {
      onSuccess: (data) => {
        if (data.result === "00" || data.result === "25") {
          if (data.list.length < 1) {
            setImageUrl("");
          } else setImageUrl(data.list);
        }
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
};
