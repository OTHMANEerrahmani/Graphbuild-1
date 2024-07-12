
export default function SearchBar(props) {
  return (
    <div
      className={`w-1/3 bg-slate-50 dark:bg-darkPrimary rounded-md ${props.className}`}
    >
      <div className="relative flex items-center w-full h-8 rounded-lg shadow-sm overflow-hidden">
        <div className="grid place-items-center h-full w-12 text-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <input
          className="peer h-full w-full outline-none text-[12px] md:text-sm text-gray-700 dark:text-white px-2 bg-transparent"
          type="text"
          id="search"
          placeholder="Search something.."
          onChange={props.onChange}
        />
      </div>
    </div>
  );
}
