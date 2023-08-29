import { MutateOptions, useMutation } from "react-query";
import { instance } from "../../instance";
import {
  IAppInfoDeleteResponse,
  IAppInfoListResponse,
} from "../../../types/appSet/appInfoList.types";
import Swal from "sweetalert2";

export const getAppInfoDelete = (
  appInfoListMutate: (
    variables: void,
    options?:
      | MutateOptions<IAppInfoListResponse, unknown, void, unknown>
      | undefined,
  ) => void,
) => {
  return useMutation<IAppInfoDeleteResponse, unknown, any, unknown>(
    "getAppInfoDelete",
    (program: string) =>
      instance.post("/appinfo/delete", {
        program,
      }),
    {
      onSuccess: (data) => {
        if (data.result === "00") {
          Swal.fire({
            icon: "success",
            title: "삭제되었습니다",
            confirmButtonText: "확인",
          });

          appInfoListMutate();
        }
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
};
