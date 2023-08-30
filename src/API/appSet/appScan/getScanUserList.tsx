import { useMutation } from "react-query";
import { instance } from "../../instance";
import { loginState } from "../../../stores/loginState";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Dispatch, SetStateAction } from "react";
import {
  IAppScanCountListData,
  IAppScanListData,
  IAppScanListResponse,
} from "../../../types/appSet/appScanList.types";
import dayjs from "dayjs";
import { scanUserListState } from "../../../stores/scanUserListState";

export const getScanUserList = (
  setScanUserCountList: Dispatch<SetStateAction<IAppScanCountListData[]>>,
  date: { year: string; month: string },
) => {
  const login = useRecoilValue(loginState);
  const setScanUserList = useSetRecoilState(scanUserListState);

  const lastDayOfMonth = dayjs(
    `${date.year}-${date.month.toString().padStart(2, "0")}-01`,
  )
    .endOf("month")
    .format("YYYY-MM-DD");

  return useMutation<IAppScanListResponse, unknown, void, unknown>(
    "getScanUserList",
    () =>
      instance.post("/scan_user/list", {
        company: login.company,
        front_date: `${date.year}-${date.month
          .toString()
          .padStart(2, "0")}-01 00:00:00`,
        rear_date: `${lastDayOfMonth} 23:59:59`,
      }),
    {
      onSuccess: (data) => {
        if (data.result === "00") {
          const response = data.list;

          // NOTE 날짜별 사용자수 구하는 함수
          const countUserByDate = (
            data: IAppScanListData[],
          ): IAppScanCountListData[] => {
            return data.reduce<IAppScanCountListData[]>((acc, curr) => {
              const existing = acc.find(
                (item) => item.scanDate === curr.scan_ymd2,
              );

              if (existing) {
                existing.userCount += 1;
              } else {
                acc.push({ scanDate: curr.scan_ymd2, userCount: 1 });
              }

              return acc;
            }, []);
          };

          setScanUserCountList(countUserByDate(response));

          // NOTE 날짜 선택 시 해당 날짜에 대한 list 구하는 함수
          const groupByDate = (
            data: IAppScanListData[],
          ): Record<string, IAppScanListData[]> => {
            return data.reduce(
              (acc, curr) => {
                const date = curr.scan_ymd2;
                if (!acc[date]) {
                  acc[date] = [];
                }
                acc[date].push(curr);
                return acc;
              },
              {} as Record<string, IAppScanListData[]>,
            );
          };

          setScanUserList(groupByDate(response));
        }
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
};
