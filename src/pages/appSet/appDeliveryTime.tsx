import { ChangeEvent, useEffect, useState } from "react";
import CommonButton from "../../components/common/CommonButton";
import * as S from "../../styles/appSet/appDeliveryTime.styles";
import {
  IAppDeliveryTimeData,
  IDeliveryInfo,
} from "../../types/appSet/appDeliveryTime.types";
import { getDeliveryTimeList } from "../../api/appSet/appDeliveryTime/getDeliveryTimeList";
import Loading from "../../components/common/Loading";
import { getDeliveryTimeRegist } from "../../api/appSet/appDeliveryTime/getDeliveryTimeRegist";
import dayjs from "dayjs";
import { getDeliveryTimeEdit } from "../../api/appSet/appDeliveryTime/getDeliveryTimeEdit";
import { getDeliveryTimeDelete } from "../../api/appSet/appDeliveryTime/getDeliveryTimeDelete";

export default function AppDeliveryTime() {
  const [deliveryTimeList, setDeliveryTimeList] = useState<
    IAppDeliveryTimeData[]
  >([]);

  const [editDeliveryInfo, setEditDeliveryInfo] =
    useState<IDeliveryInfo | null>(null);
  const [deliveryInfo, setDeliveryInfo] = useState<IDeliveryInfo>({
    dv_time_cd: null,
    dv_time_nm: "",
    dv_type: "",
    start_date: dayjs().format("YYYY-MM-DD"),
    expire: dayjs().format("YYYY-MM-DD"),
    seq: null,
    print: "N",
  });

  // NOTE list
  const {
    mutate: deliveryTimeListMutate,
    isLoading: isDeliveryTimeListLoading,
  } = getDeliveryTimeList(setDeliveryTimeList);
  // NOTE 등록
  const { mutate: deliveryTimeRegisterMutate } = getDeliveryTimeRegist(
    deliveryInfo,
    setDeliveryInfo,
    deliveryTimeListMutate,
  );
  // NOTE 수정
  const { mutate: deliveryTimeEditMutate } = getDeliveryTimeEdit(
    editDeliveryInfo,
    setEditDeliveryInfo,
    deliveryTimeListMutate,
  );
  // NOTE 삭제
  const { mutate: deliveryTimeDeleteMutate } = getDeliveryTimeDelete(
    deliveryTimeListMutate,
  );

  useEffect(() => {
    deliveryTimeListMutate();
  }, []);

  // NOTE 기존 등록된 값들 수정 onChange
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { name, value, type, checked } = e.target;
    const actualValue = type === "checkbox" ? (checked ? "Y" : "N") : value;

    // NOTE list 상태를 업데이트해서 checkbox 여부에 따라 list 다시 그려주기 (체크박스 변화 보여주기 위해)
    // 기존 리스트를 복사
    const updatedDeliveryTimeList = [...deliveryTimeList];

    // 선택한 아이템을 업데이트
    updatedDeliveryTimeList[index] = {
      ...updatedDeliveryTimeList[index],
      [name]: actualValue,
    };

    setDeliveryTimeList(updatedDeliveryTimeList);

    // NOTE edit에 보낼 editDeliveryInfo도 수정
    if (
      editDeliveryInfo &&
      deliveryTimeList[index].id === editDeliveryInfo.id
    ) {
      setEditDeliveryInfo({
        ...editDeliveryInfo,
        [name]: actualValue,
      });
    } else {
      const selectedItem = { ...deliveryTimeList[index], [name]: actualValue };
      setEditDeliveryInfo(selectedItem);
    }
  };

  // NOTE 새로 등록하는 값들 onChange
  const handleNewInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const actualValue = type === "checkbox" ? (checked ? "Y" : "N") : value;

    setDeliveryInfo({
      ...deliveryInfo,
      [name]: actualValue,
    });
  };

  const onClickRegister = () => {
    deliveryTimeRegisterMutate();
  };

  const onClickEdit = () => {
    deliveryTimeEditMutate();
  };

  const onClickDelete = (id: number) => {
    deliveryTimeDeleteMutate(id);
  };

  return (
    <S.Container>
      <S.TitleContainer>
        <S.Title>배송시간코드</S.Title>
        <S.Title>배송시간</S.Title>
        <S.Title>업무구분</S.Title>
        <S.Title>시작</S.Title>
        <S.Title>만료</S.Title>
        <S.Title>순서</S.Title>
        <S.Title>출력</S.Title>
        <S.Title>수정</S.Title>
        <S.Title>삭제</S.Title>
      </S.TitleContainer>

      <S.ContentsListContainer>
        {isDeliveryTimeListLoading ? (
          <Loading />
        ) : deliveryTimeList.length < 1 ? (
          <></>
        ) : (
          deliveryTimeList.map((item, index) => (
            <S.ContentsContainer key={item.id}>
              <S.Contents
                name="dv_time_cd"
                defaultValue={item.dv_time_cd || ""}
                onChange={(e) => handleInputChange(e, index)}
              />
              <S.Contents
                name="dv_time_nm"
                defaultValue={item.dv_time_nm}
                onChange={(e) => handleInputChange(e, index)}
              />
              <S.Contents
                name="dv_type"
                defaultValue={item.dv_type}
                onChange={(e) => handleInputChange(e, index)}
              />
              <S.Contents
                type="date"
                name="start_date"
                defaultValue={item.start_date}
                onChange={(e) => handleInputChange(e, index)}
              />
              <S.Contents
                type="date"
                name="expire"
                defaultValue={item.expire}
                onChange={(e) => handleInputChange(e, index)}
              />
              <S.Contents
                name="seq"
                defaultValue={item.seq || ""}
                onChange={(e) => handleInputChange(e, index)}
              />
              <S.CheckBox
                type="checkbox"
                name="print"
                checked={item.print === "Y"}
                onChange={(e) => handleInputChange(e, index)}
              />
              <CommonButton contents="수정" onClickFn={onClickEdit} />
              <CommonButton
                contents="삭제"
                onClickFn={() => onClickDelete(item.id)}
              />
            </S.ContentsContainer>
          ))
        )}
        <S.ContentsContainer>
          <S.Contents
            name="dv_time_cd"
            value={deliveryInfo.dv_time_cd || ""}
            onChange={(e) => handleNewInputChange(e)}
          />
          <S.Contents
            name="dv_time_nm"
            value={deliveryInfo.dv_time_nm}
            onChange={(e) => handleNewInputChange(e)}
          />
          <S.Contents
            name="dv_type"
            value={deliveryInfo.dv_type}
            onChange={(e) => handleNewInputChange(e)}
          />
          <S.Contents
            name="start_date"
            value={deliveryInfo.start_date}
            type="date"
            onChange={(e) => handleNewInputChange(e)}
          />
          <S.Contents
            name="expire"
            value={deliveryInfo.expire}
            type="date"
            onChange={(e) => handleNewInputChange(e)}
          />
          <S.Contents
            name="seq"
            value={deliveryInfo.seq || ""}
            onChange={(e) => handleNewInputChange(e)}
          />
          <S.CheckBox
            name="print"
            type="checkbox"
            checked={deliveryInfo.print === "Y"}
            onChange={(e) => handleNewInputChange(e)}
          />
          <CommonButton contents="등록" onClickFn={onClickRegister} />
        </S.ContentsContainer>
      </S.ContentsListContainer>
    </S.Container>
  );
}
