import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { fetchData } from "../../services/api";
import { useParams } from "react-router-dom";
import { formatDate } from "../../utils/dateFormatter";
import {
  getBarChartData,
  getChartData,
  getChartDataLine,
} from "./dataTransformer";
import { BarChart, LineChart, PieChart } from "../../charts";
import Chart from "./components/ChartSection";

function CampaingsItemPage() {
  const [cookies] = useCookies(["access-token"]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const [campaingData, setCampaingData] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const data = await fetchData(
          `${id}?fields=id,name,objective,effective_status,start_time,budget_remaining,spend_cap,created_time,status,updated_time,insights{date_start,date_stop}`,
          cookies["access-token"]
        );
        setData(data);
        setCampaingData(data?.insights?.data);

        // console.log(data);
        // console.log(data?.insights?.data);

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
      <div className="flex flex-col justify-center items-center w-full font-medium text-2xl dark:text-white">
        Error <span className="text-red-600">{error.message}</span>
      </div>
    );
  }

  const dataChart = getChartData(campaingData);
  const dataChartLine = getChartDataLine(campaingData);
  const dataBarChart = getBarChartData(campaingData);

  return (
    <>
      <>
        <div className="flex flex-col items-center h-[calc(100vh)-] overflow-auto no-scrollbar mx-auto py-2 gap-2 w-full px-4 space-y-2 text-black dark:text-white ">
          {data && (
            <div className="p-4 text-xs md:text-lg mx-1 relative  w-full h-min bg-white dark:bg-darkSecondary rounded-md shadow-md">
              <div
                className={`px-4 py-1 text-center rounded-xl absolute top-2 right-4   text-black ${
                  data.status.toLowerCase() === "active"
                    ? "bg-green-400"
                    : "bg-red-400"
                }`}
              >
                {data.status}
              </div>

              <div className="px-4 py-1 text-xl font-bold">{data.name}</div>

              <div className="pt-4 space-y-2 flex-col md:px-8">
                <div className="  flex flex-row justify-between w-full">
                  <div>objective</div>
                  <div className="font-semibold text-lg">
                    {data.objective.replaceAll("_", " ")}
                  </div>
                </div>
                <div className="  flex flex-row justify-between w-full">
                  <div>Created time</div>
                  <div className="font-semibold">
                    {formatDate(data.created_time)}
                  </div>
                </div>
                <div className="  flex flex-row justify-between w-full">
                  <div>Updated time</div>
                  <div className="font-semibold">
                    {" "}
                    {formatDate(data.updated_time)}
                  </div>
                </div>
                <div className="  flex flex-row justify-between w-full">
                  <div>Updated time</div>
                  <div className="font-semibold">
                    {formatDate(data.start_time)}
                  </div>
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

export default CampaingsItemPage;
