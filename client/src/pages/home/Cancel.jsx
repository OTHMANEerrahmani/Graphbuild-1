import { useNavigate } from "react-router-dom";

const Cancel = () => {
  const navigate = useNavigate();

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
                  onClick={() => navigate("/")}
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

export default Cancel;
