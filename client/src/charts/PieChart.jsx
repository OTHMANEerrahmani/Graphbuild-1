import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";

function PieChart({ chartData, title }) {
  const darkMode = useSelector((state) => state.theme.darkMode);

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: title,
        color: darkMode ? "#fff" : "#000", // Adjust title color
      },
      legend: {
        display: true,
        position: "top",
        labels: {
          color: darkMode ? "#fff" : "#000", // Adjust legend labels color
        },
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return <Pie data={chartData} options={options} />;
}

export default PieChart;
