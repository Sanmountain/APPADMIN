import { IFileUploadResponse } from "../types/FileUpload.types";
import { instance } from "./instance";

export const getFileUpload = async (
  formData: FormData,
): Promise<IFileUploadResponse> => {
  return await instance.post("/file/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
