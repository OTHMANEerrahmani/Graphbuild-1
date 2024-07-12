import { useEffect, useState } from "react";
import { MediaUploader, TransformedImage } from "../components";
import { pad } from "@cloudinary/url-gen/actions/resize";
import { compass } from "@cloudinary/url-gen/qualifiers/gravity";
import {
  generativeFill,
} from "@cloudinary/url-gen/qualifiers/background";
import { Cloudinary } from "@cloudinary/url-gen";
import { DropDown } from "../../../../components";
import { aspectRatioOptions } from "../../../../constants";
import {
  backgroundRemoval,
  generativeRestore,
} from "@cloudinary/url-gen/actions/effect";

const cloudName = import.meta.env.VITE_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;

const Shared = ({ transformType }) => {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [transformedImageUrl, setTransformedImageUrl] = useState(null);
  const [selectedAspectRatio, setSelectedAspectRatio] = useState(null);
  const [selectedAspectLabel, setSelectedAspectLabel] = useState(
    "Select Aspect Ratio"
  );

  useEffect(() => {
    const uwScript = document.getElementById("uw");
    if (!loaded && !uwScript) {
      const script = document.createElement("script");
      script.setAttribute("async", "");
      script.setAttribute("id", "uw");
      script.src = "https://upload-widget.cloudinary.com/global/all.js";
      script.addEventListener("load", () => setLoaded(true));
      document.body.appendChild(script);
    }
  }, [loaded]);

  const processResults = (error, result) => {
    if (result.event === "close") {
      setIsDisabled(false);
    }
    if (result && result.event === "success") {
      const secureUrl = result.info.secure_url;
      const publicId = result.info.public_id;
      const previewUrl = secureUrl.replace(
        "/upload/",
        "/upload/w_400/f_auto,q_auto/"
      );
      setUploadedImages((prevImages) => [
        ...prevImages,
        { previewUrl, publicId },
      ]);
      setIsDisabled(false);
    }
    if (error) {
      setIsDisabled(false);
    }
  };

  const uploadWidget = () => {
    setIsDisabled(true);
    window.cloudinary?.openUploadWidget(
      {
        cloudName,
        uploadPreset,
        sources: [],
        tags: ["myphotoalbum-react"],
        clientAllowedFormats: ["image"],
        resourceType: "image",
        multiple: false,
      },
      processResults
    );
  };

  const transformImage = async () => {
    if (uploadedImages.length === 0 || !selectedAspectRatio) {
      return;
    }

    try {
      setLoading(true);
      const publicId = uploadedImages[0]?.publicId;

      const { width, height } = aspectRatioOptions[selectedAspectRatio];

      var transformedImageUrl = null;
      if (transformType === "generateFill") {
        transformedImageUrl = new Cloudinary({
          cloud: {
            cloudName: cloudName,
          },
        })
          .image(publicId)
          .resize(
            pad()
              .aspectRatio(width / height)
              .gravity(compass("center"))
              .background(generativeFill())
          )
          .toURL();
      } else if (transformType === "BgRemover") {
        transformedImageUrl = new Cloudinary({
          cloud: {
            cloudName: cloudName,
          },
        })
          .image(publicId)
          .effect(backgroundRemoval())
          .resize(
            pad()
              .aspectRatio(width / height)
              .gravity(compass("center"))
          )
          .toURL();
      } else if (transformType === "RestoreImage") {
        transformedImageUrl = new Cloudinary({
          cloud: {
            cloudName: cloudName,
          },
        })
          .image(publicId)
          .effect(generativeRestore())
          .resize(
            pad()
              .aspectRatio(width / height)
              .gravity(compass("center"))
              .background(generativeFill())
          )
          .effect(generativeRestore())
          .toURL();
      }

      setTransformedImageUrl(transformedImageUrl);
    } catch (error) {
      console.error("Error transforming image:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (selectedOption) => {
    setSelectedAspectRatio(selectedOption.aspectRatio);
    setSelectedAspectLabel(selectedOption.label);
  };

  const saveImage = async () => {
    try {
      setLoading(true);

      const response = await fetch(transformedImageUrl);
      const blob = await response.blob();
      const formData = new FormData();

      const timestamp = Date.now();
      const filename = `transformed_image_${timestamp}.jpg`;

      formData.append("file", blob, filename);
      formData.append("upload_preset", uploadPreset);

      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload image");
      }

      // If the upload is successful, reset state
      setTransformedImageUrl(null);
      setUploadedImages([]);
      setIsDisabled(true);
    } catch (error) {
      console.error("Error saving image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="m-2 space-y-4 w-full  h-[calc(60vh)] overflow-auto no-scrollbar dark:text-white md:px-4">
      <DropDown
        className="max-w-52"
        default={selectedAspectLabel}
        options={Object.values(aspectRatioOptions).map((item) => ({
          name: item.label,
          action: () => handleChange(item),
        }))}
      />
      <div className="flex flex-col lg:flex-row lg:space-x-2 space-y-4 lg:space-y-0 ">
        {/* Media Uploader */}
        <div className=" lg:w-1/2 ">
          <MediaUploader
            uploadWidget={uploadWidget}
            uploadedImages={uploadedImages}
          />
        </div>
        {/* TransformedImage */}
        <div className="lg:w-1/2">
          <TransformedImage imageUrl={transformedImageUrl} loading={loading} />
        </div>
      </div>
      <div className="flex md:flex-row flex-col  space-y-2 md:space-y-0   md:space-x-2 w-full ">
        <button
          disabled={!selectedAspectRatio || isDisabled}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded md:w-1/2 ${
            !selectedAspectRatio || isDisabled
              ? "opacity-50 cursor-not-allowed"
              : ""
          } `}
          type="button"
          onClick={transformImage}
        >
          Transform Image
        </button>
        <button
          disabled={!transformedImageUrl || isDisabled}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded md:w-1/2 ${
            !transformedImageUrl || isDisabled
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          type="button"
          onClick={saveImage}
        >
          Save Image
        </button>
      </div>
    </div>
  );
};

export default Shared;
