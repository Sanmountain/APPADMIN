import { useMutation, MutateOptions } from "react-query";
import { instance } from "../../instance";
import { loginState } from "../../../stores/loginState";
import { useRecoilValue } from "recoil";
import Swal from "sweetalert2";
import { Dispatch, SetStateAction } from "react";
import {
  IAppPaymentUserRegistResponse,
  IAppPaymentUserResponse,
  IPaymentUserEdit,
} from "../../../types/appSet/appPaymentUser.types";
import dayjs from "dayjs";

type IParams = {
  id: string;
  phoneNumber: string;
};

export const getPaymentUserEdit = (
  paymentUserEdit: IPaymentUserEdit,
  setPaymentUserEdit: Dispatch<SetStateAction<IPaymentUserEdit>>,
  paymentUserListMutate: (
    variables: void,
    options?:
      | MutateOptions<IAppPaymentUserResponse, unknown, void, unknown>
      | undefined,
  ) => void,
) => {
  const login = useRecoilValue(loginState);

  return useMutation<IAppPaymentUserRegistResponse, unknown, IParams, unknown>(
    "getPaymentUserEdit",
    ({ id, phoneNumber }) =>
      instance.post("/payment_user/update", {
        user_id: paymentUserEdit[id].user_id,
        expire_date: `${dayjs(paymentUserEdit[id].expire_date).format(
          "YYYY-MM-DD",
        )} 23:59:59`,
        payment_date: `${dayjs(paymentUserEdit[id].payment_date).format(
          "YYYY-MM-DD",
        )} 00:00:00`,
        phone_no: phoneNumber,
        free_user: paymentUserEdit[id].free_user,
        update_phone_no: paymentUserEdit[id].phone_no,
        company: login.company,
      }),
    {
      onSuccess: (data) => {
        if (data.result === "00") {
          paymentUserListMutate();

          setPaymentUserEdit({});

          Swal.fire({
            icon: "success",
            title: "수정되었습니다",
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
