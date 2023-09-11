// Toast 에디터
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
// Toast ColorSyntax 플러그인
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
// Toast 한글 플러그인
import "@toast-ui/editor/dist/i18n/ko-kr";
import { ChangeEvent, useRef, useState, useEffect } from "react";
import * as S from "../../../styles/appSet/AppVideoWrite.styles";
import { getFileUpload } from "../../../api/getFileUpload";
import CommonButton from "../../../components/common/CommonButton";
import { IAppVideoDetailResponse } from "../../../types/appSet/appVideoDetail.types";
import { useLocation, useParams } from "react-router";
import { getAppVideoModify } from "../../../api/appSet/appVideo/getAppVideoModify";
import { getAppVideoDetail } from "../../../api/appSet/appVideo/getAppVideoDetail";
import { onlyFileName } from "../../../utils/onlyFileName";
import Loading from "../../../components/common/Loading";
import { IFileUploadResponse } from "../../../types/FileUpload.types";
import { extractFileResponse } from "../../../utils/extractFileResponse";
import { getAppVideoWrite } from "../../../api/appSet/appVideo/getAppVideoWrite";

export default function AppVideoWrite() {
  const toolbarItems = [
    ["heading", "bold", "italic", "strike"],
    ["hr", "quote"],
    ["ul", "ol", "task", "indent", "outdent"],
    ["table", "image", "link"],
    ["code", "codeblock"],
  ];

  const [title, setTitle] = useState("");
  const [contents, setContents] = useState<IAppVideoDetailResponse>();
  // NOTE 동영상, 썸네일 file upload
  const [formData, setFormData] = useState(new FormData());
  const [videoFileName, setVideoFileName] = useState("");
  const [thumbnailFileName, setThumbnailFileName] = useState("");
  // NOTE fileUpload loading
  const [isFileUploadLoading, setIsFileUploadLoading] = useState(false);

  const videoInputRef = useRef<HTMLInputElement | null>(null);
  const thumbnailInputRef = useRef<HTMLInputElement | null>(null);
  const editorRef = useRef<Editor | null>(null);

  const params = useParams();
  const location = useLocation();

  const EDIT_PAGE = location.pathname.includes("edit");

  const { mutate: appVideoWriteMutate } = getAppVideoWrite(
    title,
    videoFileName,
    thumbnailFileName,
  );
  const { mutate: appVideoDetailMutate } = getAppVideoDetail(setContents);
  const { mutate: appVideoModifyMutate } = getAppVideoModify(
    title,
    videoFileName,
    thumbnailFileName,
  );

  // NOTE 수정 페이지 detail 불러오기
  useEffect(() => {
    if (EDIT_PAGE) appVideoDetailMutate();
  }, []);

  // NOTE 수정 페이지 toast UI 값 가져오기
  useEffect(() => {
    if (contents) {
      const htmlString = contents?.content;
      editorRef.current?.getInstance().setHTML(htmlString);
      setVideoFileName(contents.file_name);
      setThumbnailFileName(contents.thumbnail_name);
    }
  }, [contents]);

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  // NOTE 비디오 업로드 버튼 클릭 시 숨겨진 input 클릭
  const onClickVideoUpload = () => {
    if (videoInputRef.current) videoInputRef.current.click();
  };

  // NOTE 썸네일 업로드 버튼 클릭 시 숨겨진 input 클릭
  const onClickThumbnailUpload = () => {
    if (thumbnailInputRef.current) thumbnailInputRef.current.click();
  };

  // NOTE 비디오 업로드 시 file set
  const handleVideo = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      setFormData((prevFormData) => {
        const newFormData = new FormData(); // 새로운 FormData 생성
        for (const [key, value] of prevFormData.entries()) {
          // 이전 값 복사
          newFormData.append(key, value as Blob);
        }
        newFormData.append("video", files[0]);
        return newFormData;
      });

      const fileName = onlyFileName(e.target.value);
      setVideoFileName(fileName);
    }
  };

  // NOTE 썸네일 업로드 시 file set
  const handleThumbnail = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      setFormData((prevFormData) => {
        const newFormData = new FormData(); // 새로운 FormData 생성
        for (const [key, value] of prevFormData.entries()) {
          // 이전 값 복사
          newFormData.append(key, value as Blob);
        }
        newFormData.append("thumbnail", files[0]);
        return newFormData;
      });

      const fileName = onlyFileName(e.target.value);
      setThumbnailFileName(fileName);
    }
  };

  // NOTE editor 내에 업로드하는 이미지 handle
  const handleImageUpload = async (
    blob: Blob | File,
    callback: (url: string, alt?: string) => void,
  ) => {
    // NOTE blob 자체가 file
    const imageFormData = new FormData();
    // 비어있는 Blob 객체 생성 (image, video, thumbnail이 세트)
    const emptyBlob = new Blob([], { type: "application/octet-stream" });
    imageFormData.append("image", blob);
    imageFormData.append("video", emptyBlob);
    imageFormData.append("thumbnail", emptyBlob);

    try {
      const res: any = await getFileUpload(imageFormData);
      const imageUrl = `${
        process.env.REACT_APP_API_URL
      }/images/${extractFileResponse(res.list, "image")}`;

      callback(imageUrl, `${contents ? contents.title : title} 동영상 이미지`);
    } catch (error) {
      console.error("Image upload failed: ", error);
    }
  };

  // NOTE 등록하기
  const onClickWriteVideo = async () => {
    setIsFileUploadLoading(true);
    // NOTE 파일 업로드 (동영상, 썸네일)
    try {
      // 비어있는 Blob 객체 생성
      const emptyBlob = new Blob([], { type: "application/octet-stream" });
      // 'video'나 'thumbnail'이 없으면 빈 Blob을 추가
      if (!formData.has("video")) {
        formData.append("video", emptyBlob);
      }
      if (!formData.has("thumbnail")) {
        formData.append("thumbnail", emptyBlob);
      }
      // 'image' 자리에 빈 Blob 추가
      formData.append("image", emptyBlob);

      // const res: IFileUploadResponse = await getFileUpload(formData);
      const fileUploadPromise = getFileUpload(formData);
      const res: IFileUploadResponse = await fileUploadPromise;

      setVideoFileName(extractFileResponse(res.list, "video"));
      setThumbnailFileName(extractFileResponse(res.list, "thumbnail"));

      if (editorRef.current) {
        const editorInstance = editorRef.current.getInstance();
        const htmlContent = editorInstance.getHTML();
        appVideoWriteMutate(htmlContent);
      }

      setIsFileUploadLoading(false);
    } catch (error) {
      console.error("Image upload failed: ", error);
    }
  };

  const onClickEditVideo = () => {
    if (editorRef.current) {
      const editorInstance = editorRef.current.getInstance();
      const htmlContent = editorInstance.getHTML();
      appVideoModifyMutate({ id: Number(params.videoId), htmlContent });
    }
  };

  return (
    <S.Container>
      {isFileUploadLoading && (
        <S.LoadingContainer>
          <Loading />
        </S.LoadingContainer>
      )}
      <S.TitleInput
        placeholder="제목을 입력해주세요."
        defaultValue={contents ? contents.title : ""}
        onChange={handleTitle}
      />
      <S.FileUploadContainer>
        <S.HiddenFileInput
          type="file"
          ref={videoInputRef}
          onChange={handleVideo}
        />
        <S.HiddenFileInput
          type="file"
          ref={thumbnailInputRef}
          onChange={handleThumbnail}
        />
        <CommonButton contents="비디오 업로드" onClickFn={onClickVideoUpload} />
        <S.UploadFileName>
          {videoFileName === "" && !contents
            ? "비디오를 업로드해주세요"
            : videoFileName}
        </S.UploadFileName>
        <CommonButton
          contents="썸네일 업로드"
          onClickFn={onClickThumbnailUpload}
        />
        <S.UploadFileName>
          {thumbnailFileName === "" && !contents
            ? "썸네일을 업로드해주세요"
            : thumbnailFileName}
        </S.UploadFileName>
      </S.FileUploadContainer>
      <S.EditorContainer>
        <Editor
          ref={editorRef}
          placeholder="내용을 입력해주세요."
          initialEditType="wysiwyg"
          previewStyle="vertical"
          plugins={[colorSyntax]}
          toolbarItems={toolbarItems}
          height="580px"
          language="ko-KR"
          hooks={{ addImageBlobHook: handleImageUpload }}
        />
      </S.EditorContainer>
      <S.ButtonContainer>
        <CommonButton
          contents={EDIT_PAGE ? "수정하기" : "등록하기"}
          onClickFn={EDIT_PAGE ? onClickEditVideo : onClickWriteVideo}
        />
      </S.ButtonContainer>
    </S.Container>
  );
}
