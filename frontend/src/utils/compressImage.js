import imageCompression from "browser-image-compression";

const compressImage = async (file) => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1600,
    useWebWorker: true,
    fileType: "image/webp",
  };

  return await imageCompression(
    file,
    options
  );
};

export default compressImage;