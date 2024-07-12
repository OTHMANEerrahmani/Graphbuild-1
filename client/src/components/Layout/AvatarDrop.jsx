import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { authLogout } from "../../../state/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { isAdmin } from "../../helpers/PrivateRouter";

export default function AvatarDrop(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const picturePath = props?.userData?.picturePath;
  const isAdminUser = isAdmin();
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <Menu as="div" className={`relative inline-block ${props.className}`}>
      <div>
        <Menu.Button>
          <img
            src={
              picturePath
                ? picturePath.startsWith("https")
                  ? `${picturePath}`
                  : `${
                      import.meta.env.VITE_APP_SERVER + "/assets/" + picturePath
                    }`
                : `${import.meta.env.VITE_APP_SERVER}/assets/defaultProfile.png`
            }
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={`absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-h-max text-center ${
            !darkMode
              ? "bg-white text-darkBackground"
              : "bg-darkBackground text-white"
          }`}
        >
          <Menu.Item key="dashboard">
            <a
              className=" block px-4 py-2 text-sm"
              role="menuitem"
              tabIndex="-1"
              onClick={() => {
                navigate(`/Dashboard`);
              }}
            >
              Dashboard
            </a>
          </Menu.Item>

          <Menu.Item key="account-settings">
            <a
              className=" block px-4 py-2 text-sm"
              role="menuitem"
              tabIndex="-1"
              onClick={() => {
                navigate(`/Dashboard/profile`);
              }}
            >
              Account settings
            </a>
          </Menu.Item>

          {isAdminUser && (
            <Menu.Item key="support">
              <a
                className=" block px-4 py-2 text-sm"
                role="menuitem"
                tabIndex="-1"
                onClick={() => {
                  navigate(`/chat`);
                }}
              >
                Support
              </a>
            </Menu.Item>
          )}

          {isAdminUser && (
            <Menu.Item key="support">
              <a
                className=" block px-4 py-2 text-sm"
                role="menuitem"
                tabIndex="-1"
                onClick={() => {
                  navigate(`/dashboard/payment`);
                }}
              >
                Stripe payement
              </a>
            </Menu.Item>
          )}
          <Menu.Item key="sign-out">
            <button
              type="submit"
              className=" block w-full px-4 py-2 text-sm"
              role="menuitem"
              tabIndex="-1"
              onClick={() => {
                dispatch(authLogout());
                navigate(`/`);
              }}
            >
              Sign out
            </button>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
