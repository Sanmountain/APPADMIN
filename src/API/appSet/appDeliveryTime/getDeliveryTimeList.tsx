import { useMutation } from "react-query";
import { instance } from "../../instance";
import { loginState } from "../../../stores/loginState";
import { useRecoilValue } from "recoil";
import { Dispatch, SetStateAction } from "react";
import {
  IAppDeliveryTimeData,
  IAppDeliveryTimeResponse,
} from "../../../types/appSet/appDeliveryTime.types";

export const getDeliveryTimeList = (
  setDeliveryTimeList: Dispatch<SetStateAction<IAppDeliveryTimeData[]>>,
) => {
  const login = useRecoilValue(loginState);

  return useMutation<IAppDeliveryTimeResponse, unknown, void, unknown>(
    "getDeliveryTimeList",
    () => instance.post("/time/list", { company: login.company }),
    {
      onSuccess: (data) => {
        if (data.result === "00") {
          setDeliveryTimeList(data.list);
        }
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
};
