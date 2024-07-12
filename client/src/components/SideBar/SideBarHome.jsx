import { isAuthenticated } from "../../helpers/PrivateRouter";
import { useNavigate } from "react-router-dom";

function SideBarHome({ className, isNotHidden }) {
  const navigate = useNavigate();

  return (
    <div className={`${className}`}>
      <div className="hover:underline">
        <a href="#Services">Services</a>
      </div>
      <div className="hover:underline">
        <a href="#Testmonials">Testmonials</a>
      </div>
      <div className="hover:underline">
        <a href="#Pricing">Pricing</a>
      </div>
      {/* <div className="hover:underline">
        <a href="#Resources">Resources</a>
      </div>
      <div className="hover:underline">
        <a href="#What-new"> What's new</a>
      </div> */}
      {!isAuthenticated() && (
        <div className="hover:underline">
          <a href="#Contact"> Contact</a>
        </div>
      )}
      {!isAuthenticated() && isNotHidden && (
        <div className=" flex flex-col w-full px-6 gap-2">
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
    </div>
  );
}

export default SideBarHome;
