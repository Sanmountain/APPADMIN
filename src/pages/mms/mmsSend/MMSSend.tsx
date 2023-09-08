import { ChangeEvent, useEffect, useRef, useState } from "react";
import * as S from "../../../styles/mms/MMSSend.styles";
import CommonButton from "../../../components/common/CommonButton";
import { getMMSSendList } from "../../../api/mms/getMMSSendList";
import Pagination from "../../../components/common/Pagination";
import { useRecoilState, useRecoilValue } from "recoil";
import { MMSSendFilterState } from "../../../stores/filter/MMSSendFilterState";
import Loading from "../../../components/common/Loading";
import { useNavigate } from "react-router";
import { MMSSendListState } from "../../../stores/MMSSendListState";
import dayjs from "dayjs";
import { MMSExcelDownload } from "../../../utils/excel/MMSExcelDownload";
import { getAlimtokInvoiceList } from "../../../api/mms/getAlimtokInvoiceList";
import { IMMSInvoiceList } from "../../../types/mms/alimtokList.types";
import { saveAs } from "file-saver";

export default function MMSSend() {
  const [buttonOption, setButtonOption] = useState("search");
  const [filter, setFilter] = useRecoilState(MMSSendFilterState);
  const [excelFilter, setExcelFilter] = useState({
    company: "SLX",
    startDate: dayjs().format("YYYY-MM-DD"),
    endDate: dayjs().format("YYYY-MM-DD"),
    transferRate: null,
  });
  const MMSSendList = useRecoilValue(MMSSendListState);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  // NOTE 엑셀을 다운로드 할 때 invoice list 불러오도록 하는 state
  const [isDownloadExcel, setIsDownloadExcel] = useState(false);
  // NOTE 배송완료 (알림톡)
  const [finishAlimList, setFinishAlimList] = useState<IMMSInvoiceList[]>([]);
  // NOTE 배송출발 (알림톡)
  const [startAlimList, setStartAlimList] = useState<IMMSInvoiceList[]>([]);
  // NOTE 배송완료 (LMS)
  const [finishLMSList, setFinishLMSList] = useState<IMMSInvoiceList[]>([]);
  // NOTE 배송출발 (LMS)
  const [startLMSList, setStartLMSList] = useState<IMMSInvoiceList[]>([]);
  // NOTE list 담긴 후 excel download 실행
  const [readyCount, setReadyCount] = useState(0);
  const [isExcelLoading, setIsExcelLoading] = useState(false);
  // NOTE 엑셀 필터 변경 시 이전 list와 비교해서 list가 바뀔 경우 mutate되도록 하는 useRef
  const prevFinishAlimListRef = useRef<[] | IMMSInvoiceList[]>([]);
  const prevStartAlimListRef = useRef<[] | IMMSInvoiceList[]>([]);
  const prevFinishLMSListRef = useRef<[] | IMMSInvoiceList[]>([]);
  const prevStartLMSListRef = useRef<[] | IMMSInvoiceList[]>([]);

  const { mutate: MMSSendListMutate, isLoading } = getMMSSendList(
    page,
    setTotal,
  );
  // NOTE 배송완료 (알림톡) 송장 list
  const { mutate: finishAlimListMutate } = getAlimtokInvoiceList(
    excelFilter,
    "dv_c",
    "AT",
    setFinishAlimList,
  );
  // NOTE 배송출발 (알림톡) 송장 list
  const { mutate: startAlimListMutate } = getAlimtokInvoiceList(
    excelFilter,
    "dv_b",
    "AT",
    setStartAlimList,
  );
  // NOTE 배송완료 (LMS) 송장 list
  const { mutate: finishLMSListMutate } = getAlimtokInvoiceList(
    excelFilter,
    "dv_c",
    "LMS",
    setFinishLMSList,
  );
  // NOTE 배송출발 (LMS) 송장 list
  const { mutate: startLMSListMutate } = getAlimtokInvoiceList(
    excelFilter,
    "dv_b",
    "LMS",
    setStartLMSList,
  );

  const navigate = useNavigate();

  // NOTE MMS list 조회
  useEffect(() => {
    MMSSendListMutate();
  }, []);

  // NOTE 엑셀 다운로드 버튼 눌렀을 때 알림톡 송장 리스트 불러오기
  useEffect(() => {
    if (isDownloadExcel) {
      finishAlimListMutate();
      startAlimListMutate();
      finishLMSListMutate();
      startLMSListMutate();
    }
  }, [isDownloadExcel]);

  // NOTE list가 담길 때마다 readyCount +1씩 하기
  useEffect(() => {
    if (
      finishAlimList.length &&
      JSON.stringify(prevFinishAlimListRef) !== JSON.stringify(finishAlimList)
    )
      setReadyCount((prev) => prev + 1);
    if (
      startAlimList.length &&
      JSON.stringify(prevStartAlimListRef) !== JSON.stringify(startAlimList)
    )
      setReadyCount((prev) => prev + 1);
    if (
      finishLMSList.length &&
      JSON.stringify(prevFinishLMSListRef) !== JSON.stringify(finishLMSList)
    )
      setReadyCount((prev) => prev + 1);
    if (
      startLMSList.length &&
      JSON.stringify(prevStartLMSListRef) !== JSON.stringify(startLMSList)
    )
      setReadyCount((prev) => prev + 1);
  }, [finishAlimList, startAlimList, finishLMSList, startLMSList]);

  // NOTE list 담긴거 확인 후 excelDownload
  useEffect(() => {
    if (readyCount === 4) {
      const year = dayjs(excelFilter.startDate).year();
      const month = dayjs(excelFilter.startDate).month() + 1;
      const fileName = `${excelFilter.company}_계산서 발행(MMS APP이용)_${year}_${month}월.xlsx`;

      const excelData = MMSExcelDownload(
        excelFilter,
        finishAlimList,
        startAlimList,
        finishLMSList,
        startLMSList,
      );
      saveAs(excelData, `${fileName}.xlsx`);

      if (excelData) {
        setReadyCount(0);
        setIsExcelLoading(false);
        setIsDownloadExcel(false);
      }
    }
  }, [excelFilter, readyCount, isExcelLoading]);

  const handleFilterChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  const handleExcelFilterChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setExcelFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  const onClickIcon = () => {
    if (buttonOption === "search") setButtonOption("excel");
    else if (buttonOption === "excel") setButtonOption("search");
  };

  const onClickSearch = () => {
    setTotal(0);
    setPage(1);
    MMSSendListMutate();
  };

  const onClickDownloadExcel = () => {
    setIsDownloadExcel(true);
    setIsExcelLoading(true);
  };

  const onClickMoveToDetail = (id: string) => {
    navigate(`/mms/mmsSend/${id}/${page}`);
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
              <S.WorkSelectBox
                name="state"
                onChange={handleFilterChange}
                value={filter.state}
              >
                <option value="">업무구분</option>
                <option value="DU">미배송</option>
                <option value="DS">배송출발</option>
                <option value="DC">배송완료</option>
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
              <S.WorkSelectBox
                name="company"
                onChange={(e) => handleExcelFilterChange(e)}
              >
                <option value="SLX">SLX</option>
              </S.WorkSelectBox>
              <S.DateContainer>
                <S.DateInput
                  type="date"
                  name="startDate"
                  defaultValue={excelFilter.startDate}
                  onChange={(e) => handleExcelFilterChange(e)}
                />{" "}
                ~
                <S.DateInput
                  type="date"
                  name="endDate"
                  defaultValue={excelFilter.endDate}
                  onChange={(e) => handleExcelFilterChange(e)}
                />
              </S.DateContainer>
              <S.Input
                placeholder="전송량"
                name="transferRate"
                onChange={(e) => handleExcelFilterChange(e)}
              />
              <CommonButton
                contents="엑셀 다운"
                onClickFn={onClickDownloadExcel}
              />
              <div>{isExcelLoading && <Loading />}</div>
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

      <S.ContentsListContainer>
        {isLoading ? (
          <Loading />
        ) : MMSSendList.length < 1 ? (
          <S.NoDataContainer>조회된 데이터가 없습니다.</S.NoDataContainer>
        ) : (
          MMSSendList?.map((item) => (
            <S.ContentsContainer key={item.id}>
              <S.Contents>{item.update_date}</S.Contents>
              <S.Contents>{item.iv_no}</S.Contents>
              <S.Contents>
                {item.state === "DU"
                  ? "미배송"
                  : item.state === "DS"
                  ? "배송출발"
                  : "배송완료"}
              </S.Contents>
              <S.Contents>{item.tradesub_cd}</S.Contents>
              <S.Contents>{item.dv_tel}</S.Contents>
              <S.Contents>
                <CommonButton
                  contents="상세"
                  onClickFn={() => onClickMoveToDetail(item.id)}
                />
              </S.Contents>
            </S.ContentsContainer>
          ))
        )}
      </S.ContentsListContainer>

      <S.PaginationContainer>
        <Pagination
          total={total}
          page={page}
          setPage={setPage}
          mutate={MMSSendListMutate}
        />
      </S.PaginationContainer>
    </S.Container>
  );
}
