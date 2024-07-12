import { styles } from "../../../../styles";
import { FaCloudDownloadAlt } from "react-icons/fa";

function TransformedImage({ imageUrl, loading }) {
  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const anchor = document.createElement("a");
      anchor.href = blobUrl;
      const filename = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
      anchor.download = filename;
      anchor.click();
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  return (
    <div>
      <h3 className={` ${styles.heroSubText}`}>Transformed Image</h3>
      <div className=" w-full flex justify-center items-center">
        {imageUrl ? (
          <div className="relative bg-black w-full h-full">
            <img
              className=" object-fill"
              src={imageUrl}
              // src={`https://res.cloudinary.com/dkblahrz2/image/upload/v1714642401/cld-sample-2.jpg`}
              alt="transformed image"
            />
            <FaCloudDownloadAlt
              className="absolute top-2 right-2 "
              size={"25px"}
              color={"black"}
              onClick={handleDownload}
            />
          </div>
        ) : loading ? (
          <p className="text-darkPrimary dark:text-slate-200 flex justify-center">
            Working on it ...
          </p>
        ) : (
          <div className="h-48 flex justify-center items-center">
            <p className="text-darkPrimary dark:text-slate-200 flex justify-center">
              No transformed image available
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TransformedImage;
