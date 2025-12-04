import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

interface Deposit {
  id: number;
  amount: number;
  createdAt: string;
}

interface Props {
  depositData: Deposit[];
}

const DepositLineChartMonths: React.FC<Props> = ({ totalDeposit }) => {
  const monthLabels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthAmounts = Array(12).fill(0);

  totalDeposit.forEach((item) => {
    const date = new Date(item.createdAt);
    const monthIndex = date.getMonth();
    monthAmounts[monthIndex] += item.amount;
  });

  const data = {
    labels: monthLabels,
    datasets: [
      {
        label: "Deposit Amount",
        data: monthAmounts,
        borderColor: "#003960",
        backgroundColor: "#003960",
        tension: 0.4,
        fill: false,
        pointRadius: 5,
        borderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: "#64748B" },
      },
      x: {
        ticks: { color: "#64748B" },
      },
    },
  };

  return (
    <div className="w-full h-[320px] bg-white rounded-2xl p-5 shadow-md">
      <h2 className="text-xl font-semibold mb-3 text-[#676767]">
        Monthly Deposits
      </h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default DepositLineChartMonths;
