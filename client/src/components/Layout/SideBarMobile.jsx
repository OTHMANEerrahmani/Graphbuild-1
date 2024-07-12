import { RiMenu3Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineDarkMode, MdOutlineWbSunny } from "react-icons/md";

const SidebarMobile = ({
  isOpen,
  setIsOpen,
  darkMode,
  handleToggleTheme,
  widget,
}) => {
  return (
    <>
      <div className="z-20 absolute right-8 ">
        <div className="flex flex-row items-center space-x-2">
          {isOpen &&
            (darkMode ? (
              <MdOutlineDarkMode
                size={"25px"}
                onClick={() => handleToggleTheme()}
                color={"white"}
              />
            ) : (
              <MdOutlineWbSunny
                size={"25px"}
                color={"black"}
                onClick={() => handleToggleTheme()}
              />
            ))}
          {isOpen ? (
            <button
              className="text-xl md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              <RxCross2 size={28} color={darkMode ? "white" : "black"} />
            </button>
          ) : (
            <button
              className="text-xl md:hidden z-20 dark:text-white text-black"
              onClick={() => setIsOpen(!isOpen)}
            >
              <RiMenu3Line size={28} color={darkMode ? "white" : "black"} />
            </button>
          )}
        </div>
      </div>

      <div
        className={`fixed ${
          isOpen ? "z-[1] backdrop-blur-sm bg-slate-900/60" : "invisible"
        } right-0 top-0 h-full w-full `}
      >
        <div
          className={` md:hidden text-xl sm:text-2xl bg-white dark:bg-darkSecondary min-w-[300px] absolute right-0 h-full shadow-lg shadow-slate-900/50 dark:shadow-slate-700 border-l border-slate-900 dark:border-slate-700 ${
            isOpen ? "translate-x-0" : "invisible translate-x-full"
          } transition-all flex flex-col  items-center pt-8 p-4 w-1/2`}
        >
          {widget}
        </div>
      </div>
    </>
  );
};

export default SidebarMobile;
