import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo";
import toast from "react-hot-toast";

function ForgetPage() {
  const [email, setEmail] = useState();
  const [validEmail, setValidEmail] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setValidEmail(emailRegex.test(email));

    if (email && validEmail) {
      toast.success("Successfully email sent!");

      fetch(`${import.meta.env.VITE_APP_SERVER}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.Status === "Success") {
            navigate("/login");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <div className="flex justify-center items-center bg-secondary w-full h-screen text-black">
        <div className="bg-white md:w-1/3 mx-2 p-3 rounded text-center space-y-2">
          <Logo />
          <h4 className="mb-2 text-center font-medium text-xl">
            Forgot Password
          </h4>
          <p className="text-sm ">
            Enter the email address associated with your account.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 ">
              <label htmlFor="email" className="block"></label>
              <input
                type="email"
                placeholder="Enter Email"
                autoComplete="off"
                name="email"
                className="border rounded w-full  my-1 p-2"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="button-submit bg-black text-white font-semibold rounded-md py-2  w-full"
            >
              Recover Password
            </button>
            {!validEmail && (
              <p className="text-red-500 text-sm font-medium py-2">
                Please enter a valid email.
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default ForgetPage;
