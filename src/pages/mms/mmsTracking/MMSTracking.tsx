import CommonButton from "../../../components/common/CommonButton";
import * as S from "../../../styles/mms/MMSTracking.styles";
import { ChangeEvent, useState } from "react";
import { getTracking } from "../../../api/mms/getTracking";
import {
  IBarcodeInfoList,
  ITrackingDetail,
  ITrackingLogList,
} from "../../../types/mms/tracking.types";
import Swal from "sweetalert2";
import Loading from "../../../components/common/Loading";

export default function MMSTracking() {
  const [trackingDetail, setTrackingDetail] = useState<ITrackingDetail>();
  const [trackingInfoList, setTrackingInfoList] = useState<IBarcodeInfoList[]>(
    [],
  );
  const [trackingLogList, setTrackingLogList] = useState<ITrackingLogList[]>(
    [],
  );
  const [deliveryStatus, setDeliveryStatus] = useState("");
  const [barcode, setBarcode] = useState("");

  const { mutate: trackingListMutate, isLoading } = getTracking(
    barcode,
    setTrackingDetail,
    setTrackingInfoList,
    setTrackingLogList,
    setDeliveryStatus,
  );

  const handleBarcode = (e: ChangeEvent<HTMLInputElement>) => {
    setBarcode(e.target.value);
  };

  const handleSearch = () => {
    if (!barcode) {
      Swal.fire({
        icon: "warning",
        title: "송장번호를 입력해주세요.",
        confirmButtonText: "확인",
      });
    } else trackingListMutate();
  };

  return (
    <S.Container>
      <S.TopContainer>
        <S.FilterContainer>
          <S.FilterTitle>운송장번호</S.FilterTitle>
          <S.Input placeholder="송장번호" onChange={handleBarcode} />
          <CommonButton contents="조회" onClickFn={handleSearch} />
        </S.FilterContainer>
      </S.TopContainer>

      {isLoading && (
        <S.LoadingContainer>
          <Loading />
        </S.LoadingContainer>
      )}

      {trackingDetail && !isLoading && (
        <>
          <S.TitleContainer>
            <S.Title>운송장번호</S.Title>
            <S.Title>보내는 분</S.Title>
            <S.Title>받는 분</S.Title>
            <S.Title>고객 주소</S.Title>
            <S.Title>고객 번호</S.Title>
            <S.Title>상품 정보</S.Title>
          </S.TitleContainer>
          <S.ContentsListContainer>
            <S.ContentsContainer>
              <S.Contents>{trackingDetail?.iv_no}</S.Contents>
              <S.Contents>{trackingDetail?.pk_nm}</S.Contents>
              <S.Contents>{trackingDetail?.dv_nm}</S.Contents>
              <S.Contents>{trackingDetail?.dv_addr_string}</S.Contents>
              <S.Contents>{trackingDetail?.dv_tel1}</S.Contents>
              <S.Contents>{trackingDetail?.th_nm}</S.Contents>
            </S.ContentsContainer>
          </S.ContentsListContainer>

          <S.ShipmentContainer>
            <S.IconTitleContainer>
              <S.IconContainer>
                <S.BoxIcon
                  className={deliveryStatus === "집하" ? "active" : ""}
                />
              </S.IconContainer>
              <S.IconTitle>집하</S.IconTitle>
            </S.IconTitleContainer>
            <S.IconTitleContainer>
              <S.IconContainer>
                <S.WarehouseIcon
                  className={deliveryStatus === "입고" ? "active" : ""}
                />
              </S.IconContainer>
              <S.IconTitle>입고</S.IconTitle>
            </S.IconTitleContainer>
            <S.IconTitleContainer>
              <S.IconContainer>
                <S.StackedIcon
                  className={deliveryStatus === "도착" ? "active" : ""}
                />
              </S.IconContainer>
              <S.IconTitle>도착</S.IconTitle>
            </S.IconTitleContainer>
            <S.IconTitleContainer>
              <S.IconContainer>
                <S.TruckIcon
                  className={deliveryStatus === "출발" ? "active" : ""}
                />
              </S.IconContainer>
              <S.IconTitle>출발</S.IconTitle>
            </S.IconTitleContainer>
            <S.IconTitleContainer>
              <S.IconContainer>
                <S.HouseCheckIcon
                  className={deliveryStatus === "완료" ? "active" : ""}
                />
              </S.IconContainer>
              <S.IconTitle>완료</S.IconTitle>
            </S.IconTitleContainer>
          </S.ShipmentContainer>

          <S.TableContainer>
            <S.TableTitle>화물 추적</S.TableTitle>
            <S.TitleContainer className="tracking">
              <S.Title>단계</S.Title>
              <S.Title>시간</S.Title>
              <S.Title>현재위치</S.Title>
            </S.TitleContainer>
            <S.ContentsListContainer>
              {trackingInfoList?.reverse().map((item, index) => (
                <S.ContentsContainer key={index} className="tracking">
                  <S.Contents>{item.point_nm}</S.Contents>
                  <S.Contents>{item.scan_ymd}</S.Contents>
                  <S.Contents>{item.trade_nm}</S.Contents>
                </S.ContentsContainer>
              ))}
            </S.ContentsListContainer>
          </S.TableContainer>

          <S.TableContainer>
            <S.TableTitle>로그 내역</S.TableTitle>
            <S.TitleContainer className="log">
              <S.Title>스캔코드</S.Title>
              <S.Title>시간</S.Title>
              <S.Title>상태</S.Title>
              <S.Title>화면 이름</S.Title>
            </S.TitleContainer>
            <S.ContentsListContainer>
              {trackingLogList?.map((item, index) => (
                <S.ContentsContainer key={index} className="log">
                  <S.Contents>{item.scan_cd}</S.Contents>
                  <S.Contents>{item.log_dt}</S.Contents>
                  <S.Contents>{item.log_state}</S.Contents>
                  <S.Contents>{item.screen_nm}</S.Contents>
                </S.ContentsContainer>
              ))}
            </S.ContentsListContainer>
          </S.TableContainer>
        </>
      )}
    </S.Container>
  );
}
