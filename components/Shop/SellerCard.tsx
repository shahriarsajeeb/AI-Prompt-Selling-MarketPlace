import Ratings from "@/utils/Ratings";
import { styles } from "@/utils/styles";
import { Avatar, Card, Skeleton } from "@nextui-org/react";
import React from "react";

type Props = {
  item?: any;
  loading: boolean;
};

const SellerCard = ({ item, loading }: Props) => {
  return (
    <Card className="py-4 bg-[#100d21] m-3 w-full md:w-[31%] 2xl:w-[23%] flex flex-col items-center text-white border border-[#ffffff22]">
      {loading ? (
        <>
          <Skeleton className="w-[80px] h-[80px] rounded-full" />
          <br />
          <Skeleton className="w-[90%] rounded-xl h-[20px]" />
          <br />
          <Skeleton className="w-[90%] rounded-xl h-[20px]" />
        </>
      ) : (
        <>
          <Avatar src={item?.avatar} className="w-[80px] h-[80px]" />
          <span className={`${styles.label} py-2 text-xl`}>@{item?.name}</span>
          <div className="flex items-center">
            <span className={`${styles.label} pr-2`}>{item?.ratings}/5</span>
            <Ratings rating={item?.ratings} />
          </div>
          <span className={`${styles.label} py-2`}>
            Total Sales: {item?.allProducts}
          </span>
        </>
      )}
    </Card>
  );
};

export default SellerCard;
