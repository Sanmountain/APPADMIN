import { ChangeEvent, useEffect, useState } from "react";
import CommonButton from "../../components/common/CommonButton";
import * as S from "../../styles/appSet/AppScan.styles";
import { IAppScanCountListData } from "../../types/appSet/appScanList.types";
import { getScanUserList } from "../../api/appSet/appScan/getScanUserList";
import Loading from "../../components/common/Loading";
import { useNavigate } from "react-router";

export default function AppScan() {
  // NOTE 현재부터 2018년까지 selectBox
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2017 },
    (_, i) => 2018 + i,
  ).reverse();
  // NOTE 월 selectBox
  const months = Array.from({ length: 12 }, (_, i) => 1 + i);

  const [buttonOption, setButtonOption] = useState("search");
  const [filter, setFilter] = useState({
    year: years[0].toString(),
    month: months[0].toString(),
  });
  const [scanUserCountList, setScanUserCountList] = useState<
    IAppScanCountListData[]
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
            <S.YearSelectBox onChange={handleYearChange}>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}년
                </option>
              ))}
            </S.YearSelectBox>
            <S.MonthSelectBox onChange={handleMonthChange}>
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
            <S.ContentsContainer key={item.scanDate}>
              <S.Contents>{item.scanDate}</S.Contents>
              <S.Contents>{item.userCount}</S.Contents>
              <S.Contents>
                <CommonButton
                  contents="상세"
                  onClickFn={() => onClickMoveToDetail(item.scanDate)}
                />
              </S.Contents>
            </S.ContentsContainer>
          ))
        )}
      </S.ContentsListContainer>
    </S.Container>
  );
}
