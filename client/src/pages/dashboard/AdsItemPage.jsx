import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { fetchData } from "../../services/api";
import { useParams } from "react-router-dom";
import { formatDate } from "../../utils/dateFormatter";
import { BarChart, LineChart, PieChart } from "../../charts";
import {
  getBarChartData,
  getChartData,
  getChartDataLine,
} from "./dataTransformer";
import Chart from "./components/ChartSection";

function dataItemPage() {
  const [cookies] = useCookies(["access-token"]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const [adData, setAdData] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const data = await fetchData(
          `${id}?fields=id,name,created_time,status,updated_time,insights{date_start,date_stop}`,
          cookies["access-token"]
        );
        setData(data);
        // console.log(data);
        // console.log(data?.insights?.data);
        setAdData(data?.insights?.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchdata();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-row justify-center items-center w-full font-medium text-2xl text-black dark:text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center w-full font-medium text-2xl text-black dark:text-white">
        Error <span className="text-red-600">{error.message}</span>
      </div>
    );
  }

  const dataChart = getChartData(adData);
  const dataChartLine = getChartDataLine(adData);
  const dataBarChart = getBarChartData(adData);

  return (
    <>
      <>
        <div className="flex flex-col items-center h-[calc(100vh)-] overflow-auto no-scrollbar mx-auto py-2 gap-2 w-full px-4 space-y-2 text-black dark:text-white">
          {data && (
            <div className="p-4  mx-1 relative  w-full  h-min bg-white dark:bg-darkSecondary rounded-md shadow-md">
              <div
                className={`px-4 py-1 text-center rounded-xl absolute top-2 right-4 ${
                  data.status.toLowerCase() === "active"
                    ? "bg-green-400"
                    : "bg-red-400"
                }`}
              >
                {data.status}
              </div>
              <div
                className={` py-4 px-6 font-semibold dark:text-white whitespace-nowrap truncate text-xl `}
                title={data.name}
              >
                {data.name}
              </div>
              <div className=" py-4 px-6 flex flex-row md:flex-col space-x-6 md:space-x-0">
                <div>
                  Created Time{" "}
                  <span className="font-semibold px-2">
                    {formatDate(data.created_time)}
                  </span>
                </div>
                <div>
                  Updated Time{" "}
                  <span className="font-semibold px-2">
                    {formatDate(data.updated_time)}
                  </span>{" "}
                </div>
              </div>
            </div>
          )}

          <Chart data={data} />
        </div>
      </>
    </>
  );
}

export default dataItemPage;
