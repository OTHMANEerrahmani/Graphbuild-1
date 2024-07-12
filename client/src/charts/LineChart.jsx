import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";

function LineChart({ chartData, title }) {
  const darkMode = useSelector((state) => state.theme.darkMode);

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: title,
        color: darkMode ? "#fff" : "#000", // Adjust title color
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        titleFont: { size: 16 },
        bodyFont: { size: 14 },
        bodySpacing: 6,
        padding: 10,
        cornerRadius: 4,
      },
      legend: {
        display: true,
        position: "top",
        labels: {
          color: darkMode ? "#fff" : "#000", // Adjust legend color
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: darkMode ? "#fff" : "#000", // Adjust x-axis ticks color
        },
      },
      y: {
        ticks: {
          color: darkMode ? "#fff" : "#000", // Adjust y-axis ticks color
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
}

export default LineChart;
