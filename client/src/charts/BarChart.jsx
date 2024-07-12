import { Bar } from "react-chartjs-2";
import "chart.js/auto"; // This is needed to automatically register the charts
import { useSelector } from "react-redux";

const BarChart = ({ chartData }) => {
  const darkMode = useSelector((state) => state.theme.darkMode);

  const options = {
    responsive: true,
    beginAtZero: true,
    plugins: {
      title: {
        display: true,
        text: "Actions Data",
        color: darkMode ? "#fff" : "#000", // Adjust title color
      },
      legend: {
        display: false,
        position: "top",
        labels: {
          color: darkMode ? "#fff" : "#000", // Adjust legend color
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          color: darkMode ? "#fff" : "#000", // Adjust y-axis title color
        },
        ticks: {
          color: darkMode ? "#fff" : "#000", // Adjust y-axis ticks color
        },
      },
      x: {
        title: {
          display: true,
          color: darkMode ? "#fff" : "#000", // Adjust x-axis title color
        },
        ticks: {
          color: darkMode ? "#fff" : "#000", // Adjust x-axis ticks color
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChart;
