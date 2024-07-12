import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { MdAdsClick, MdOutlineAttachMoney } from "react-icons/md";
import { useSelector } from "react-redux";
import { FaEye } from "react-icons/fa";

const DisclosureWidget = ({ data, error }) => {
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div className="mx-auto w-full divide-y divide-white/5 rounded-xl bg-white shadow-md dark:bg-white/5">
      <Disclosure as="div" className="p-6" defaultOpen={false}>
        <Disclosure.Button className="group flex w-full items-center justify-between">
          <span className="font-semibold text-sm/6   text-dark dark:text-white group-data-[hover]:text-white/80 ">
            Spend Predictions ?
          </span>
          <ChevronDownIcon
            className={`size-5 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180 ${
              darkMode ? "fill-white/90" : "fill-black"
            }  `}
          />
        </Disclosure.Button>
        <Disclosure.Panel className="mt-2 text-sm/6  text-dark dark:text-white">
          Plan Your Budget with Confidence: Leverage Accurate Spend Predictions
          for Smarter Financial Decisions
          {error && (
            <div className="mt-2 text-lg/6 font-semibold  text-dark dark:text-white text-center">
              No Data Found
            </div>
          )}
          {!error && data.map((item, index) => {
            return (
              <div
                key={index}
                className="flex flex-row justify-around pt-4  text-lg font-semibold"
              >
                <div className="flex flex-row gap-2">
                  <MdAdsClick size={28} color={darkMode ? "white" : "black"} />
                  <span>{item.clicks}</span>
                </div>

                <div className="flex flex-row gap-2 ">
                  <FaEye size={28} color={darkMode ? "white" : "black"} />
                  <span>{item.impressions}</span>
                </div>
                <div className="flex flex-row gap-2 ">
                  <MdOutlineAttachMoney
                    size={28}
                    color={darkMode ? "white" : "black"}
                  />
                  <span>{item.predicted_spend}</span>
                </div>
              </div>
            );
          })}
        </Disclosure.Panel>
      </Disclosure>
    </div>
  );
};

export default DisclosureWidget;
