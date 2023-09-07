// Toast 에디터
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
// Toast ColorSyntax 플러그인
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
// Toast 한글 플러그인
import "@toast-ui/editor/dist/i18n/ko-kr";
import * as S from "../../styles/notice/NoticeWrite.styles";
import { useRef, useState, ChangeEvent, useEffect } from "react";
import { getNoticeWrite } from "../../api/notice/getNoticeWrite";
import { getNoticeDetail } from "../../api/notice/getNoticeDetail";
import { INoticeDetailResponse } from "../../types/notice/noticeDetail.types";
import { useLocation, useParams } from "react-router";
import { getNoticeModify } from "../../api/notice/getNoticeModify";
import CommonButton from "../../components/common/CommonButton";
import { getFileUpload } from "../../api/getFileUpload";

export default function NoticeWrite() {
  const toolbarItems = [
    ["heading", "bold", "italic", "strike"],
    ["hr", "quote"],
    ["ul", "ol", "task", "indent", "outdent"],
    ["table", "image", "link"],
    ["code", "codeblock"],
  ];

  const [title, setTitle] = useState("");
  const [contents, setContents] = useState<INoticeDetailResponse>();

  const editorRef = useRef<Editor | null>(null);

  const params = useParams();
  const location = useLocation();

  const EDIT_PAGE = location.pathname.includes("edit");

  const { mutate: noticeWriteMutate } = getNoticeWrite(title);
  const { mutate: noticeDetailMutate } = getNoticeDetail(
    Number(params.noticeId),
    setContents,
  );
  const { mutate: noticeModifyMutate } = getNoticeModify(title);

  // NOTE 수정 페이지 detail 불러오기
  useEffect(() => {
    if (EDIT_PAGE) noticeDetailMutate();
  }, []);

  // NOTE 수정 페이지 toast UI 값 가져오기
  useEffect(() => {
    if (contents) {
      const htmlString = contents?.content;
      editorRef.current?.getInstance().setHTML(htmlString);
    }
  }, [contents]);

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  // NOTE Editor에 이미지 업로드 시 이미지 업로드 API
  const handleImageUpload = async (
    blob: Blob | File,
    callback: (url: string, alt?: string) => void,
  ) => {
    console.log("blob", blob);
    // NOTE blob 자체가 file
    const formData = new FormData();
    // NOTE formData {image:blob} 형태로 바꿈
    formData.append("multiFile", blob);

    try {
      const res: any = await getFileUpload(formData);
      const imageUrl = `${process.env.REACT_APP_API_URL}/images/${res.list[0]}`;

      callback(
        imageUrl,
        `${contents ? contents.title : title} 공지사항 이미지`,
      );
    } catch (error) {
      console.error("Image upload failed: ", error);
    }
  };

  const onClickWriteButton = () => {
    if (editorRef.current) {
      const editorInstance = editorRef.current.getInstance();
      const htmlContent = editorInstance.getHTML();
      noticeWriteMutate(htmlContent);
    }
  };

  const onClickEditButton = () => {
    if (editorRef.current) {
      const editorInstance = editorRef.current.getInstance();
      const htmlContent = editorInstance.getHTML();
      noticeModifyMutate({ id: Number(params.noticeId), htmlContent });
    }
  };

  return (
    <S.Container>
      <S.TitleInput
        placeholder="제목을 입력해주세요."
        onChange={handleTitle}
        defaultValue={contents ? contents.title : ""}
      />
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
          contents={EDIT_PAGE ? "수정하기" : "작성하기"}
          onClickFn={EDIT_PAGE ? onClickEditButton : onClickWriteButton}
        />
      </S.ButtonContainer>
    </S.Container>
  );
}
