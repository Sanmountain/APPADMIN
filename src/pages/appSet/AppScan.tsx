import { useState } from "react";
import CommonButton from "../../components/common/CommonButton";
import * as S from "../../styles/appSet/AppScan.styles";

export default function AppScan() {
  const [buttonOption, setButtonOption] = useState("search");

  // NOTE 2018년부터 현재까지 selectBox
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2017 }, (_, i) => 2018 + i);
  // NOTE 월 selectBox
  const months = Array.from({ length: 12 }, (_, i) => 1 + i);

  const onClickIcon = () => {
    if (buttonOption === "search") setButtonOption("excel");
    else if (buttonOption === "excel") setButtonOption("search");
  };

  const onClickSearch = () => {
    console.log("dddd");
  };

  return (
    <S.Container>
      {buttonOption === "search" ? (
        <S.TopContainer>
          <S.FilterTitle>월별 사용자수 조회</S.FilterTitle>
          <S.FilterContainer>
            <S.ExcelIcon onClick={onClickIcon} />
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
        <S.ContentsContainer>
          <S.Contents>날짜</S.Contents>
          <S.Contents>사용자수</S.Contents>
          <S.Contents>상세</S.Contents>
        </S.ContentsContainer>
      </S.ContentsListContainer>
    </S.Container>
  );
}
