export const onlyFileName = (filePath: string) => {
  const filePathParts = filePath.split(/[\\]/);

  return filePathParts[filePathParts.length - 1];
};
