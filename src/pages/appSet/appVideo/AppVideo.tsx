import { useEffect, useState } from "react";
import * as S from "../../../styles/appSet/AppVideo.styles";
import { IAppVideoListData } from "../../../types/appSet/appVideoList.types";
import { getAppVideoList } from "../../../api/appSet/appVideo/getAppVideoList";
import Pagination from "../../../components/common/Pagination";
import Loading from "../../../components/common/Loading";
import { useNavigate } from "react-router";

export default function AppVideo() {
  const [page, setPage] = useState(1);
  const [videoList, setVideoList] = useState<IAppVideoListData[]>([]);

  const { mutate: videoListMutate, isLoading } = getAppVideoList(
    page,
    setVideoList,
  );

  const navigate = useNavigate();

  useEffect(() => {
    videoListMutate();
  }, []);

  const onClickMoveToDetail = (id: string) => {
    navigate(`/app/video/${id}`);
  };

  return (
    <S.Container>
      {videoList.length < 1 ? (
        <S.NoDataContainer>조회된 데이터가 없습니다.</S.NoDataContainer>
      ) : isLoading ? (
        <Loading />
      ) : (
        <S.ContentsListContainer>
          {videoList.map((item) => (
            <S.ContentsContainer
              key={item.id}
              onClick={() => onClickMoveToDetail(item.id)}
            >
              <S.ThumbnailContainer>
                <S.ThumbnailImage
                  src={`${process.env.REACT_APP_API_URL}/images/${item.thumbnail_name}`}
                />
              </S.ThumbnailContainer>
              <S.InfoContainer>
                <S.Title>{item.title}</S.Title>
                <S.UploadDate>{item.reg_date}</S.UploadDate>
                <S.UploadUser>{item.user_name}</S.UploadUser>
              </S.InfoContainer>
            </S.ContentsContainer>
          ))}
        </S.ContentsListContainer>
      )}

      <S.PaginationContainer>
        <Pagination page={page} setPage={setPage} total={10} />
      </S.PaginationContainer>
    </S.Container>
  );
}
