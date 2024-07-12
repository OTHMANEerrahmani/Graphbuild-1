import { styles } from "../../../../styles";

function MediaUploader({ uploadWidget, uploadedImages }) {
  return (
    <div>
      <h3 className={` ${styles.heroSubText}`}>Original</h3>
      {uploadedImages.length == 0 && (
        <div className="flex flex-col items-center  ">
          <div className="relative border-2 border-dashed border-gray-400 rounded-lg w-full h-48 flex justify-center items-center">
            <div className="text-center space-y-2">
              <p className=" pt-1 text-sm">Click here to upload image</p>
              <button
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
                type="button"
                onClick={uploadWidget}
              >
                Upload Image
              </button>
            </div>
          </div>
        </div>
      )}
      {uploadedImages.length !== 0 && (
        <div className="flex flex-wrap justify-center">
          {uploadedImages.map((uploadedImage, idx) => (
            <div
              key={idx}
              className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 p-4"
            >
              <img
                className="w-full"
                src={uploadedImage.previewUrl}
                alt="uploaded image"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MediaUploader;
