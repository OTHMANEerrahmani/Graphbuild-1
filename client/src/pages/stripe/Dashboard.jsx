import { useEffect, useState } from "react";
import moment from "moment";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { Progress } from "./progress";
import { formatPrice, isStillSubscribe } from "../../utils/formatPrice";
import { getAllSubscribesUser } from "../../api/UserRequests";
import { formatDate } from "../../utils/dateFormatter";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/Cards/card";

const Dashboard = () => {
  const WEEKLY_GOAL = 500;
  const MONTHLY_GOAL = 2500;

  const [data, setData] = useState([]);
  const [lastWeekSum, setLastWeekSum] = useState(0);
  const [lastMonthSum, setLastMonthSum] = useState(0);

  useEffect(() => {
    const getAllSubscribesUserData = async () => {
      try {
        const data = await getAllSubscribesUser();
        setData(data);

        const now = moment();
        const lastWeek = now.clone().subtract(1, "weeks").startOf("isoWeek");
        const lastMonth = now.clone().subtract(1, "months").startOf("month");
        const lastDay = now.clone().subtract(1, "days").startOf("day");
        const filteredLastDay = data.filter((user) =>
          moment(user.subscription.planStartDate).isBetween(lastDay, now)
        );

        const filteredLastWeek = data.filter((user) =>
          moment(user.subscription.planStartDate).isBetween(lastWeek, now)
        );
        const filteredLastMonth = data.filter((user) =>
          moment(user.subscription.planStartDate).isBetween(lastMonth, now)
        );

        const sum = filteredLastWeek.reduce((acc, user) => {
          switch (user.subscription.planType) {
            case "Pro":
              return acc + 5;
            case "Standard":
              return acc + 10;
            case "Business":
              return acc + 99;
            default:
              return acc;
          }
        }, 0);

        setLastWeekSum(sum);

        const sumMonth = filteredLastMonth.reduce((acc, user) => {
          switch (user.subscription.planType) {
            case "Pro":
              return acc + 5;
            case "Standard":
              return acc + 10;
            case "Business":
              return acc + 99;
            default:
              return acc;
          }
        }, 0);

        setLastMonthSum(sumMonth);
      } catch (error) {
        console.error(error);
      }
    };

    getAllSubscribesUserData();
  }, []);

  return (
    <div className="flex w-full bg-muted/40 p-4 dark:text-white">
      <div className="max-w-7xl w-full mx-auto flex flex-col sm:gap-4 sm:py-4">
        <div className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Last Week</CardDescription>
                <CardTitle className="text-4xl">
                  {formatPrice(lastWeekSum ?? 0)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  of {formatPrice(WEEKLY_GOAL)} goal
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={((lastWeekSum ?? 0) * 100) / WEEKLY_GOAL} />
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Last Month</CardDescription>
                <CardTitle className="text-4xl">
                  {formatPrice(lastMonthSum ?? 0)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  of {formatPrice(MONTHLY_GOAL)} goal
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={((lastMonthSum ?? 10) * 100) / MONTHLY_GOAL} />
              </CardFooter>
            </Card>
          </div>

          <h1 className="text-4xl font-bold tracking-tight">
            Previous payments
          </h1>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="hidden sm:table-cell">
                  Purchase date
                </TableHead>
                <TableHead className="hidden sm:table-cell">Plan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((order) => (
                <TableRow key={order.id} className="bg-accent">
                  <TableCell>
                    <div className="font-medium">{order.name}</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      {order.email}
                    </div>
                  </TableCell>

                  <TableCell className="hidden md:table-cell">
                    <div
                      className={` ${
                        isStillSubscribe(order.subscription?.planEndDate)
                          ? "text-green-500"
                          : "text-red-500"
                      } font-semibold`}
                    >
                      {isStillSubscribe(order.subscription?.planEndDate)
                        ? "Active"
                        : "Non Active"}
                    </div>
                  </TableCell>

                  <TableCell className="hidden md:table-cell">
                    {formatDate(order.createdAt)}
                  </TableCell>

                  <TableCell className="hidden sm:table-cell font-bold text-lg">
                    {order.subscription?.planType}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
