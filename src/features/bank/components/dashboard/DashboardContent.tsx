import PieChart from "@/features/bank/components/dashboard/BarChart";
import { motion } from "framer-motion";
import { useGetUsers } from "@/queries/user.query";
import { useGetAccount } from "@/queries/Account.query";
import { useGetOrganizations } from "@/queries/organization.query";
import { useGetDeposits } from "@/queries/depositTransition.query";
import DepositLineChart from "@/features/bank/components/dashboard/LineChart";

import { Building2Icon, User2, Users, ClipboardList } from "lucide-react";
type PaymentData = {
  name: string;
  amount: number;
  color: string;
};
const DashboardContent = () => {
  const { data: users } = useGetUsers({});
  const { data: accounts } = useGetAccount({});
  const { data: organizations } = useGetOrganizations({});
  const { data: deposits } = useGetDeposits({});
  const totalUser = users?.data?.users.length ?? 0;
  const totalAccount = accounts?.data?.users.length ?? 0;
  const totalOrganization = organizations?.data?.organizations.length ?? 0;
  const totalDeposit = deposits?.data ?? [];
  const totalAmount =
    totalDeposit.reduce((sum, item) => sum + item.amount, 0) ?? 0;
  const userList = users?.data?.users ?? [];
  const activeUsers = userList.filter((item) => item.status === 2).length;
  const pendingUsers = userList.filter((item) => item.status === 3).length;
  const inactiveUsers = userList.filter((item) => item.status === 1).length;

  const cards = [
    { title: "Total Users", value: totalUser, icon: <Users size="30" /> },
    {
      title: "Pending Users",
      value: pendingUsers,

      icon: <User2 size="30" />,
    },

    {
      title: "Total Accounts",
      value: totalAccount,

      icon: <User2 size="30" />,
    },

    {
      title: "Total Organizations",
      value: totalOrganization,
      icon: <Building2Icon size="30" />,
    },
    {
      title: "Total Deposit",
      value: <p>{totalAmount}MMK</p>,
      icon: <ClipboardList />,
    },
  ];

  const colors: Record<string, string> = {
    "Annual Salary": "#0A3D62",
    Payroll: "#36607E",
    "Merchant Payment": "#68889E",
  };

  // const paymentData = [
  //   {
  //     name: "Anual Salary",
  //     amount: 10000,
  //     color: "#0A3D62",
  //   },
  //   {
  //     name: "Payroll",
  //     amount: 500,
  //     color: "#36607E",
  //   },
  //   {
  //     name: "Merchant Payment",
  //     amount: 50,
  //     color: "#68889E",
  //   },
  // ];

  const grouped: Record<string, number> = totalDeposit.reduce((acc, item) => {
    if (!acc[item.transactionType]) acc[item.transactionType] = 0;
    acc[item.transactionType] += item.amount;
    return acc;
  }, {} as Record<string, number>);

  const paymentData: PaymentData[] = Object.entries(grouped)
    .filter(([_, amount]) => amount > 0)
    .map(([type, amount]) => {
      let formattedType = "";
      switch (type.toLowerCase()) {
        case "payroll":
          formattedType = "Payroll";
          break;
        case "annual salary":
          formattedType = "Annual Salary";
          break;
        case "merchant payment":
          formattedType = "Merchant Payment";
          break;
        default:
          formattedType = type;
      }
      return {
        name: formattedType,
        amount,
        color: colors[formattedType] ?? "#999999",
      };
    });

  return (
    <div className="p-3 w-full ">
      <div className=" mb-4">
        <h1 className="text-lg text-[#072B46] font-medium">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
        {cards.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-full h-[130px] rounded-2xl p-5 overflow-hidden shadow-lg bg-gradient-to-br from-[#0B486B] to-[#07293D] cursor-pointer transition-all"
          >
            <div className="relative z-10 text-white flex justify-center pt-3 items-center gap-3">
              <div className="text-3xl">{item.icon}</div>
              <div>
                <h2 className="text-2xl font-bold">{item.value}</h2>
                <p className="opacity-90 text-sm">{item.title}</p>
              </div>
            </div>

            <svg
              className="absolute bottom-0 left-0 w-full h-[70px]"
              viewBox="0 0 500 100"
              preserveAspectRatio="none"
            >
              <path
                d="M0,50 C150,100 350,0 500,50 L500,100 L0,100 Z"
                fill="rgba(255, 255, 255, 0.22)"
              />
            </svg>

            <svg
              className="absolute bottom-0 left-0 w-full h-[80px]"
              viewBox="0 0 500 100"
              preserveAspectRatio="none"
            >
              <path
                d="M0,60 C180,120 320,-20 500,60 L500,100 L0,100 Z"
                fill="rgba(255, 255, 255, 0.15)"
              />
            </svg>
          </motion.div>
        ))}
      </div>
      <div className="w-full h-full  grid grid-cols-1  lg:grid-cols-2  bg-[#f5f7f6] rounded-2xl">
        <div className="w-[88%] h-full p-5 ">
          <PieChart
            pendingUsers={pendingUsers}
            inactiveUsers={inactiveUsers}
            activeUsers={activeUsers}
          />
        </div>
        <div className="w-full flex flex-col gap-1 ">
          <div className="p-5 w-[100%] ">
            <DepositLineChart totalDeposit={totalDeposit} />
          </div>
          <div className=" p-5 w-[100%]">
            <div className="w-full h-full">
              <h2 className="font-semibold text-xl  text-[#676767]">Payment</h2>
              <p className="mb-4">
                Total Payment in this Year{" "}
                <span className="text-[#0A3D62] font-bold">
                  {totalAmount}MMK
                </span>
              </p>
              <div className="bg-white p-6 rounded-2xl shadow-2xl flex flex-col w-full  gap-2 ">
                {" "}
                {paymentData.map((item, index) => {
                  const percent = (item.amount / totalAmount) * 100;
                  return (
                    <div className="flex flex-col ">
                      <div key={index} className="flex flex-col gap-1">
                        <div className="w-full bg-gray-200 rounded-lg h-3 overflow-hidden">
                          <div
                            className="h-3 rounded-lg transition-all duration-500"
                            style={{
                              width: `${percent}%`,
                              backgroundColor: item.color,
                            }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-sm  top-0">
                          <span>{item.name}</span>
                          <span className="font-semibold text-[#0A3D62]">
                            {item.amount}/ {totalAmount}MMK
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
