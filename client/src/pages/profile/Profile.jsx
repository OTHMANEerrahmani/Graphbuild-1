import { useState } from "react";
import { ImageUpload } from "../../components";
import { useSelector } from "react-redux";
import { formatDate } from "../../utils/dateFormatter";
import { isSubscribe } from "../../helpers/PrivateRouter";

const Profile = () => {
  const [productName, setProductName] = useState("");
  const user = useSelector((state) => state.auth.user);
  const picturePath = user.picturePath;
  const [currentImage, setCurrentImage] = useState(
    picturePath
      ? picturePath.startsWith("https")
        ? `${picturePath}`
        : `${import.meta.env.VITE_APP_SERVER + "/assets/" + picturePath}`
      : `${import.meta.env.VITE_APP_SERVER}/assets/defaultProfile.png`
  );
  const [image, setImage] = useState(null);
  const [username, setUsername] = useState(user.name);
  const [name, setName] = useState(user.name);

  const [password, setPassword] = useState(null);
  const [Cpassword, setCpassword] = useState(null);

  const handleImageChange = (e) => {
    const fileInput = e.target;

    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setCurrentImage(e.target.result);
        setImage(fileInput.files[0]);
      };
      reader.readAsDataURL(fileInput.files[0]);
    }
    setFirstUse(false);
  };
  const isUserSubscribe = isSubscribe();
  return (
    <div className=" py-8 md:px-10 lg:px-20 overflow-auto   no-scrollbar w-full dark:text-white">
      <div className="px-4 space-y-2 flex flex-col  justify-center">
        <div className="flex lg:flex-row  justify-around items-center flex-col lg:space-x-2 space-y-2 lg:space-y-0">
          <ImageUpload
            previewImage={currentImage}
            handleImageChange={handleImageChange}
          />
          <div className="flex w-full lg:w-1/2 justify-center flex-col  space-y-2 py-10 ">
            <p className="font-semibold text-sm">User Info</p>

            <input
              type="text"
              id="first_name"
              className="input w-full"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
            ></input>

            <input
              type="text"
              id="first_name"
              className="input w-full"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            ></input>
            <input
              type="text"
              id="first_name"
              className="input w-full"
              placeholder="Confirme Password"
              onChange={(e) => setCpassword(e.target.value)}
              value={Cpassword}
              required
            ></input>

            {isUserSubscribe && (
              <div>
                <p className="font-semibold text-sm">User subscription</p>
                <div className="dark:bg-darkSecondary bg-white shadow-sm rounded-md p-2 px-4">
                  <p className=" text-sm">
                    subscription plan{" "}
                    <span className="px-4 font-semibold text-lg">
                      {user.subscription?.planType}
                    </span>
                  </p>
                  <p className=" text-sm">
                    subscription Start Date{" "}
                    <span className="px-4 font-semibold ">
                      {formatDate(user.subscription?.planStartDate)}
                    </span>
                  </p>
                  <p className=" text-sm">
                    subscription End Date{" "}
                    <span className="px-4 font-semibold">
                      {formatDate(user.subscription?.planEndDate)}
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-row space-x-2 justify-center ">
          <button
            className="font-medium dark:text-white text-gray-900  hover:underline rounded-lg px-4 py-2 bg-white dark:bg-darkBackground border dark:border-white border-black"
            onClick={() => {}}
          >
            Update Account
          </button>
          <button
            className="font-medium dark:text-white text-gray-900  hover:underline rounded-lg px-4 py-2 bg-red-500 hover:bg-red-800 border dark:border-white border-black"
            onClick={() => {}}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
