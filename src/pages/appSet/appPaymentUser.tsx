import { ChangeEvent, useEffect, useState } from "react";
import CommonButton from "../../components/common/CommonButton";
import * as S from "../../styles/appSet/appPaymentUser.styles";
import {
  IAppPaymentUserData,
  IPaymentFilter,
  IPaymentUser,
  IPaymentUserEdit,
} from "../../types/appSet/appPaymentUser.types";
import { getPaymentUserList } from "../../api/appSet/appPaymentUser/getPaymentUserList";
import Pagination from "../../components/common/Pagination";
import dayjs from "dayjs";
import { getPaymentUserRegist } from "../../api/appSet/appPaymentUser/getPaymentUserRegist";
import { getPaymentUserDelete } from "../../api/appSet/appPaymentUser/getPaymentUserDelete";
import { getPaymentUserEdit } from "../../api/appSet/appPaymentUser/getPaymentUserEdit";

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
    payment_date: dayjs().format("YYYY-MM-DD"),
    expire_date: dayjs().format("YYYY-MM-DD"),
    free_user: "",
    month: 0,
  });
  // NOTE 수정
  const [paymentUserEdit, setPaymentUserEdit] = useState<IPaymentUserEdit>({});

  // NOTE list
  const { mutate: paymentUserListMutate } = getPaymentUserList(
    page,
    setTotal,
    paymentFilter,
    setPaymentUserList,
    setPaymentUserEdit,
  );
  // NOTE 등록
  const { mutate: paymentUserRegistMutate } = getPaymentUserRegist(
    paymentUser,
    setPaymentUser,
    paymentUserListMutate,
  );
  // NOTE 수정
  const { mutate: paymentUserEditMutate } = getPaymentUserEdit(
    paymentUserEdit,
    setPaymentUserEdit,
    paymentUserListMutate,
  );
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

    let updatedPaymentUser = {
      ...paymentUser,
      [name]: value,
    };

    // NOTE 개월 수 설정 시 expire_date를 계산하여 expire_date 업데이트
    if (name === "month") {
      const newExpireDate = dayjs(paymentUser.payment_date)
        .add(parseInt(value, 10), "month")
        .format("YYYY-MM-DD");
      updatedPaymentUser = {
        ...updatedPaymentUser,
        expire_date: newExpireDate,
      };
    }

    setPaymentUser(updatedPaymentUser);
  };

  // NOTE 수정 값 onChange
  const handleEditInputChange = (
    item: IAppPaymentUserData,
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    // 현재 item의 수정 상태를 가져오기
    const currentItemState = paymentUserEdit[item.id] || {};

    // 새로운 수정 상태 생성
    let updatedItemState = {
      ...currentItemState,
      [name]: value,
    };

    // 만약 수정하는 것이 'month' 필드라면, expire_date도 같이 계산하여 업데이트
    if (name === "month") {
      const paymentDate = currentItemState.payment_date
        ? dayjs(currentItemState.payment_date)
        : dayjs(item.payment_date);

      const newExpireDate = paymentDate
        .add(parseInt(value, 10), "month")
        .format("YYYY-MM-DD");

      updatedItemState = {
        ...updatedItemState,
        expire_date: newExpireDate,
      };
    }

    // 만약 수정하는 것이 'expire_date' 필드라면, month도 같이 계산하여 업데이트
    if (name === "expire_date") {
      const paymentDate = currentItemState.payment_date
        ? dayjs(currentItemState.payment_date)
        : dayjs(item.payment_date);

      const newMonth = dayjs(value).diff(paymentDate, "month");

      updatedItemState = {
        ...updatedItemState,
        month: newMonth,
      };
    }

    setPaymentUserEdit((prevState) => {
      return { ...prevState, [item.id]: updatedItemState };
    });
  };

  // NOTE 등록
  const onClickRegister = () => {
    paymentUserRegistMutate();
  };

  const onClickEdit = (id: string, phoneNumber: string) => {
    paymentUserEditMutate({ id, phoneNumber });
  };

  const onClickDelete = (id: string) => {
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
          type="number"
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
        <S.Title>개월</S.Title>
        <S.Title>무료</S.Title>
        <S.Title>수정</S.Title>
        <S.Title>삭제</S.Title>
      </S.TitleContainer>

      <S.ContentsListContainer>
        <S.ContentsContainer>
          <S.Contents
            name="user_id"
            value={paymentUser.user_id}
            onChange={(e) => handleNewInputChange(e)}
          />
          <S.Contents
            placeholder="하이픈 포함 전체 입력"
            name="phone_no"
            value={paymentUser.phone_no}
            onChange={(e) => handleNewInputChange(e)}
          />
          <S.Contents
            type="date"
            name="payment_date"
            value={paymentUser.payment_date}
            onChange={(e) => handleNewInputChange(e)}
          />
          <S.Contents
            type="date"
            name="expire_date"
            value={paymentUser.expire_date}
            onChange={(e) => handleNewInputChange(e)}
          />
          <S.InfoDiv>
            <S.ContentsWithTitle
              type="number"
              name="month"
              value={paymentUser.month}
              onChange={(e) => handleNewInputChange(e)}
            />{" "}
            개월
          </S.InfoDiv>
          <S.ContentsSelectBox
            name="free_user"
            value={paymentUser.free_user}
            onChange={(e) => handleNewInputChange(e)}
          >
            <option value="">무료 여부</option>
            <option value="Y">Y</option>
            <option value="N">N</option>
          </S.ContentsSelectBox>
          <CommonButton contents="등록" onClickFn={onClickRegister} />
          <S.HiddenDiv />
        </S.ContentsContainer>
        {paymentUserList.length < 1 ? (
          <></>
        ) : (
          paymentUserList.map((item) => (
            <S.ContentsContainer key={item.id}>
              <S.Contents
                name="user_id"
                defaultValue={item.user_id}
                onChange={(e) => handleEditInputChange(item, e)}
              />
              <S.Contents
                name="phone_no"
                defaultValue={item.phone_no}
                onChange={(e) => handleEditInputChange(item, e)}
              />
              <S.Contents
                type="date"
                name="payment_date"
                defaultValue={dayjs(item.payment_date).format("YYYY-MM-DD")}
                onChange={(e) => handleEditInputChange(item, e)}
              />
              <S.Contents
                type="date"
                name="expire_date"
                value={
                  dayjs(paymentUserEdit[item.id]?.expire_date).format(
                    "YYYY-MM-DD",
                  ) || dayjs(item.expire_date).format("YYYY-MM-DD")
                }
                onChange={(e) => handleEditInputChange(item, e)}
              />
              <S.InfoDiv>
                <S.ContentsWithTitle
                  type="number"
                  name="month"
                  value={dayjs(paymentUserEdit[item.id]?.expire_date).diff(
                    dayjs(item.payment_date),
                    "month",
                  )}
                  onChange={(e) => handleEditInputChange(item, e)}
                />{" "}
                개월
              </S.InfoDiv>
              <S.ContentsSelectBox
                name="free_user"
                defaultValue={item.free_user}
                onChange={(e) => handleEditInputChange(item, e)}
              >
                <option value="Y">Y</option>
                <option value="N">N</option>
              </S.ContentsSelectBox>
              <CommonButton
                contents="수정"
                onClickFn={() => onClickEdit(item.id, item.phone_no)}
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
