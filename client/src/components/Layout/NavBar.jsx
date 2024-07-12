import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { MdOutlineDarkMode, MdOutlineWbSunny } from "react-icons/md";
import AvatarDrop from "./AvatarDrop";
import SidebarMobile from "./SideBarMobile";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleTheme } from "../../../state/actions/themeActions";
import { isAdmin, isAuthenticated } from "../../helpers/PrivateRouter";
import { SideBarHome, Sidebar } from "../SideBar";
import Notifications from "./Notifications";

export default function NavBar({ isHome }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const auth = useSelector((state) => state.auth);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  useEffect(() => {
    const html = document.querySelector("html");
    if (darkMode === true) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [darkMode]);

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className=" absolute bg-white dark:bg-darkBackground  w-full h-14  top-0 flex flex-row items-center justify-between pr-10 shadow-md">
      <a
        className="text-xl font-medium dark:text-white text-black"
        onClick={() => {
          navigate(`/`);
        }}
      >
        <img src="/Logo.svg" alt="Graphbuild" className=" w-36" />
      </a>
      {!isHome && <SearchBar className="hidden md:block" />}
      {isHome && !isAdmin() && (
        <SideBarHome
          className={"hidden md:flex flex-row gap-4  font-semibold "}
        />
      )}
      <div className="flex flex-row gap-2 items-center ">
        {isAuthenticated() && (
          <div className="flex flex-row items-center gap-2">
            <Notifications />
            <AvatarDrop
              className="hidden sm:block"
              userData={auth.user}
              isHome={isHome}
            />
          </div>
        )}
        <div className="md:hidden flex flex-1 justify-end items-center px-2">
          <SidebarMobile
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            darkMode={darkMode}
            handleToggleTheme={handleToggleTheme}
            widget={
              !isAuthenticated() ? (
                <SideBarHome
                  className={
                    "flex flex-col gap-8 text-sm font-semibold  w-full items-center h-full justify-center py-4 "
                  }
                  isNotHidden={true}
                />
              ) : (
                <Sidebar />
              )
            }
            isHome={isHome}
          />
        </div>
        {!isAuthenticated() && (
          <div className=" hidden md:flex gap-2">
            <button
              className="font-medium dark:text-white text-gray-900 hover:underline rounded-full px-6 py-1 bg-white dark:bg-darkBackground border dark:border-white border-black"
              onClick={() => {
                navigate("/login");
              }}
            >
              Log In
            </button>
            <button
              className="font-medium text-white dark:text-gray-900 hover:underline rounded-full px-6 py-1 dark:bg-white bg-darkSecondary border dark:border-white border-black"
              onClick={() => {
                navigate("/register");
              }}
            >
              Sign Up
            </button>
          </div>
        )}
        {darkMode ? (
          <MdOutlineDarkMode
            size={"25px"}
            className="hidden md:block"
            onClick={handleToggleTheme}
            color="white"
          />
        ) : (
          <MdOutlineWbSunny
            size={"25px"}
            color="black"
            className="hidden md:block"
            onClick={handleToggleTheme}
          />
        )}
      </div>
    </div>
  );
}
