import { ChangeEvent, useEffect, useRef, useState } from "react";
import CommonButton from "../../../components/common/CommonButton";
import * as S from "../../../styles/appSet/AppScan.styles";
import {
  IAppScanListData,
  IExcelFilter,
  IUserCount,
} from "../../../types/appSet/appScanList.types";
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
import dayjs from "dayjs";
import { scanUserExcelDownload } from "../../../utils/excel/scanUserExcelDownload";
import { saveAs } from "file-saver";
import { getScanUserExcelList } from "../../../api/appSet/appScan/getScanUserExcelList";

export default function AppScan() {
  const [buttonOption, setButtonOption] = useState("search");
  const [filter, setFilter] = useRecoilState(appScanFilterState);
  const [scanUserCountList, setScanUserCountList] = useState<
    IAppScanListData[]
  >([]);
  const [excelFilter, setExcelFilter] = useState<IExcelFilter>({
    year: `${dayjs().year()}`,
    month: `${dayjs().month() + 1}`,
  });
  const [isDownloadExcel, setIsDownloadExcel] = useState(false);
  // NOTE SLX 사용자 사원코드
  const [SLXUserCode, setSLXUserCode] = useState<string[]>([]);
  // NOTE SLX 사용자수
  const [SLXUserCount, setSLXUserCount] = useState<IUserCount[]>([]);
  // NOTE KB 사용자 사원코드
  const [KBUserCode, setKBUserCode] = useState<string[]>([]);
  // NOTE KB 사용자수
  const [KBUserCount, setKBUserCount] = useState<IUserCount[]>([]);
  // NOTE 유피로지스 사용자 사원코드
  const [UPLogisUserCode, setUPLogisUserCode] = useState<string[]>([]);
  // NOTE 유피로지스 사용자수
  const [UPLogisUserCount, setUPLogisUserCount] = useState<IUserCount[]>([]);
  const [readyCount, setReadyCount] = useState(0);
  const [isExcelLoading, setIsExcelLoading] = useState(false);

  const prevSLXUserCodeRef = useRef<[] | string[]>([]);
  const prevSLXUserCountRef = useRef<[] | IUserCount[]>([]);
  const prevKBUserCodeRef = useRef<[] | string[]>([]);
  const prevKBUserCountRef = useRef<[] | IUserCount[]>([]);
  const prevUPLogisUserCodeRef = useRef<[] | string[]>([]);
  const prevUPLogisUserCountRef = useRef<[] | IUserCount[]>([]);

  const { mutate: scanUserListMutate, isLoading } = getScanUserList(
    setScanUserCountList,
    filter,
  );
  const { mutate: scanUserExcelListMutate } = getScanUserExcelList(
    setSLXUserCode,
    setSLXUserCount,
    setKBUserCode,
    setKBUserCount,
    setUPLogisUserCode,
    setUPLogisUserCount,
    excelFilter,
  );

  const navigate = useNavigate();

  // NOTE scan user list 조회
  useEffect(() => {
    scanUserListMutate();
  }, []);

  // NOTE 엑셀 다운로드 버튼 눌렀을 때 스캔 사용자 리스트 불러오기
  useEffect(() => {
    if (buttonOption === "excel" && isDownloadExcel) {
      scanUserExcelListMutate();
    }
  }, [isDownloadExcel]);

  // NOTE list가 이전 list상태와 달라지면 readyCount +1 하기
  useEffect(() => {
    if (
      SLXUserCode?.length &&
      JSON.stringify(prevSLXUserCodeRef) !== JSON.stringify(SLXUserCode)
    ) {
      setReadyCount((prev) => prev + 1);
    }
    if (
      SLXUserCount?.length &&
      JSON.stringify(prevSLXUserCountRef) !== JSON.stringify(SLXUserCount)
    ) {
      setReadyCount((prev) => prev + 1);
    }
    if (
      KBUserCode?.length &&
      JSON.stringify(prevKBUserCodeRef) !== JSON.stringify(KBUserCode)
    ) {
      setReadyCount((prev) => prev + 1);
    }
    if (
      KBUserCount?.length &&
      JSON.stringify(prevKBUserCountRef) !== JSON.stringify(KBUserCount)
    ) {
      setReadyCount((prev) => prev + 1);
    }
    if (
      UPLogisUserCode?.length &&
      JSON.stringify(prevUPLogisUserCodeRef) !== JSON.stringify(UPLogisUserCode)
    ) {
      setReadyCount((prev) => prev + 1);
    }
    if (
      UPLogisUserCount?.length &&
      JSON.stringify(prevUPLogisUserCountRef) !==
        JSON.stringify(UPLogisUserCount)
    ) {
      setReadyCount((prev) => prev + 1);
    }
  }, [
    SLXUserCode,
    SLXUserCount,
    KBUserCode,
    KBUserCount,
    UPLogisUserCode,
    UPLogisUserCount,
  ]);

  // NOTE list 담긴거 확인 후 excelDownload
  useEffect(() => {
    if (readyCount === 6) {
      const fileName = `${excelFilter.year}년 ${excelFilter.month}월 앱 사용정보`;

      const excelData = scanUserExcelDownload(
        excelFilter,
        SLXUserCode,
        SLXUserCount,
        KBUserCode,
        KBUserCount,
        UPLogisUserCode,
        UPLogisUserCount,
      );
      saveAs(excelData, `${fileName}.xlsx`);

      if (excelData) {
        setReadyCount(0);
        setIsExcelLoading(false);
        setIsDownloadExcel(false);
      }
    }
  }, [excelFilter, readyCount, isExcelLoading]);

  const handleSearchFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFilter({ ...filter, [name]: value });
  };

  const handleExcelFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    setExcelFilter({ ...excelFilter, [name]: value });
  };

  const onClickIcon = () => {
    if (buttonOption === "search") setButtonOption("excel");
    else if (buttonOption === "excel") setButtonOption("search");
  };

  const onClickSearch = () => {
    scanUserListMutate();
  };

  const onClickDownloadExcel = () => {
    setIsDownloadExcel(true);
    setIsExcelLoading(true);
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
            <S.YearSelectBox
              name="year"
              onChange={handleSearchFilter}
              value={filter.year}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}년
                </option>
              ))}
            </S.YearSelectBox>
            <S.MonthSelectBox
              name="month"
              onChange={handleSearchFilter}
              value={filter.month}
            >
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
            {isExcelLoading && (
              <S.LoadingContainer>
                <Loading />
              </S.LoadingContainer>
            )}
            <S.UserIcon onClick={onClickIcon} />

            <S.YearSelectBox
              name="year"
              value={excelFilter.year}
              onChange={handleExcelFilter}
            >
              {years.reverse().map((year) => (
                <option key={year} value={year}>
                  {year}년
                </option>
              ))}
            </S.YearSelectBox>
            <S.MonthSelectBox
              name="month"
              value={excelFilter.month}
              onChange={handleExcelFilter}
            >
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}월
                </option>
              ))}
            </S.MonthSelectBox>
            <CommonButton
              contents="엑셀 다운"
              onClickFn={onClickDownloadExcel}
            />
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
        ) : scanUserCountList?.length < 1 ? (
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
