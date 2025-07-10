export const readFile = async (file: File): Promise<string> => {
  const reader = new FileReader();
  const textPromise = new Promise<string>((resolve, reject) => {
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
  });
  reader.readAsText(file);
  return textPromise;
};
