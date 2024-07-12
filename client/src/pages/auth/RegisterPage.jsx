import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

export function RegisterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordMatch, setPasswordMatch] = useState(true);
  const [validEmail, setValidEmail] = useState(true);

  const [error, setError] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setValidEmail(emailRegex.test(email));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (confirmPassword && e.target.value !== confirmPassword) {
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value !== password) {
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword || !passwordMatch) {
      return;
    }
    if (email == "" && password == "" && name == "" && confirmPassword == "") {
      setError("Fill the blanks");
    } else {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_SERVER}/auth/register`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.msg);
          throw new Error("Failed to sign up");
        }

        const user = await response.json();

        if (user) {
          toast.success("Successfully User Created!");
          navigate(`/login`);
        }
      } catch (error) {
        console.error(error);
        toast.error(error.message);
        dispatch(fetchAuthFailure(error.message));
      }
    }
  };

  return (
    <section className="signup flex justify-center items-center mx-4 w-full">
      <form className="form text-black bg-white p-8 rounded-lg shadow-lg md:w-1/2 lg:w-1/3 space-y-4">
        <div className="text-xl font-bold text-center mt-2 flex flex-row pb-4">
          Sign Up
        </div>

        <div className="flex flex-col gap-2">
          <label>Name</label>
          <div className="inputForm border border-gray-300 rounded-md flex items-center pl-2 focus-within:border-blue-500 ">
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
              id="name"
              className="input bg-white dark:bg-white dark:text-black w-full focus:outline-none border-none"
              value={name}
              onChange={handleNameChange}
              placeholder="Enter your Name"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label>Email</label>
          <div className="inputForm border border-gray-300 rounded-md flex items-center pl-2 focus-within:border-blue-500 ">
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
              className="input bg-white dark:bg-white dark:text-black w-full focus:outline-none border-none"
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
              <path d="M336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0" />
              <path d="M304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0" />
            </svg>
            <input
              type={showPassword ? "text" : "password"}
              className="input bg-white  dark:bg-white  border-none w-full focus:outline-none text-black dark:text-black"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your Password"
            />
            {showPassword ? (
              <FaEyeSlash
                onClick={handleTogglePassword}
                className="cursor-pointer"
              />
            ) : (
              <FaEye
                onClick={handleTogglePassword}
                className="cursor-pointer"
              />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label>Confirm Password</label>
          <div className="inputForm border border-gray-300 rounded-md flex items-center pl-2 focus-within:border-blue-500 px-4">
            <svg
              height={20}
              viewBox="-64 0 512 512"
              width={20}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0" />
              <path d="M304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0" />
            </svg>
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="input bg-white  dark:bg-white  border-none w-full focus:outline-none text-black dark:text-black"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="Confirm your Password"
            />
            {showConfirmPassword ? (
              <FaEyeSlash
                onClick={handleToggleConfirmPassword}
                className="cursor-pointer"
              />
            ) : (
              <FaEye
                onClick={handleToggleConfirmPassword}
                className="cursor-pointer"
              />
            )}
          </div>
          {!passwordMatch && (
            <p className="text-red-500 text-sm font-medium">
              Passwords do not match.
            </p>
          )}
          {!validEmail && (
            <p className="text-red-500 text-sm font-medium">
              Please enter a valid email.
            </p>
          )}
          {error !== "" && (
            <p className="text-red-500 text-sm font-medium">{error}</p>
          )}
        </div>
        <button
          className="button-submit bg-black text-white font-semibold rounded-md py-2 mt-4 w-full"
          onClick={handleSignUp}
          disabled={!passwordMatch}
        >
          Sign Up
        </button>
        <p className="text-center text-sm mt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Log In
          </Link>
        </p>
      </form>
    </section>
  );
}

export default RegisterPage;
