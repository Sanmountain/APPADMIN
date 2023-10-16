import { useMutation } from "react-query";
import { trackingInstance } from "../instance";
import {
  IBarcodeInfoList,
  ITrackingLogList,
  ITrackingResponse,
} from "../../types/mms/tracking.types";
import { Dispatch, SetStateAction } from "react";

export const getTracking = (
  barcode: string,
  setTrackingDetail: Dispatch<SetStateAction<any>>,
  setTrackingInfoList: Dispatch<SetStateAction<IBarcodeInfoList[]>>,
  setTrackingLogList: Dispatch<SetStateAction<ITrackingLogList[]>>,
  setDeliveryStatus: Dispatch<SetStateAction<string>>,
) => {
  return useMutation<ITrackingResponse, unknown, void, unknown>(
    "getTracking",
    () =>
      trackingInstance.post("/tracking", {
        api: "select",
        data: [{ iv_no: barcode }],
      }),
    {
      onSuccess: (data) => {
        if (data.result === "00") {
          const response = data.data[0];

          const { barcode_info_list, tracking_log_list, ...separateResponse } =
            response;

          const reverseBarcodeInfoList = [...barcode_info_list].reverse();

          setTrackingDetail(separateResponse);
          setTrackingInfoList(reverseBarcodeInfoList);
          setTrackingLogList(tracking_log_list);
          setDeliveryStatus(barcode_info_list[0].point_nm);
        }
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
};
