import { useMutation, MutateOptions } from "react-query";
import { instance } from "../../instance";
import Swal from "sweetalert2";
import {
  IAppPaymentUserRegistResponse,
  IAppPaymentUserResponse,
} from "../../../types/appSet/appPaymentUser.types";

export const getPaymentUserDelete = (
  paymentUserListMutate: (
    variables: void,
    options?:
      | MutateOptions<IAppPaymentUserResponse, unknown, void, unknown>
      | undefined,
  ) => void,
) => {
  return useMutation<IAppPaymentUserRegistResponse, unknown, string, unknown>(
    "getPaymentUserDelete",
    (id: string) =>
      instance.post("/payment_user/delete", {
        id,
      }),
    {
      onSuccess: (data) => {
        if (data.result === "00") {
          paymentUserListMutate();

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
