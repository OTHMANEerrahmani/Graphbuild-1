import { useEffect, useState } from "react";
import { CldImage } from "../components";
import { styles } from "../../../../styles";
import { PopUpConfirme } from "../../../../components";

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [publicId, setpublicId] = useState("");

  const getData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_APP_SERVER}/cloudinary/gallery`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch photos");
      }
      const data = await response.json();
      setPhotos(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteImage = async () => {
    try {
      setPhotos((prevPhoto) =>
        prevPhoto.filter((photo) => photo.public_id !== publicId)
      );
      const response = await fetch(
        `${import.meta.env.VITE_APP_SERVER}/cloudinary/destroy`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            public_id: publicId,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete image");
      }
      setShowConfirmation(false);
      setpublicId("");
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <div className="p-2 space-y-4 w-full h-[calc(85vh)]  dark:text-white md:px-4">
      <h1 className="text-3xl font-bold">Gallery</h1>
      <p className="p-2">
        This example shows how to integrate the Cloudinary Upload Widget into a
        React application.
      </p>

      <div className="flex flex-col items-center justify-center  md:space-x-2 space-y-4 md:space-y-0 relative overflow-auto no-scrollbar h-5/6 ">
        {showConfirmation && (
          <PopUpConfirme
            action={() => deleteImage(publicId)}
            setShowConfirmation={setShowConfirmation}
          />
        )}
        {loading ? (
          <p className={` ${styles.heroSubText}`}>Loading gallery</p>
        ) : photos.length > 0 ? (
          <div className="flex flex-wrap h-full ">
            {photos.map((photo, idx) => (
              <div className="lg:w-1/3 md:w-1/2 w-full my-4" key={idx}>
                <CldImage
                  publicId={photo.public_id}
                  setShowConfirmation={setShowConfirmation}
                  setpublicId={setpublicId}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-md text-center">
            No photos to list. Please make sure that you have uploaded some
            images using this app.
          </p>
        )}
      </div>
    </div>
  );
};

export default Gallery;
