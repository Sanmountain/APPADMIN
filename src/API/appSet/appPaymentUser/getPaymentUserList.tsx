import { useMutation } from "react-query";
import { instance } from "../../instance";
import { loginState } from "../../../stores/loginState";
import { useRecoilValue } from "recoil";
import { Dispatch, SetStateAction } from "react";
import {
  IAppPaymentUserData,
  IAppPaymentUserResponse,
  IPaymentFilter,
} from "../../../types/appSet/appPaymentUser.types";
import Swal from "sweetalert2";

export const getPaymentUserList = (
  page: number,
  setTotal: Dispatch<SetStateAction<number>>,
  paymentFilter: IPaymentFilter,
  setPaymentUserList: Dispatch<SetStateAction<IAppPaymentUserData[]>>,
  setPaymentUserEdit: Dispatch<SetStateAction<any>>,
) => {
  const login = useRecoilValue(loginState);

  return useMutation<IAppPaymentUserResponse, unknown, void, unknown>(
    "getPaymentUserList",
    () =>
      instance.post("/payment_user/list", {
        company: login.company,
        page,
        user_id: paymentFilter.userId,
        phone_no: paymentFilter.phoneNumber,
        free_user: paymentFilter.isFreeUser,
      }),
    {
      onSuccess: (data) => {
        if (data.result === "00") {
          setPaymentUserList(data.list);
          setTotal(data.lastPage);

          const initialEditState = data.list.reduce(
            (obj, item) => ({
              ...obj,
              [item.id]: {
                user_id: item.user_id,
                phone_no: item.phone_no,
                payment_date: item.payment_date,
                expire_date: item.expire_date,
                free_user: item.free_user,
                month: item.qa,
              },
            }),
            {},
          );
          setPaymentUserEdit(initialEditState);
        } else if (data.result === "25") {
          Swal.fire({
            icon: "warning",
            title: "조회 결과가 없습니다.",
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
