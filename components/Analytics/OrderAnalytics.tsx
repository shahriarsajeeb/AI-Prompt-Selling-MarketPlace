"use client";
import { generateLast12MonthsOrderData } from "@/actions/analytics/getOrdersAnalytics";
import { styles } from "@/utils/styles";
import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  isDashboard?: boolean;
};

const OrderAnalytics = ({ isDashboard }: Props) => {
  const [data, setData] = useState<any>();

  useEffect(() => {
    generateLast12MonthsOrderData()
      .then((res) => {
        setData(res.last12Months);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  data?.last12Months?.forEach((item: any) => {
    data?.last12Months?.push({ month: item.month, count: item.count });
  });

  return (
    <>
      <div
        className={`${
          !isDashboard
            ? "mt-[50px]"
            : "mt-[50px] bg-[#111C43] shadow-sm pb-5 rounded-sm"
        }`}
      >
        <div className={`${isDashboard ? "!ml-8 mb-5" : ""}`}>
          <h1
            className={`${styles.label} ${
              isDashboard && "!text-[20px]"
            } px-5 !text-start`}
          >
            Orders Analytics
          </h1>
          {!isDashboard && (
            <p className={`${styles.label} px-5`}>
              Last 12 months analytics data{" "}
            </p>
          )}
        </div>

        <div
          className={`w-full ${
            isDashboard ? "h-[30vh]" : "h-screen"
          } flex items-center justify-center`}
        >
           {data ? (
            <>
              <ResponsiveContainer
                width={isDashboard ? "100%" : "90%"}
                height={!isDashboard ? "50%" : "100%"}
              >
                <AreaChart
                  data={data}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#4d62d9"
                    fill="#4d62d9"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </>
          ) : (
            <div>Loading....</div>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderAnalytics;
