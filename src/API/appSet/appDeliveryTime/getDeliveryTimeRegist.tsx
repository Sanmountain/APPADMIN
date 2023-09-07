import { useMutation, MutateOptions } from "react-query";
import { instance } from "../../instance";
import { loginState } from "../../../stores/loginState";
import { useRecoilValue } from "recoil";
import {
  IAppDeliveryTimeRegistResponse,
  IAppDeliveryTimeResponse,
  IDeliveryInfo,
} from "../../../types/appSet/appDeliveryTime.types";
import Swal from "sweetalert2";
import { Dispatch, SetStateAction } from "react";

export const getDeliveryTimeRegist = (
  deliveryInfo: IDeliveryInfo,
  setDeliveryInfo: Dispatch<SetStateAction<IDeliveryInfo>>,
  deliveryTimeListMutate: (
    variables: void,
    options?:
      | MutateOptions<IAppDeliveryTimeResponse, unknown, void, unknown>
      | undefined,
  ) => void,
) => {
  const login = useRecoilValue(loginState);

  return useMutation<IAppDeliveryTimeRegistResponse, unknown, void, unknown>(
    "getDeliveryTimeRegist",
    () =>
      instance.post("/time/regist", {
        ...deliveryInfo,
        company: login.company,
        user_id: login.userId,
      }),
    {
      onSuccess: (data) => {
        if (data.result === "00") {
          setDeliveryInfo({
            dv_time_cd: null,
            dv_time_nm: "",
            dv_type: "",
            start_date: "",
            expire: "",
            seq: null,
            print: "N",
          });
          deliveryTimeListMutate();

          Swal.fire({
            icon: "success",
            title: "등록되었습니다",
            confirmButtonText: "확인",
          });
        }
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
};
