import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  type ChartOptions,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface UserPieChartProps {
  pendingUsers: number;
  inactiveUsers: number;
  activeUsers: number;
}

const UserPieChart: React.FC<UserPieChartProps> = ({
  pendingUsers,
  inactiveUsers,
  activeUsers,
}) => {
  const data = {
    labels: ["Active Users", "Inactive Users", "Pending Users"],
    datasets: [
      {
        label: "Users Status",
        data: [activeUsers, inactiveUsers, pendingUsers],
        backgroundColor: ["#0A3D62", "#68889E", "#2E5167"],
      },
    ],
  };

  const options: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "User Activity Overview",
        font: {
          size: 18,
        },
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default UserPieChart;
