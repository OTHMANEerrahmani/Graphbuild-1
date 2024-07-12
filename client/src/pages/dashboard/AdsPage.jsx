import { useEffect, useState } from "react";
import { DropDown } from "../../components";
import { useSelector } from "react-redux";
import { formatDate } from "../../utils/dateFormatter";
import { useNavigate } from "react-router-dom";
// import SearchBar from "../../components/SearchBar";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { fetchDataFromUrl } from "../../services/api";
import { SearchBar } from "../../components/Layout";

function AdsPage() {
  const navigate = useNavigate();
  const { data, loading, error } = useSelector((state) => state.data);
  const [AdAccountData, setAdAccountData] = useState([]);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [pagination, setPagination] = useState({
    previous: null,
    next: null,
  });

  useEffect(() => {
    if (data.adaccounts && data.adaccounts.data) {
      const updatedAdAccountData = [];
      data.adaccounts.data.forEach((adAccount) => {
        if (adAccount.ads && adAccount.ads.data) {
          adAccount.ads.data.forEach((ad) => {
            updatedAdAccountData.push(ad);
          });
          setPagination({
            previous: adAccount.ads.paging.previous ?? null,
            next: adAccount.ads.paging.next ?? null,
          });
          console.log(pagination.next);
        }
      });
      setAdAccountData(updatedAdAccountData);
    }
  }, [data.adaccounts]);

  const fetchAdSets = async (url) => {
    try {
      const response = await fetchDataFromUrl(url);
      const updatedAdAccountData = [];
      response.data.forEach((ad) => {
        updatedAdAccountData.push(ad);
      });
      setAdAccountData(updatedAdAccountData);
      setPagination({
        previous: response?.paging.previous ?? null,
        next: response?.paging.next ?? null,
      });
    } catch (error) {
      console.error("Error fetching ad sets:", error);
    }
  };

  const sortByName = () => {
    const sortedData = [...AdAccountData].sort((a, b) => {
      return b.name.localeCompare(a.name);
    });
    setAdAccountData(sortedData);
  };

  if (loading) {
    return (
      <div className="flex flex-row justify-center items-center w-full font-medium text-2xl dark:text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center w-full font-medium text-2xl">
        Error <span className="text-red-600">{error.message}</span>
      </div>
    );
  }

  return (
    <>
      <div className="w-full pt-4">
        <div className="w-full flex flex-row justify-end items-center p-2 space-x-4">
          <SearchBar className="border " />
          <div className="md:w-44">
            <DropDown
              default="Filter By "
              options={[
                {
                  name: "Name",
                  action: () => {
                    sortByName();
                  },
                },
                {
                  name: "Status",
                  action: () => {},
                },
              ]}
            />
          </div>
        </div>
        <div className="text-[10px] md:text-xs text-left text-gray-500 dark:text-gray-400 table-auto md:w-full sm:w-2/3 px-4">
          <div className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <div className="flex">
              <div className="w-1/5 py-3 px-6">Name</div>
              <div className="w-1/5 py-3 px-6">Created Time</div>
              <div className="w-1/5 py-3 px-6">Updated Time</div>
              <div className="w-1/5 py-3 px-6 text-center">Status</div>
              <div className="w-1/5 py-3 px-6 text-center">Action</div>
            </div>
          </div>
          <div className="h-[calc(100vh-16rem)] overflow-auto no-scrollbar dark:text-slate-200 text-gray-900">
            {AdAccountData &&
              AdAccountData.map((ads) => (
                <div
                  className="flex border-b bg-white dark:bg-gray-800 dark:border-gray-700"
                  key={ads.id}
                >
                  <div
                    className={`w-1/5 py-4 px-6 font-medium dark:text-white whitespace-nowrap truncate`}
                    title={ads.name}
                  >
                    {ads.name}
                  </div>
                  <div className="w-1/5 py-4 px-6">
                    {formatDate(ads.created_time)}
                  </div>
                  <div className="w-1/5 py-4 px-6">
                    {formatDate(ads.updated_time)}
                  </div>
                  <div className="w-1/5 flex justify-center items-center">
                    <div
                      className={`p-2 rounded-full text-center ${
                        ads.status.toLowerCase() === "active"
                          ? "bg-green-400"
                          : "bg-red-400"
                      }`}
                    >
                      {ads.status}
                    </div>
                  </div>
                  <div className="w-1/5 flex justify-center items-center">
                    <button
                      className="font-medium text-white bg-green-600 dark:bg-green-500 hover:underline rounded-full px-4 py-2"
                      onClick={() => navigate(`/dashboard/ads/${ads.id}`)}
                    >
                      Show
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="flex flex-row  w-full h-5 px-8 py-2 justify-end">
          {pagination.previous && (
            <MdOutlineArrowBackIos
              size={"25px"}
              color={darkMode ? "white" : "black"}
              onClick={() => {
                fetchAdSets(pagination.previous);
              }}
            />
          )}
          {pagination.next && (
            <MdOutlineArrowForwardIos
              size={"25px"}
              color={darkMode ? "white" : "black"}
              onClick={() => {
                fetchAdSets(pagination.next);
              }}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default AdsPage;
