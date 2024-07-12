import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../../api/UserRequests";
const Conversation = ({
  data,
  currentUser,
  online,
  showNotification,
  notifications,
}) => {
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUser);

    const getUserData = async () => {
      try {
        const userData = await getUser(userId);
        setUserData(userData);
        dispatch({ type: "SAVE_USER", data: userData });
      } catch (error) {
        console.log(error);
      }
    };

    getUserData();
  }, [data, currentUser, dispatch]);
  return (
    <>
      <div className="flex md:flex-row w-min md:w-full   items-center justify-center">
        <div className="relative flex flex-col items-center justify-center ">
          {/* Profile Picture */}
          <div className="relative">
            <img
              src={
                userData?.picturePath
                  ? userData.picturePath.includes("https")
                    ? `${userData.picturePath}`
                    : `${
                        import.meta.env.VITE_APP_SERVER +
                        "/assets/" +
                        userData.picturePath
                      }`
                  : `${
                      import.meta.env.VITE_APP_SERVER
                    }/assets/defaultProfile.png`
              }
              alt="Profile"
              className="w-14 rounded-full object-cover"
            />
            {notifications.length > 0 && !showNotification && (
              <div
                className={`absolute w-5 h-5 rounded-full z-10 text-center text-sm dark:bg-white bg-darkPrimary dark:text-black font-medium text-white top-0 right-0`}
              >
                {notifications.length}
              </div>
            )}
            <div
              className={`absolute w-4 h-4 rounded-full ${
                online ? "bg-green-500" : "bg-red-500"
              } bottom-0 right-0`}
            ></div>
          </div>

          <div className="text-sm font-medium">{userData?.name}</div>
        </div>
      </div>
      <hr className="hidden md:block w-11/12 my-4 border-gray-300 border-t" />
    </>
  );
};

export default Conversation;
