import MaxWidthWrapper from "../components/MaxWidthWrapper";
import { FaCheck, FaStar } from "react-icons/fa";

function Testmonials() {
  return (
    <section className=" lg:py-24 py-4 h-screen snap-start" id="Testmonials">
      <MaxWidthWrapper className="flex flex-col items-center gap-4 md:gap-14 lg:gap-32">
        <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6">
          <h2 className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl ">
            What our <span className="relative px-2">customers </span> say
          </h2>
        </div>

        <div className="mx-auto grid max-w-2xl grid-cols-1 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2 gap-y-16">
          <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
            <div className="flex gap-0.5 mb-2">
              <FaStar className="h-5 w-5 text-green-600 fill-green-600" />
              <FaStar className="h-5 w-5 text-green-600 fill-green-600" />
              <FaStar className="h-5 w-5 text-green-600 fill-green-600" />
              <FaStar className="h-5 w-5 text-green-600 fill-green-600" />
              <FaStar className="h-5 w-5 text-green-600 fill-green-600" />
            </div>
            <div className="md:text-lg leading-8">
              <p>
                "This SaaS platform has completely transformed how we handle our
                advertising efforts. The{" "}
                <span className="font-semibold p-0.5 bg-slate-800 text-white">
                  Automated Ad Campaign Management
                </span>{" "}
                ensures our bids are always optimized, saving us both time and
                money. The{" "}
                <span className="font-semibold p-0.5 bg-slate-800 text-white">
                  Real-Time Performance Analytics
                </span>{" "}
                give us instant insights into our campaigns, and the{" "}
                <span className="font-semibold p-0.5 bg-slate-800 text-white">
                  Advanced Media Management
                </span>{" "}
                feature has streamlined our media workflow. Highly recommend!"
              </p>
            </div>
            <div className="flex gap-4 mt-2">
              <img
                className="rounded-full h-12 w-12 object-cover"
                src="/users/user-1.png"
                alt="user"
              />
              <div className="flex flex-col">
                <p className="font-semibold">Jonathan</p>
                <div className="flex gap-1.5 items-center text-zinc-600 dark:text-slate-200  ">
                  <FaCheck className="h-4 w-4 stroke-[3px] text-green-600" />
                  <p className="text-sm">Verified Purchase</p>
                </div>
              </div>
            </div>
          </div>

          {/* second user review */}
          <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
            <div className="flex gap-0.5 mb-2">
              <FaStar className="h-5 w-5 text-green-600 fill-green-600" />
              <FaStar className="h-5 w-5 text-green-600 fill-green-600" />
              <FaStar className="h-5 w-5 text-green-600 fill-green-600" />
              <FaStar className="h-5 w-5 text-green-600 fill-green-600" />
              <FaStar className="h-5 w-5 text-green-600 fill-green-600" />
            </div>
            <div className="md:text-lg leading-8">
              <p>
                "Using this SaaS has revolutionized our ad campaign process. The{" "}
                <span className="font-semibold p-0.5 bg-slate-800 text-white">
                  Automated Ad Campaign Management
                </span>{" "}
                feature has saved us countless hours, and the results have been
                phenomenal. Our campaigns are now optimized in real-time,
                resulting in a significant increase in ROI."
              </p>
            </div>
            <div className="flex gap-4 mt-2">
              <img
                className="rounded-full h-12 w-12 object-cover"
                src="/users/user-2.png"
                alt="user"
              />
              <div className="flex flex-col">
                <p className="font-semibold">Jasmine</p>
                <div className="flex gap-1.5 items-center text-zinc-600 dark:text-slate-200">
                  <FaCheck className="h-4 w-4 stroke-[3px] text-green-600" />
                  <p className="text-sm">Verified Purchase</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}

export default Testmonials;
