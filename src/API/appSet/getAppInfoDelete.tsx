import { UseMutateFunction, useMutation } from "react-query";
import { instance } from "../instance";
import {
  IAppInfoDeleteResponse,
  IAppInfoListResponse,
} from "../../types/appSet/appInfoList.types";
import Swal from "sweetalert2";

export const getAppInfoDelete = (
  program: string,
  appInfoListMutate: UseMutateFunction<
    IAppInfoListResponse,
    unknown,
    void,
    unknown
  >,
) => {
  return useMutation<IAppInfoDeleteResponse, unknown, void, unknown>(
    "getAppInfoDelete",
    () =>
      instance.post("/appinfo/delete", {
        program,
      }),
    {
      onSuccess: (data) => {
        if (data.result === "00") {
          appInfoListMutate();

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
