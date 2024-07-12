
const ImageUpload = ({
  previewImage,
  handleImageChange,
  picturePath,
  firstUse,
  update,
}) => {
  return (
    <div className="flex items-center my-6 text-center justify-center">
      <label htmlFor="image" className="relative cursor-pointer">
        <input
          type="file"
          id="image"
          name="image"
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleImageChange}
        />
        <img
          src={
            firstUse && update
              ? `${import.meta.env.VITE_APP_SERVER}/assets/${picturePath}`
              : previewImage
          }
          alt=""
          className="w-60 h-60 rounded-full object-cover"
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 w-60 h-60 rounded-full bg-gray-800 opacity-0 hover:opacity-75 transition-opacity duration-300"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
          <p className="text-sm font-medium dark:text-white text-black">
            Click to change picture
          </p>
        </div>
      </label>
    </div>
  );
};

export default ImageUpload;
