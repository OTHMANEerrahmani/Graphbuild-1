import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { fetchData } from "../../services/api";
import { useParams } from "react-router-dom";
import { getStatusBadge } from "../../utils/getStatusBadge";
import { formatDate } from "../../utils/dateFormatter";
import Chart from "./components/ChartSection";
import DisclosureWidget from "./components/Disclosure";

function AdAccountPage() {
  const [cookies] = useCookies(["access-token"]);
  const [data, setData] = useState([]);
  const [predetions, setPredetions] = useState([]);
  const [error, setError] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const fetchAdAccountDetails = async () => {
      try {
        const adAccountUrl = `${id}?fields=business_name,name,balance,account_status,currency,account_id,created_time,amount_spent,business,business_country_code,min_daily_budget,max_bid{max_bid},insights{date_start,date_stop}`;

        const adAccountData = await fetchData(
          adAccountUrl,
          cookies["access-token"]
        );
        setData(adAccountData);
      } catch (error) {}
    };

    const fetchPredections = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_SERVER}/predict`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              accessToken: cookies["access-token"],
              adAccountId: id.replace(/\D/g, ""),
            }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.msg);
          throw new Error("Failed to log in");
        }

        const predetions = await response.json();
        console.log(predetions);
        setPredetions(predetions?.Predictions);
        setError("");
      } catch (error) {
        setError(error);
      }
    };

    fetchAdAccountDetails();
    fetchPredections();
  }, [id]);

  return (
    <>
      <>
        <div className="flex flex-col items-center h-[calc(100vh)-] overflow-auto no-scrollbar mx-auto py-2 gap-2 w-full px-4 space-y-2 text-black dark:text-white ">
          {data && (
            <div className="relative w-full py-4 md:px-8 space-y-2 bg-white dark:bg-darkSecondary rounded-md shadow-md">
              <div>{getStatusBadge(data.account_status)}</div>
              <div className="flex flex-col lg:flex-row pt-8 justify-between ">
                <div className="flex flex-row justify-between space-x-4">
                  <span className=" font-bold text-xl">
                    {data.business?.name}({data.name})
                  </span>{" "}
                </div>

                <div className="flex flex-row justify-between space-x-4">
                  <div>
                    Balance
                    <span className="px-4 font-medium">
                      {" "}
                      {data.balance} {data.currency}
                    </span>
                  </div>
                  <div>
                    Amount Spent:
                    <span className="px-4 font-medium">
                      {data.amount_spent} {data.currency}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-row space-x-6">
                <div>Created Time</div>
                <div className="font-semibold">
                  {" "}
                  {formatDate(data.created_time)}
                </div>
              </div>
            </div>
          )}
          <DisclosureWidget data={predetions} error={error} />
          <Chart data={data} />
        </div>
      </>
    </>
  );
}

export default AdAccountPage;
