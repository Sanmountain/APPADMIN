import { useMutation, MutateOptions } from "react-query";
import { instance } from "../../instance";
import Swal from "sweetalert2";
import {
  IAppPaymentUserRegistResponse,
  IAppPaymentUserResponse,
} from "../../../types/appSet/appPaymentUser.types";

export const getPaymentUserChangeFromPayToFree = (
  paymentUserListMutate: (
    variables: void,
    options?:
      | MutateOptions<IAppPaymentUserResponse, unknown, void, unknown>
      | undefined,
  ) => void,
) => {
  return useMutation<IAppPaymentUserRegistResponse, unknown, number, unknown>(
    "getPaymentUserChangeFromPayToFree",
    async (id: number) =>
      await instance.post("/payment_user/set_free_user", { id }),
    {
      onSuccess: (data) => {
        if (data.result === "00") {
          paymentUserListMutate();

          Swal.fire({
            icon: "success",
            title: "무료 사용자로 전환되었습니다",
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

export const getPaymentUserChangeFromFreeToPay = (
  paymentUserListMutate: (
    variables: void,
    options?:
      | MutateOptions<IAppPaymentUserResponse, unknown, void, unknown>
      | undefined,
  ) => void,
) => {
  return useMutation<IAppPaymentUserRegistResponse, unknown, number, unknown>(
    "getPaymentUserChangeFromFreeToPay",
    async (id: number) =>
      await instance.post("/payment_user/set_pay_user", {
        id,
      }),
    {
      onSuccess: (data) => {
        if (data.result === "00") {
          paymentUserListMutate();

          Swal.fire({
            icon: "success",
            title: "유료 사용자로 전환되었습니다",
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
