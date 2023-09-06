import { ChangeEvent, useEffect, useState } from "react";
import CommonButton from "../../../components/common/CommonButton";
import * as S from "../../../styles/mms/TalkSend.styles";
import { IAlimtokTotalData } from "../../../types/mms/alimtokTotal.types";
import { getAlimtokTotal } from "../../../api/mms/getAlimtokTotal";
import Loading from "../../../components/common/Loading";
import { IAlimtokListData } from "../../../types/mms/alimtokList.types";
import { talkSendFilterState } from "../../../stores/filter/talkSendFilterState";
import { useRecoilState } from "recoil";
import { getAlimtokList } from "../../../api/mms/getAlimtokList";
import Pagination from "../../../components/common/Pagination";
import { talkSendListState } from "../../../stores/talkSendListState";
import { useNavigate } from "react-router";

export default function TalkSend() {
  const [totalList, setTotalList] = useState<IAlimtokTotalData[]>([]);
  const [talkSendFilter, setTalkSendFilter] =
    useRecoilState(talkSendFilterState);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [talkSendList, setTalkSendList] =
    useRecoilState<IAlimtokListData[]>(talkSendListState);

  const { mutate: totalListMutate, isLoading: isTotalListLoading } =
    getAlimtokTotal(setTotalList);
  const { mutate: talkSendListMutate, isLoading: isTalkSendListLoading } =
    getAlimtokList(
      page,
      talkSendFilter.messageType,
      null,
      talkSendFilter.templateCode,
      talkSendFilter.invoiceNumber,
      talkSendFilter.tradeSubCode,
      talkSendFilter.customerCode,
      talkSendFilter.smsState,
      talkSendFilter.serviceCode,
      talkSendFilter.receiveTelephone,
      talkSendFilter.startDate,
      talkSendFilter.endDate,
      setTalkSendList,
    );

  const navigate = useNavigate();

  useEffect(() => {
    totalListMutate();
    talkSendListMutate();
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setTalkSendFilter({
      ...talkSendFilter,
      [name]: value,
    });
  };

  const onClickSearchTalkSend = () => {
    talkSendListMutate();
  };

  const onClickMoveToPhoto = (id: string) => {
    navigate(`/mms/talkSend/photo/${id}`);
  };

  const onClickMoveToDetail = (id: string) => {
    navigate(`/mms/talkSend/detail/${id}/${page}/${limit}`);
  };

  return (
    <S.Container>
      <S.TotalTitleContainer>
        <S.Title>집계월자</S.Title>
        <S.Title>메세지유형</S.Title>
        <S.Title>합계</S.Title>
        <S.Title>전송수량</S.Title>
      </S.TotalTitleContainer>

      <S.ContentsListContainer>
        {isTotalListLoading ? (
          <Loading />
        ) : totalList.length < 1 ? (
          <S.NoDataContainer>조회된 데이터가 없습니다.</S.NoDataContainer>
        ) : (
          totalList.map((item, index) => (
            <S.TotalContentsContainer key={index}>
              <S.Contents>{item.alim_month}</S.Contents>
              <S.Contents>{item.type}</S.Contents>
              <S.Contents>{item.total} 원</S.Contents>
              <S.Contents>{item.count}</S.Contents>
            </S.TotalContentsContainer>
          ))
        )}
      </S.ContentsListContainer>

      <S.FilterContainer>
        <S.FilterFlexContainer>
          <S.DateInput
            type="date"
            name="startDate"
            value={talkSendFilter.startDate}
            onChange={handleInputChange}
          />
          <S.DateInput
            type="date"
            name="endDate"
            value={talkSendFilter.endDate}
            onChange={handleInputChange}
          />
          <S.Input
            name="invoiceNumber"
            onChange={handleInputChange}
            placeholder="송장번호"
          />
          <S.Input
            name="receiveTelephone"
            onChange={handleInputChange}
            placeholder="수신자"
          />
          <S.Input
            name="tradeSubCode"
            onChange={handleInputChange}
            placeholder="사원코드"
          />
          <S.Input
            name="customerCode"
            onChange={handleInputChange}
            placeholder="거래처코드"
          />
          <S.Input
            name="serviceCode"
            onChange={handleInputChange}
            placeholder="서비스코드"
          />
          <S.SelectBox
            name="messageType"
            onChange={handleInputChange}
            value={talkSendFilter.messageType}
          >
            <option value="">유형</option>
            <option value="AT">AT</option>
            <option value="LMS">LMS</option>
            <option value="실패">실패</option>
          </S.SelectBox>
          <S.SelectBox
            name="templateCode"
            onChange={handleInputChange}
            value={talkSendFilter.templateCode}
          >
            <option value="">업무</option>
            <option value="TG_4584">배송완료 (193)</option>
            <option value="TG_4570">배송완료</option>
            <option value="TM_6355">배송출발</option>
          </S.SelectBox>
        </S.FilterFlexContainer>
        <S.ButtonContainer>
          <CommonButton contents="조회" onClickFn={onClickSearchTalkSend} />
        </S.ButtonContainer>
      </S.FilterContainer>

      <S.TitleContainer>
        <S.Title>고유번호</S.Title>
        <S.Title>송장번호</S.Title>
        <S.Title>업무분류</S.Title>
        <S.Title>스캔전송</S.Title>
        <S.Title>응답</S.Title>
        <S.Title>유형</S.Title>
        <S.Title>수신자</S.Title>
        <S.Title>단가</S.Title>
        <S.Title>알림톡결과</S.Title>
        <S.Title>LMS결과</S.Title>
        <S.Title>사진</S.Title>
        <S.Title>내용</S.Title>
      </S.TitleContainer>

      <S.ContentsListContainer>
        {isTalkSendListLoading ? (
          <Loading />
        ) : talkSendList.length < 1 ? (
          <S.NoDataContainer>조회된 데이터가 없습니다.</S.NoDataContainer>
        ) : (
          talkSendList.map((item) => (
            <S.ContentsContainer key={item.mid}>
              <S.Contents>{item.mid}</S.Contents>
              <S.Contents>{item.iv_no}</S.Contents>
              <S.Contents className="small">{item.sms_state}</S.Contents>
              <S.Contents className="small">{item.send_ymd}</S.Contents>
              <S.Contents className="small">{item.rsltdate}</S.Contents>
              <S.Contents>{item.type}</S.Contents>
              <S.Contents>{item.dv_tel1}</S.Contents>
              <S.Contents>{item.unit} 원</S.Contents>
              <S.Contents>{item.rslt_message}</S.Contents>
              <S.Contents className="small">{item.sms_state}</S.Contents>
              <S.Contents>
                <CommonButton
                  contents="사진"
                  onClickFn={() => onClickMoveToPhoto(item.mid)}
                />
              </S.Contents>
              <S.Contents>
                <CommonButton
                  contents="상세"
                  onClickFn={() => onClickMoveToDetail(item.mid)}
                />
              </S.Contents>
            </S.ContentsContainer>
          ))
        )}
      </S.ContentsListContainer>

      <S.PaginationContainer>
        <Pagination total={10} page={page} setPage={setPage} />
      </S.PaginationContainer>
    </S.Container>
  );
}
