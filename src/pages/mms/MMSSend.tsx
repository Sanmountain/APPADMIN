import { ChangeEvent, useEffect, useState } from "react";
import * as S from "../../styles/mms/MMSSend.styles";
import CommonButton from "../../components/common/CommonButton";
import { IMMSHistoryData } from "../../types/mms/MMSHistory.types";
import { getMMSSendList } from "../../api/mms/getMMSSendList";
import dayjs from "dayjs";
import Pagination from "../../components/common/Pagination";

export default function MMSSend() {
  const [buttonOption, setButtonOption] = useState("search");
  const [filter, setFilter] = useState({
    startDate: dayjs().format("YYYY-MM-DD"),
    endDate: dayjs().format("YYYY-MM-DD"),
    state: "",
    invoiceNumber: null,
    telephone: "",
    tradeSubCode: null,
  });
  const [MMSSendList, setMMSSendList] = useState<IMMSHistoryData[]>([]);
  const [page, setPage] = useState(1);

  const { mutate: MMSSendListMutate } = getMMSSendList(
    page,
    filter.invoiceNumber,
    filter.tradeSubCode,
    filter.telephone,
    filter.startDate,
    filter.endDate,
    filter.state,
    setMMSSendList,
  );

  useEffect(() => {
    MMSSendListMutate();
  }, []);

  const handleFilterChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  const onClickIcon = () => {
    if (buttonOption === "search") setButtonOption("excel");
    else if (buttonOption === "excel") setButtonOption("search");
  };

  const onClickSearch = () => {
    MMSSendListMutate();
  };

  return (
    <S.Container>
      {buttonOption === "search" ? (
        <>
          <S.TopContainer>
            <S.FilterTitle>MMS 전송내역 조회</S.FilterTitle>
            <S.ExcelIcon onClick={onClickIcon} />
          </S.TopContainer>
          <S.FilterContainer>
            <S.FirstFilterContainer>
              <S.DateContainer>
                <S.DateInput
                  type="date"
                  name="startDate"
                  value={filter.startDate}
                  onChange={handleFilterChange}
                />{" "}
                ~
                <S.DateInput
                  type="date"
                  name="endDate"
                  value={filter.endDate}
                  onChange={handleFilterChange}
                />
              </S.DateContainer>
              <S.WorkSelectBox name="state" onChange={handleFilterChange}>
                <option disabled hidden selected>
                  업무구분
                </option>
                <option>미배송</option>
                <option>배송출발</option>
                <option>배송완료</option>
              </S.WorkSelectBox>
              <S.Input
                placeholder="송장번호"
                name="invoiceNumber"
                value={
                  filter.invoiceNumber === null ? "" : filter.invoiceNumber
                }
                onChange={handleFilterChange}
              />
              <S.Input
                placeholder="수신인전화"
                name="telephone"
                value={filter.telephone}
                onChange={handleFilterChange}
              />
              <S.Input
                placeholder="사원코드"
                name="tradeSubCode"
                value={filter.tradeSubCode === null ? "" : filter.tradeSubCode}
                onChange={handleFilterChange}
              />
              <CommonButton contents="검색" onClickFn={onClickSearch} />
            </S.FirstFilterContainer>
          </S.FilterContainer>
        </>
      ) : (
        <>
          <S.TopContainer>
            <S.FilterTitle>MMS 월별통계 엑셀 다운로드</S.FilterTitle>
            <S.UserIcon onClick={onClickIcon} />
          </S.TopContainer>

          <S.FilterContainer>
            <S.FirstFilterContainer>
              <S.DateContainer>
                <S.DateInput type="date" /> ~
                <S.DateInput type="date" />
              </S.DateContainer>
              <S.WorkSelectBox>
                <option disabled hidden selected>
                  업무구분
                </option>
                <option>미배송</option>
                <option>배송출발</option>
                <option>배송완료</option>
              </S.WorkSelectBox>
              <S.Input placeholder="전송량 1" />
              <S.Input placeholder="전송량 2" />
              <CommonButton contents="엑셀 다운" onClickFn={onClickSearch} />
            </S.FirstFilterContainer>
          </S.FilterContainer>
        </>
      )}

      <S.TitleContainer>
        <S.Title>발송일</S.Title>
        <S.Title>송장번호</S.Title>
        <S.Title>업무구분</S.Title>
        <S.Title>사원코드</S.Title>
        <S.Title>수신인</S.Title>
        <S.Title>상세</S.Title>
      </S.TitleContainer>

      {MMSSendList.length < 1 ? (
        <S.NoDataContainer>조회된 데이터가 없습니다.</S.NoDataContainer>
      ) : (
        <S.ContentsListContainer>
          {MMSSendList?.map((item) => (
            <S.ContentsContainer key={item.id}>
              <S.Contents>{item.update_date}</S.Contents>
              <S.Contents>{item.iv_no}</S.Contents>
              <S.Contents>{item.state}</S.Contents>
              <S.Contents>{item.tradesub_cd}</S.Contents>
              <S.Contents>{item.dv_tel}</S.Contents>
              <S.Contents>
                <CommonButton
                  contents="상세"
                  onClickFn={() => console.log("ddd")}
                />
              </S.Contents>
            </S.ContentsContainer>
          ))}
        </S.ContentsListContainer>
      )}

      <S.PaginationContainer>
        <Pagination total={10} page={page} setPage={setPage} />
      </S.PaginationContainer>
    </S.Container>
  );
}
