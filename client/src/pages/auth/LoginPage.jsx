import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { fetchAuthSuccess } from "../../../state/actions/authActions";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [subscribe, setSubscribe] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [type, setType] = useState("password");

  const [error, setError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleToggle = () => {
    setType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  const handleCheckboxChange = () => {
    setSubscribe(!subscribe);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (email == "" && password == "") {
      setError("Fill the blanks");
    } else {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_SERVER}/auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.msg);
          throw new Error("Failed to log in");
        }

        const loggedIn = await response.json();

        if (loggedIn) {
          dispatch(fetchAuthSuccess(loggedIn.user, loggedIn.token));
          navigate(`/dashboard`);
          setError("");
        }
      } catch (error) {
        console.error(error);
        dispatch(fetchAuthFailure(error.message));
      }
    }
  };

  const google = async () => {
    try {
      const url = `${import.meta.env.VITE_APP_SERVER}/auth/google`;
      window.open(url);
      window.location = url;
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to sign in with Google");
    }
  };

  return (
    <section className="login flex justify-center items-center mx-4 w-full">
      <form className="form text-black bg-white p-8 rounded-lg shadow-lg md:w-1/2 lg:w-1/3 space-y-4">
        <div className="text-xl font-bold text-center mt-2 flex flex-row pb-4">
          Login In
        </div>
        <div className="flex flex-col gap-2">
          <label>Email</label>
          <div className="inputForm border border-gray-300 rounded-md flex items-center pl-2 focus-within:border-blue-500">
            <svg
              height={20}
              viewBox="0 0 32 32"
              width={20}
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Layer_3" data-name="Layer 3">
                <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z" />
              </g>
            </svg>
            <input
              type="text"
              id="email"
              className="input bg-white dark:bg-white w-full focus:outline-none border-none dark:text-black"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your Email"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label>Password</label>
          <div className="inputForm border border-gray-300 rounded-md flex items-center pl-2 focus-within:border-blue-500 px-4">
            <svg
              height={20}
              viewBox="-64 0 512 512"
              width={20}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0" />
              <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0" />
            </svg>
            <input
              type={type}
              className="input bg-white  dark:bg-white  border-none w-full focus:outline-none text-black dark:text-black"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your Password"
            />
            {type === "password" ? (
              <FaEye onClick={handleToggle} className="cursor-pointer" />
            ) : (
              <FaEyeSlash onClick={handleToggle} className="cursor-pointer" />
            )}
          </div>
          {error !== "" && (
            <p className="text-red-500 text-sm font-medium">{error}</p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={subscribe}
              onChange={handleCheckboxChange}
            />
            <label>Remember me</label>
          </div>
          <Link to="/forget-password">
            <span className="text-blue-500 text-sm cursor-pointer">
              Forgot password?
            </span>
          </Link>
        </div>
        <button
          className="button-submit bg-black text-white font-semibold rounded-md py-2 mt-4 w-full"
          onClick={handleSignIn}
        >
          Sign In
        </button>
        <p className="text-center text-sm mt-2">
          Don't have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Sign Up
          </span>
        </p>
        <p className="text-center text-sm mt-1">Or With</p>
        <div className="flex gap-4 mt-2 flex-row w-full justify-center">
          <button
            className="btn google flex items-center gap-2 rounded-md py-2 px-4 bg-white border border-gray-300 hover:border-blue-500 cursor-pointer w-1/2 justify-center"
            onClick={google}
          >
            <svg
              version="1.1"
              width={20}
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 512 512"
            >
              <path
                style={{ fill: "#FBBB00" }}
                d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256
	c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456
	C103.821,274.792,107.225,292.797,113.47,309.408z"
              />
              <path
                style={{ fill: "#518EF8" }}
                d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451
	c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535
	c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z"
              />
              <path
                style={{ fill: "#28B446" }}
                d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512
	c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771
	c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z"
              />
              <path
                style={{ fill: "#F14336" }}
                d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012
	c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0
	C318.115,0,375.068,22.126,419.404,58.936z"
              />
            </svg>
            Google
          </button>
          <button className="btn facebook flex items-center gap-2 rounded-md py-2 px-4 bg-white border border-gray-300 hover:border-blue-500 cursor-pointer w-1/2 justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="20"
              height="20"
              viewBox="0 0 48 48"
            >
              <linearGradient
                id="Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1"
                x1="9.993"
                x2="40.615"
                y1="9.993"
                y2="40.615"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#2aa4f4"></stop>
                <stop offset="1" stopColor="#007ad9"></stop>
              </linearGradient>
              <path
                fill="url(#Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1)"
                d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"
              ></path>
              <path
                fill="#fff"
                d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z"
              ></path>
            </svg>
            Facebook
          </button>
        </div>
      </form>
    </section>
  );
}

export default LoginPage;
