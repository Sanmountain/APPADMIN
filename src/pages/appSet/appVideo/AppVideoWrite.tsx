// Toast 에디터
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
// Toast ColorSyntax 플러그인
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
// Toast 한글 플러그인
import "@toast-ui/editor/dist/i18n/ko-kr";
import { ChangeEvent, useRef, useState } from "react";
import * as S from "../../../styles/appSet/AppVideoWrite.styles";
import { getFileUpload } from "../../../api/getFileUpload";
import CommonButton from "../../../components/common/CommonButton";
// import { getAppVideoWrite } from "../../../api/appSet/appVideo/getAppVideoWrite";

export default function AppVideoWrite() {
  const toolbarItems = [
    ["heading", "bold", "italic", "strike"],
    ["hr", "quote"],
    ["ul", "ol", "task", "indent", "outdent"],
    ["table", "image", "link"],
    ["code", "codeblock"],
  ];

  const formData = new FormData();

  const [, setTitle] = useState("");
  // const [contents, setContents] = useState();

  const [videoFileName, setVideoFileName] = useState("");
  const [thumbnailFileName, setThumbnailFileName] = useState("");

  const videoInputRef = useRef<HTMLInputElement | null>(null);
  const thumbnailInputRef = useRef<HTMLInputElement | null>(null);
  const editorRef = useRef<Editor | null>(null);

  // const { mutate: appVideoWriteMutate } = getAppVideoWrite(title);

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

  // NOTE 비디오 업로드 시 file명 set
  const handleVideo = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setVideoFileName(e.target.value);
      formData.append("video", e.target.files[0]);
    }
  };

  // NOTE 썸네일 업로드 시 file명 set
  const handleThumbnail = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setThumbnailFileName(e.target.value);
      formData.append("thumbnail", e.target.files[0]);
    }
  };

  // NOTE editor 내에 업로드하는 이미지 handle
  const handleImageUpload = async (
    blob: Blob | File,
    callback: (url: string, alt?: string) => void,
  ) => {
    console.log("blob", blob);
    // NOTE blob 자체가 file
    const imageFormData = new FormData();
    imageFormData.append("image", blob);

    try {
      const res: any = await getFileUpload(imageFormData);
      const imageUrl = `${process.env.REACT_APP_API_URL}/images/${res.list[0]}`;

      callback(imageUrl, `alt`);
    } catch (error) {
      console.error("Image upload failed: ", error);
    }
  };

  // NOTE 등록하기
  const onClickWriteVideo = () => {
    // NOTE 파일 업로드 (동영상, 썸네일, 이미지)
    try {
      getFileUpload(formData);
    } catch (error) {
      console.error("Image upload failed: ", error);
    }

    // if (editorRef.current) {
    //   const editorInstance = editorRef.current.getInstance();
    //   const htmlContent = editorInstance.getHTML();
    //   appVideoWriteMutate(htmlContent);
    // }
  };

  return (
    <S.Container>
      <S.TitleInput placeholder="제목을 입력해주세요." onChange={handleTitle} />
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
          {videoFileName === "" ? "비디오를 업로드해주세요" : videoFileName}
        </S.UploadFileName>
        <CommonButton
          contents="썸네일 업로드"
          onClickFn={onClickThumbnailUpload}
        />
        <S.UploadFileName>
          {thumbnailFileName === ""
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
        <CommonButton contents={"등록하기"} onClickFn={onClickWriteVideo} />
      </S.ButtonContainer>
    </S.Container>
  );
}
