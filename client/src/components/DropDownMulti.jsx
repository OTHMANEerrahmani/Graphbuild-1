import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useMediaQuery } from "react-responsive";

export default function DropDownMulti(props) {
  const { selectedItems, handleItemClick } = props;
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <Menu
      as="div"
      className={
        isMobile
          ? "relative inline-block text-left w-full max-w-1/4 py-1"
          : "relative inline-block text-left w-full max-w-1/4 py-1"
      }
    >
      <div>
        <Menu.Button className="inline-flex  justify-between rounded-md bg-slate-50 dark:bg-darkPrimary px-4 py-2 text-[12px] md:text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:text-white trucate w-full ">
          {selectedItems.length > 0
            ? selectedItems.map((item) => item.name).join(", ")
            : props.default}
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400 dark:text-white"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-20 mt-2 w-full origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none  overflow-auto no-scrollbar bg-slate-50 dark:bg-darkPrimary dark:text-white md:max-h-44 max-h-24">
          <div className="py-1">
            {props.options.map((item, index) => {
              const isSelected = selectedItems.some(
                (selectedItem) => selectedItem.id === item.id
              );
              return (
                <Menu.Item key={index}>
                  {({ active }) => (
                    <div
                      className={`${
                        active
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-700 dark:text-white"
                      } flex justify-between px-4 py-2 text-[10px] md:text-sm`}
                      onClick={() => handleItemClick(item)}
                    >
                      <span>{item.name}</span>
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-indigo-600 focus:ring-indigo-500"
                        checked={isSelected}
                        onChange={() => handleItemClick(item)}
                      />
                    </div>
                  )}
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
