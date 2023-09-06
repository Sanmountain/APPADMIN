import { useMutation, MutateOptions } from "react-query";
import { instance } from "../../instance";
import {
  IAppDeliveryTimeDeleteResponse,
  IAppDeliveryTimeResponse,
} from "../../../types/appSet/appDeliveryTime.types";
import Swal from "sweetalert2";

export const getDeliveryTimeDelete = (
  deliveryTimeListMutate: (
    variables: void,
    options?:
      | MutateOptions<IAppDeliveryTimeResponse, unknown, void, unknown>
      | undefined,
  ) => void,
) => {
  return useMutation<IAppDeliveryTimeDeleteResponse, unknown, number, unknown>(
    "getDeliveryTimeDelete",
    (deliveryTimeId: number) =>
      instance.post("/time/delete", {
        id: deliveryTimeId,
      }),
    {
      onSuccess: (data) => {
        if (data.result === "00") {
          deliveryTimeListMutate();

          Swal.fire({
            icon: "success",
            title: "삭제되었습니다",
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
