import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAuthSuccess } from "../../../state/actions/authActions";
import { getUser } from "../../api/UserRequests";

const Success = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const userId = auth.user._id;
  const dispatch = useDispatch();

  const [sessionId, setSessionId] = useState("");

  const fetchUserDataSession = async () => {
    if (userId) {
      try {
        const data = await getUser(userId);
        if (data) {
          setSessionId(data.subscription.sessionId || "");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  const fetchUserData = async () => {
    if (userId) {
      try {
        const data = await getUser(userId);
        if (data) {
          dispatch(fetchAuthSuccess(data, auth.token));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  useEffect(() => {
    fetchUserDataSession();
  }, [userId]);

  const handlePaymentSuccess = () => {
    fetch("http://localhost:3001/stripe/payment-success", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionId: sessionId, userId: userId }),
    })
      .then(async (res) => {
        if (res.ok) return res.json();
        const json = await res.json();
        return await Promise.reject(json);
      })
      .then((data) => {
        console.log(data.message);
        fetchUserData();
        navigate("/");
      })
      .catch((e) => {
        console.log(e.error);
      });
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden dark:bg-darkPrimary bg-slate-50 py-6 sm:py-12">
      <div className="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
        <div className="mx-auto max-w-md">
          <img src="/vite.svg" className="h-10  w-full" alt="Proceed" />
          <div className="divide-y divide-gray-300/50">
            <div className="space-y-6 py-8 text-base leading-7 text-gray-600">
              <p>
                An advanced online playground for Tailwind CSS, including
                support for things like:
              </p>
              <p className="flex items-center justify-center ">
                <button
                  onClick={() => handlePaymentSuccess()}
                  className=" capitalize bg-darkPrimary text-white  px-6 py-2 rounded "
                >
                  Proceed
                </button>
              </p>
            </div>
            <div className="pt-8 text-base font-semibold leading-7">
              <p className="text-gray-900">Want to dig deeper into Tailwind?</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
