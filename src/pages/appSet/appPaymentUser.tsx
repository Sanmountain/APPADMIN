import { ChangeEvent, useEffect, useState } from "react";
import CommonButton from "../../components/common/CommonButton";
import * as S from "../../styles/appSet/appPaymentUser.styles";
import {
  IAppPaymentUserData,
  IPaymentFilter,
  IPaymentUser,
} from "../../types/appSet/appPaymentUser.types";
import { getPaymentUserList } from "../../api/appSet/appPaymentUser/getPaymentUserList";
import Pagination from "../../components/common/Pagination";
import dayjs from "dayjs";
import { getPaymentUserRegist } from "../../api/appSet/appPaymentUser/getPaymentUserRegist";
import {
  getPaymentUserChangeFromFreeToPay,
  getPaymentUserChangeFromPayToFree,
} from "../../api/appSet/appPaymentUser/getPaymentUserChangePay";
import advancedFormat from "dayjs/plugin/advancedFormat";
import duration from "dayjs/plugin/duration";
import { getPaymentUserDelete } from "../../api/appSet/appPaymentUser/getPaymentUserDelete";
dayjs.extend(advancedFormat);
dayjs.extend(duration);

export default function AppPaymentUser() {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [paymentFilter, setPaymentFilter] = useState<IPaymentFilter>({
    userId: null,
    phoneNumber: "",
    isFreeUser: "",
  });
  const [paymentUserList, setPaymentUserList] = useState<IAppPaymentUserData[]>(
    [],
  );
  // NOTE 등록
  const [paymentUser, setPaymentUser] = useState<IPaymentUser>({
    user_id: "",
    phone_no: "",
    free_user: "",
    qa: null,
  });

  // NOTE list
  const { mutate: paymentUserListMutate } = getPaymentUserList(
    page,
    setTotal,
    paymentFilter,
    setPaymentUserList,
  );
  // NOTE 등록
  const { mutate: paymentUserRegistMutate } = getPaymentUserRegist(
    paymentUser,
    setPaymentUser,
    paymentUserListMutate,
  );
  // NOTE 유료 사용자 무료 사용자로 전환
  const { mutate: paymentUserChangeFreeMutate } =
    getPaymentUserChangeFromPayToFree(paymentUserListMutate);
  // NOTE 무료 사용자 유료 사용자로 전환
  const { mutate: paymentUserChangePayMutate } =
    getPaymentUserChangeFromFreeToPay(paymentUserListMutate);
  // NOTE 삭제
  const { mutate: paymentUserDeleteMutate } = getPaymentUserDelete(
    paymentUserListMutate,
  );

  useEffect(() => {
    paymentUserListMutate();
  }, []);

  // NOTE 필터
  const handleFilter = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setPaymentFilter({ ...paymentFilter, [name]: value });
  };

  const onClickSearch = () => {
    setTotal(0);
    setPage(1);
    paymentUserListMutate();
  };

  // NOTE 새로 등록하는 값 onChange
  const handleNewInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setPaymentUser({
      ...paymentUser,
      [name]: value,
    });
  };

  // NOTE 등록
  const onClickRegister = () => {
    paymentUserRegistMutate();
  };

  // NOTE 유료, 무료 전환
  const onClickChangePay = (id: number, isFreeUser: "Y" | "N") => {
    if (isFreeUser === "Y") {
      paymentUserChangePayMutate(id);
    } else if (isFreeUser === "N") {
      paymentUserChangeFreeMutate(id);
    }
  };

  const onClickDelete = (id: number) => {
    paymentUserDeleteMutate(id);
  };

  return (
    <S.Container>
      <S.TopContainer>
        <S.Input
          placeholder="아이디"
          name="userId"
          onChange={(e) => handleFilter(e)}
        />
        <S.Input
          placeholder="전화번호"
          name="phoneNumber"
          onChange={(e) => handleFilter(e)}
        />
        <S.SelectBox name="isFreeUser" onChange={(e) => handleFilter(e)}>
          <option value="">무료 여부</option>
          <option value="Y">Y</option>
          <option value="N">N</option>
        </S.SelectBox>
        <CommonButton contents="검색" onClickFn={onClickSearch} />
      </S.TopContainer>

      <S.TitleContainer>
        <S.Title>아이디</S.Title>
        <S.Title>전화번호</S.Title>
        <S.Title>결제일</S.Title>
        <S.Title>만료일</S.Title>
        <S.Title>무료</S.Title>
        <S.Title>무료전환</S.Title>
        <S.Title>삭제</S.Title>
      </S.TitleContainer>

      <S.ContentsListContainer>
        <S.ContentsContainer className="register">
          <S.Contents
            name="user_id"
            value={paymentUser.user_id}
            onChange={(e) => handleNewInputChange(e)}
          />
          <S.Contents
            name="phone_no"
            value={paymentUser.phone_no}
            onChange={(e) => handleNewInputChange(e)}
          />
          <S.ContentsTextContainer>
            <S.ContentsWithTitle
              name="qa"
              value={paymentUser.qa || ""}
              onChange={(e) => handleNewInputChange(e)}
            />{" "}
            개월
          </S.ContentsTextContainer>
          <S.ContentsSelectBox
            name="free_user"
            value={paymentUser.free_user}
            onChange={(e) => handleNewInputChange(e)}
          >
            <option value="">무료 여부</option>
            <option value="Y">Y</option>
            <option value="N">N</option>
          </S.ContentsSelectBox>
          <S.InfoDiv>
            사용자를 등록하거나 <br /> 만기일을 조정합니다.
          </S.InfoDiv>
          <CommonButton contents="등록" onClickFn={onClickRegister} />
          <S.HiddenDiv />
        </S.ContentsContainer>
        {paymentUserList.length < 1 ? (
          <></>
        ) : (
          paymentUserList.map((item) => (
            <S.ContentsContainer key={item.id}>
              <S.Contents value={item.user_id} readOnly />
              <S.Contents value={item.phone_no} readOnly />
              <S.Contents
                type="date"
                readOnly
                value={dayjs(item.payment_date).format("YYYY-MM-DD")}
              />
              <S.Contents
                type="date"
                readOnly
                value={dayjs(item.expire_date).format("YYYY-MM-DD")}
              />
              <S.Contents value={item.free_user} readOnly />
              <CommonButton
                contents={item.free_user === "Y" ? "과금전환" : "무료전환"}
                onClickFn={() => onClickChangePay(item.id, item.free_user)}
              />
              <CommonButton
                contents="삭제"
                onClickFn={() => onClickDelete(item.id)}
              />
            </S.ContentsContainer>
          ))
        )}
      </S.ContentsListContainer>

      <S.PaginationContainer>
        <Pagination
          total={total}
          page={page}
          setPage={setPage}
          mutate={paymentUserListMutate}
        />
      </S.PaginationContainer>
    </S.Container>
  );
}
