import { Cloudinary } from "@cloudinary/url-gen";
import { format, quality } from "@cloudinary/url-gen/actions/delivery";
import { AdvancedImage, placeholder } from "@cloudinary/react";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUD_NAME,
  },
});
// eslint-disable-next-line react/prop-types
const CldImage = ({ publicId, setShowConfirmation, setpublicId }) => {
  const handleDownload = async (imageUrl) => {
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

  const myImage = cld
    .image(publicId)
    // .resize(thumbnail().width(300).height(300).gravity(autoGravity()))
    .delivery(format("auto"))
    .delivery(quality("auto"));

  return (
    <div className="relative min-h-44 min-w-44 p-1">
      <div className="absolute top-2 right-2 z-10 flex flex-row ">
        <FaCloudDownloadAlt
          size={"25px"}
          color={"black"}
          onClick={() =>
            handleDownload(
              `https://res.cloudinary.com/${
                import.meta.env.VITE_CLOUD_NAME
              }/image/upload/${publicId}`
            )
          }
        />
        <MdDelete
          size={"25px"}
          color={"black"}
          onClick={() => {
            setShowConfirmation(true);
            setpublicId(publicId);
          }}
        />
      </div>

      <AdvancedImage
        cldImg={myImage}
        // loading="lazy"
        // placeholder="blur"
        style={{ maxWidth: "100%" }}
        plugins={[placeholder()]}
        className="rounded-lg shadow-lg relative"
      />
    </div>
  );
};
export default CldImage;
