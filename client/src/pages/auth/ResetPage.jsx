import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Logo from "../../components/Logo";

function ResetPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const { id, token } = useParams();
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword || !passwordMatch) {
      return;
    }

    fetch(
      `${import.meta.env.VITE_APP_SERVER}/auth/reset-password/${id}/${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.Status === "Success") {
          navigate("/login");
        }
      })
      .catch((err) => console.error("Error:", err));
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
  return (
    <>
      <div className="flex justify-center items-center bg-secondary h-screen w-full text-black">
        <div className="bg-white p-3 rounded w-1/3">
          <Logo />
          <h4 className="mb-2 text-center font-medium text-xl">
            Reset Password
          </h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="password" className="block">
                <p>New Password</p>
              </label>
              <input
                type="text"
                placeholder="Enter Password"
                autoComplete="off"
                name="password"
                className="border rounded w-full px-2 py-1 mt-1"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="block">
                <p>Confirme Password</p>
              </label>
              <input
                type="text"
                placeholder="Confirm your Password"
                autoComplete="off"
                name="password"
                className="border rounded w-full px-2 py-1 mt-1"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
            </div>
            {!passwordMatch && (
              <p className="text-red-500 text-sm font-medium">
                Passwords do not match.
              </p>
            )}
            <button
              type="submit"
              className="button-submit bg-black text-white font-semibold rounded-md py-2 mt-4 w-full"
              disabled={!passwordMatch}
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ResetPage;
