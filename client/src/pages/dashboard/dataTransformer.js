import { formatDate } from "../../utils/dateFormatter";

const transformData = (adAccountData, chartType) => {
  if (!adAccountData || !Array.isArray(adAccountData)) {
    return [];
  }

  switch (chartType) {
    case "chart":
      const totalImpressions = adAccountData.reduce(
        (acc, curr) => acc + parseInt(curr.impressions, 10),
        0
      );
      const totalClicks = adAccountData.reduce(
        (acc, curr) => acc + parseInt(curr.clicks, 10),
        0
      );
      const totalSpend = adAccountData.reduce(
        (acc, curr) => acc + parseFloat(curr.spend),
        0
      );

      return [
        { label: "Impressions", value: totalImpressions },
        { label: "Clicks", value: totalClicks },
      ];

    case "line":
      const cpc = adAccountData.reduce(
        (acc, curr) => acc + parseInt(curr.cpc, 10),
        0
      );
      const cpm = adAccountData.reduce(
        (acc, curr) => acc + parseInt(curr.cpm, 10),
        0
      );
      const ctr = adAccountData.reduce(
        (acc, curr) => acc + parseFloat(curr.ctr),
        0
      );

      return [
        { label: "cpc", value: cpc },
        { label: "cpm", value: cpm },
        { label: "ctr", value: ctr },
      ];

    case "bar":
      const essentialActions = [
        "purchase",
        "comment",
        "landing_page_view",
        "view_content",
        "like",
        "add_to_cart",
      ];

      const actions = adAccountData.flatMap((item) => item.actions);
      const filteredActions = actions.filter((action) =>
        essentialActions.includes(action?.action_type)
      );

      const actionCounts = filteredActions.reduce((acc, action) => {
        const existing = acc.find((a) => a.label === action?.action_type);
        if (existing) {
          existing.value += parseInt(action.value, 10);
        } else {
          acc.push({
            label: action.action_type,
            value: parseInt(action.value, 10),
          });
        }
        return acc;
      }, []);

      return actionCounts;

    default:
      return [];
  }
};

const transformDataCard = (adAccountData) => {
  if (!adAccountData || !Array.isArray(adAccountData)) {
    return [];
  }

  const totalImpressions = adAccountData.reduce(
    (acc, curr) => acc + parseInt(curr.impressions, 10),
    0
  );
  const totalClicks = adAccountData.reduce(
    (acc, curr) => acc + parseInt(curr.clicks, 10),
    0
  );
  const totalSpend = adAccountData.reduce(
    (acc, curr) => acc + parseFloat(curr.spend),
    0
  );
  const totalReach = adAccountData.reduce(
    (acc, curr) => acc + parseFloat(curr.reach),
    0
  );

  const cpc = adAccountData.reduce(
    (acc, curr) => acc + parseInt(curr.cpc, 10),
    0
  );
  const cpm = adAccountData.reduce(
    (acc, curr) => acc + parseInt(curr.cpm, 10),
    0
  );
  const ctr = adAccountData.reduce(
    (acc, curr) => acc + parseFloat(curr.ctr),
    0
  );

  const essentialActions = [
    "purchase",
    // "comment",
    // "landing_page_view",
    // "view_content",
    // "like",
    // "add_to_cart",
  ];

  const actions = adAccountData.flatMap((item) => item.actions);
  const filteredActions = actions.filter((action) =>
    essentialActions.includes(action?.action_type)
  );

  const actionCounts = filteredActions.reduce((acc, action) => {
    const existing = acc.find((a) => a.label === action?.action_type);
    if (existing) {
      existing.value += parseInt(action.value, 10);
    } else {
      acc.push({
        label: action.action_type,
        value: parseInt(action.value, 10),
      });
    }
    return acc;
  }, []);

  return [
    { label: "CPC", value: cpc },
    { label: "CPM", value: cpm },
    { label: "CTR", value: ctr.toFixed(3) },
    { label: "Impressions", value: totalImpressions },
    { label: "Reach", value: totalReach },
    { label: "Clicks", value: totalClicks },
    { label: "Spend", value: totalSpend.toFixed(2) },
    ...actionCounts,
  ];
};

const createChartData = (data, chartLabel) => ({
  labels: data.map((item) => item.label.replaceAll("_", " ")),
  datasets: [
    {
      label: chartLabel,
      data: data.map((item) => item.value),
      backgroundColor: [
        "rgba(75, 192, 192, 0.5)",
        "rgba(54, 162, 235, 0.5)",
        "rgba(255, 206, 86, 0.5)",
      ],
      borderColor: [
        "rgba(75, 192, 192, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
      ],
      borderWidth: 1,
    },
  ],
});

const createChartDataThree = (adAccountData, chartLabel) => {
  const data = adAccountData.map((entry) => ({
    label: entry.date_start,
    cpc: parseFloat(entry.cpc || 0),
    cpm: parseFloat(entry.cpm || 0),
    ctr: parseFloat(entry.ctr || 0),
  }));

  return {
    labels: data.map((item) => item.label),
    datasets: [
      {
        label: "CPC",
        data: data.map((item) => item.cpc),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "CPM",
        data: data.map((item) => item.cpm),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "CTR",
        data: data.map((item) => item.ctr),
        backgroundColor: "rgba(255, 206, 86, 0.5)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 1,
      },
    ],
  };
};

const createChartDataSecond = (adAccountData) => {
  const data = adAccountData.map((entry) => ({
    label: entry.date_start,
    impressions: parseFloat(entry.impressions || 0),
    clicks: parseFloat(entry.clicks || 0),
  }));

  return {
    labels: data.map((item) => item.label),
    datasets: [
      {
        label: "Impressions",
        data: data.map((item) => item.impressions),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },

      {
        label: "Clicks",
        data: data.map((item) => item.clicks),
        backgroundColor: "rgba(255, 206, 86, 0.5)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 1,
      },
    ],
  };
};

const transformDataSpend = (adAccountData, chartLabel) => {
  const data = adAccountData.map((entry) => ({
    label: entry.date_start,
    spend: parseFloat(entry.spend || 0),
  }));

  return {
    labels: data.map((item) => item.label),
    datasets: [
      {
        label: "Spend",
        data: data.map((item) => item.spend),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };
};
const getChartData = (adAccountData) =>
  createChartData(transformData(adAccountData, "chart"), "Total");
const getChartDataLine = (adAccountData) =>
  createChartData(transformData(adAccountData, "line"), "Total");
const getBarChartData = (adAccountData) =>
  createChartData(transformData(adAccountData, "bar"), "Total");

const getChartDataLineThree = (adAccountData) =>
  createChartDataThree(adAccountData, "Total");
const getChartDataLineSecond = (adAccountData) =>
  createChartDataSecond(adAccountData, "Total");
export {
  getChartData,
  getChartDataLine,
  getBarChartData,
  getChartDataLineThree,
  transformDataCard,
  transformDataSpend,
  getChartDataLineSecond,
};
