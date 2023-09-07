import { ChangeEvent, useEffect, useState } from "react";
import CommonButton from "../../../components/common/CommonButton";
import * as S from "../../../styles/appSet/AppScan.styles";
import { IAppScanListData } from "../../../types/appSet/appScanList.types";
import { getScanUserList } from "../../../api/appSet/appScan/getScanUserList";
import Loading from "../../../components/common/Loading";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import {
  appScanFilterState,
  months,
  years,
} from "../../../stores/filter/appScanFilterState";
import { numberWithCommas } from "../../../utils/numberWithCommas";

export default function AppScan() {
  const [buttonOption, setButtonOption] = useState("search");
  const [filter, setFilter] = useRecoilState(appScanFilterState);
  const [scanUserCountList, setScanUserCountList] = useState<
    IAppScanListData[]
  >([]);

  const { mutate: scanUserListMutate, isLoading } = getScanUserList(
    setScanUserCountList,
    filter,
  );

  const navigate = useNavigate();

  useEffect(() => {
    scanUserListMutate();
  }, []);

  const handleYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      year: e.target.value,
    }));
  };

  const handleMonthChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      month: e.target.value,
    }));
  };

  const onClickIcon = () => {
    if (buttonOption === "search") setButtonOption("excel");
    else if (buttonOption === "excel") setButtonOption("search");
  };

  const onClickSearch = () => {
    scanUserListMutate();
  };

  const onClickMoveToDetail = (scanDate: string) => {
    navigate(`/app/scan/${scanDate}`);
  };

  return (
    <S.Container>
      {buttonOption === "search" ? (
        <S.TopContainer>
          <S.FilterTitle>월별 사용자수 조회</S.FilterTitle>
          <S.FilterContainer>
            <S.ExcelIcon onClick={onClickIcon} />
            <S.YearSelectBox onChange={handleYearChange} value={filter.year}>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}년
                </option>
              ))}
            </S.YearSelectBox>
            <S.MonthSelectBox onChange={handleMonthChange} value={filter.month}>
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}월
                </option>
              ))}
            </S.MonthSelectBox>
            <CommonButton contents="검색" onClickFn={onClickSearch} />
          </S.FilterContainer>
        </S.TopContainer>
      ) : (
        <S.TopContainer>
          <S.FilterTitle>스캔 유저 통계</S.FilterTitle>
          <S.FilterContainer>
            <S.UserIcon onClick={onClickIcon} />

            <S.YearSelectBox>
              {years.reverse().map((year) => (
                <option key={year} value={year}>
                  {year}년
                </option>
              ))}
            </S.YearSelectBox>
            <S.MonthSelectBox>
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}월
                </option>
              ))}
            </S.MonthSelectBox>
            <CommonButton contents="엑셀 다운" onClickFn={onClickSearch} />
          </S.FilterContainer>
        </S.TopContainer>
      )}

      <S.TitleContainer>
        <S.Title>날짜</S.Title>
        <S.Title>사용자수</S.Title>
        <S.Title>상세</S.Title>
      </S.TitleContainer>
      <S.ContentsListContainer>
        {isLoading ? (
          <Loading />
        ) : scanUserCountList.length < 1 ? (
          <S.NoDataContainer>조회된 데이터가 없습니다.</S.NoDataContainer>
        ) : (
          scanUserCountList?.map((item) => (
            <S.ContentsContainer key={item.scan_ymd2}>
              <S.Contents>{item.scan_ymd2}</S.Contents>
              <S.Contents>{numberWithCommas(item.count)}</S.Contents>
              <S.Contents>
                <CommonButton
                  contents="상세"
                  onClickFn={() => onClickMoveToDetail(item.scan_ymd2)}
                />
              </S.Contents>
            </S.ContentsContainer>
          ))
        )}
      </S.ContentsListContainer>
    </S.Container>
  );
}
