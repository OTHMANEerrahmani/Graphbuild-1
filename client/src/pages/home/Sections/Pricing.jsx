import { useNavigate } from "react-router-dom";
import { isAuthenticated, isSubscribe } from "../../../helpers/PrivateRouter";
import { useSelector } from "react-redux";

export default function Pricing({ pricingOption }) {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const checkout = (plan) => {
    fetch("http://localhost:3001/stripe/create-stripe-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({ plan: plan, userId: auth.user._id }),
    })
      .then(async (res) => {
        if (res.ok) return res.json();
        const json = await res.json();
        return Promise.reject(json);
      })
      .then(({ session }) => {
        window.location = session.url;
      })
      .catch((e) => {
        console.log(e.error);
      });
  };

  const isUserAuthenticated = isAuthenticated();
  const subscriptionName = isSubscribe();

  return (
    <section>
      <div
        className={`py-2 text-gray-900 dark:text-white flex flex-col items-center lg:max-w-md max-w-sm p-4 mx-auto my-0  border-solid 
       rounded-lg border-2 ${
         subscriptionName === pricingOption.name
           ? "border-blue-700"
           : "border-gray"
       }`}
      >
        <h3 className="m-0 text-2xl font-semibold leading-tight tracking-tight border-0 border-gray-200 sm:text-3xl md:text-4xl ">
          {pricingOption.name}
        </h3>
        <div className="flex items-end mt-6 leading-7 border-0 border-gray-200">
          <p className="box-border m-0 text-6xl font-semibold leading-none border-solid">
            ${pricingOption.price}
          </p>
          <p className="box-border m-0 border-solid">/ {pricingOption.per}</p>
        </div>
        <ul className="flex-1 p-0 mt-4 ml-5 leading-7 border-0 border-gray-200">
          {pricingOption.features.map((feature, index) => (
            <li
              key={`${pricingOption.name}-${index}`} // Use a unique key
              className="inline-flex items-center w-full mb-2 ml-5 font-semibold text-left border-solid"
            >
              <svg
                className="w-5 h-5 mr-2 font-semibold leading-7 text-blue-600 sm:h-5 sm:w-5 md:h-6 md:w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              {feature}
            </li>
          ))}
        </ul>
        <button
          className={`inline-flex justify-center w-full px-4 py-3 mt-8 font-sans text-sm leading-none text-center text-blue-600 no-underline  border border-blue-600 rounded-md focus-within:bg-blue-700 focus-within:border-blue-700 focus-within:text-white sm:text-base md:text-lg font-semibold ${
            subscriptionName === pricingOption.name
              ? "bg-blue-700 text-white"
              : "bg-transparent hover:bg-blue-700 hover:border-blue-700 hover:text-white cursor-pointer"
          }  `}
          disabled={subscriptionName === pricingOption.name}
          onClick={() => {
            if (isUserAuthenticated) {
              checkout(pricingOption.name);
            } else {
              navigate(`/login`);
            }
          }}
        >
          {subscriptionName
            ? subscriptionName === pricingOption.name
              ? "Subscribed"
              : "Upgrade"
            : "Start Now"}
        </button>
      </div>
    </section>
  );
}
