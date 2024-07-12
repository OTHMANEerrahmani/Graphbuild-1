import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { fetchData } from "../../../services/api";
import { useParams } from "react-router-dom";
import { BarChart, LineChart, PieChart } from "../../../charts";
import {
  getBarChartData,
  getChartData,
  getChartDataLine,
  getChartDataLineSecond,
  getChartDataLineThree,
  transformDataCard,
  transformDataSpend,
} from "../dataTransformer";
import { DropDown } from "../../../components";
import DateTimeSlider from "./DateTimeSlider";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/Cards/card";

function Chart({ data }) {
  const [cookies] = useCookies(["access-token"]);
  const [dropDownText, setDropDownText] = useState("Daily");
  const [timeIncrement, setTimeIncrement] = useState("1");

  const { id } = useParams();

  const [dateRangeSince, setDateRangeSince] = useState(null);
  const [dateRangeUntil, setDateRangeUntil] = useState(null);
  const [adAccountData, setAdAccountData] = useState([]);
  const [adAccountDataG, setAdAccountDataG] = useState([]);

  useEffect(() => {
    if (data?.insights?.data) {
      setDateRangeSince(data.insights.data[0].date_start);
      setDateRangeUntil(data.insights.data[0].date_stop);
    }
  }, [data]);

  useEffect(() => {
    const fetchAdInsights = async () => {
      try {
        const dateRange = {
          since: dateRangeSince,
          until: dateRangeUntil,
        };

        const insightsUrl = `${id}/insights?fields=impressions,clicks,reach,spend,ctr,cpc,cpm,actions&time_range=${encodeURIComponent(
          JSON.stringify(dateRange)
        )}&time_increment=${timeIncrement}`;

        const insightsData = await fetchData(
          insightsUrl,
          cookies["access-token"]
        );
        setAdAccountData(insightsData?.data);
      } catch (error) {}
    };

    fetchAdInsights();
  }, [id, timeIncrement, data, dateRangeSince, dateRangeUntil]);

  useEffect(() => {
    const fetchAdInsights = async () => {
      try {
        const dateRange = {
          since: dateRangeSince,
          until: dateRangeUntil,
        };

        const insightsUrl = `${id}/insights?fields=impressions,clicks,reach,spend,ctr,cpc,cpm,actions&time_range=${encodeURIComponent(
          JSON.stringify(dateRange)
        )}&time_increment=${timeIncrement}`;

        const insightsData = await fetchData(
          insightsUrl,
          cookies["access-token"]
        );
        setAdAccountDataG(insightsData?.data);
      } catch (error) {}
    };

    fetchAdInsights();
  }, [id, data]);
  const dataChart = getChartData(adAccountData);
  const dataChartX = getChartDataLineSecond(adAccountData);
  const dataChartLine = getChartDataLineThree(adAccountData);
  const dataChartLineX = getChartDataLine(adAccountData);
  const dataBarChart = getBarChartData(adAccountData);
  const dataCard = transformDataCard(adAccountData);
  const dataCardOrg = transformDataCard(adAccountDataG);
  const dataSpend = transformDataSpend(adAccountData);

  return (
    <>
      <div className="w-full flex flex-row space-x-2 justify-between items-center">
        <div className=" w-44">
          <DropDown
            className={"w-20"}
            default={dropDownText}
            options={[
              {
                name: "All days",
                action: () => {
                  setTimeIncrement("all_days");
                  setDropDownText("All days");
                },
              },
              {
                name: "Monthly",
                action: () => {
                  setTimeIncrement("monthly");
                  setDropDownText("Monthly");
                },
              },
              {
                name: "Daily",
                action: () => {
                  setTimeIncrement("1");
                  setDropDownText("Daily");
                },
              },
            ]}
          />
        </div>

        <DateTimeSlider
          data={data}
          setDateRangeUntil={setDateRangeUntil}
          setDateRangeSince={setDateRangeSince}
          dateRangeUntil={dateRangeUntil}
          dateRangeSince={dateRangeSince}
        />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4  gap-2">
        {dataCard.map((item, index) => {
          return (
            <Card className="w-44" key={index}>
              <CardHeader className="pb-2">
                <CardDescription>{item.label}</CardDescription>
                <CardTitle className="text-4xl">{item.value} </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-md text-muted-foreground font-bold`}>
                  {dataCardOrg[index]?.value == 0
                    ? 0
                    : ((item.value / dataCardOrg[index]?.value) * 100).toFixed(
                        2
                      )}{" "}
                  %
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className=" flex flex-col items-center justify-center w-full font-medium text-2xl dark:text-white px-4 py-4">
        <div className="lg:w-1/2 w-full  md:h-2/4 flex flex-col lg:flex-row items-center justify-center ">
          <LineChart chartData={dataSpend} title={"Spend amount by Date"} />
          {timeIncrement == "1" ? (
            <LineChart
              chartData={dataChartX}
              title={"Clicks and Impressions over time"}
            />
          ) : (
            <PieChart
              chartData={dataChart}
              title={"Digital Advertising Campaign Overview"}
            />
          )}
        </div>
        <div className="lg:w-1/2 w-full  md:h-2/4 flex flex-col lg:flex-row items-center justify-center ">
          <BarChart chartData={dataBarChart} />

          {timeIncrement == "1" ? (
            <LineChart
              chartData={dataChartLine}
              title={"Digital Advertising Performance"}
            />
          ) : (
            <LineChart
              chartData={dataChartLineX}
              title={"Digital Advertising Performance"}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Chart;
