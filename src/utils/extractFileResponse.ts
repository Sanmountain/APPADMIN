export const extractFileResponse = (list: string[], fileType: string) => {
  const videoItem = list.find((item) => item.includes("video :"));
  const thumbnailItem = list.find((item) => item.includes("thumbnail :"));
  const imageItem = list.find((item) => item.includes("image :"));

  // NOTE video url
  if (fileType === "video") {
    if (videoItem) {
      const [, videoFileName] = videoItem.split("video :");
      return videoFileName.trim();
    } else return "";
  }
  // NOTE thumbnail url
  else if (fileType === "thumbnail") {
    if (thumbnailItem) {
      const [, thumbnailFileName] = thumbnailItem.split("thumbnail :");
      return thumbnailFileName.trim();
    } else return "";
  }
  // NOTE image url
  else if (fileType === "image") {
    if (imageItem) {
      const [, imageFileName] = imageItem?.split("image :");
      return imageFileName.trim();
    } else return "";
  } else return "";
};
