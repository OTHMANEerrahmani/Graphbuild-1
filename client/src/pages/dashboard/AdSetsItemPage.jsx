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

function AdSetsItemPage() {
  const [cookies] = useCookies(["access-token"]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const [adsetData, setAdsetData] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const data = await fetchData(
          `${id}?fields=account_id,name,updated_time,created_time,rf_prediction_id,promoted_object,targeting,status,daily_budget,lifetime_budget,insights{date_start,date_stop}`,
          cookies["access-token"]
        );
        setData(data);

        setAdsetData(data?.insights?.data);
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

  const dataChart = getChartData(adsetData);
  const dataChartLine = getChartDataLine(adsetData);
  const dataBarChart = getBarChartData(adsetData);

  return (
    <>
      <>
        <div className="flex flex-col items-center h-[calc(100vh)-] overflow-auto no-scrollbar mx-auto py-2 gap-2 w-full px-4 space-y-2 text-black dark:text-white">
          {data && (
            <div className="relative w-full py-4 px-2 md:px-8 space-y-2 h-min bg-white dark:bg-darkSecondary rounded-md shadow-md">
              <div className=" flex justify-center items-center absolute top-5 right-5">
                <div
                  className={`px-2 py-1 rounded-full text-center  ${
                    data.status.toLowerCase() === "active"
                      ? "bg-green-400"
                      : "bg-red-400"
                  }`}
                >
                  {data.status}
                </div>
              </div>
              <div className="flex flex-col lg:flex-row pt-8 justify-between ">
                <div className="flex flex-row w-full justify-between space-x-4">
                  <div className="uppercase font-semibold text-xl">
                    {" "}
                    {data.name}
                  </div>
                  {data?.daily_budget && (
                    <div>
                      <span className="capitalize px-2">daily budget</span>
                      <span className=" text-lg font-semibold">
                        {data?.daily_budget}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-row  space-x-6">
                <div>Targeting</div>
                <div className="space-x-2 text-lg">
                  [
                  <span className="font-medium  px-1">
                    {data.targeting.age_min}
                  </span>
                  <span className="font-medium px-1">
                    {data.targeting.age_max}
                  </span>
                  ]
                </div>
              </div>
              <div>{data.geo_locations?.regions[0].name}</div>
              {data.geo_locations?.regions.name && (
                <div className="flex flex-row  space-x-6">
                  <div>Regions</div>
                  <div className="space-x-2">
                    <span className="font-medium text-lg px-1">
                      {data.targeting.name}
                    </span>
                    <span className="font-medium text-lg px-1">
                      {data.targeting.country}
                    </span>
                  </div>
                </div>
              )}
              <div className="flex flex-row space-x-6">
                <div>Created Time</div>
                <div className="font-semibold">
                  {" "}
                  {formatDate(data.created_time)}
                </div>
              </div>
              <div className="flex flex-row space-x-6">
                <div>Updated Time</div>
                <div className="font-semibold">
                  {" "}
                  {formatDate(data.updated_time)}
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

export default AdSetsItemPage;
