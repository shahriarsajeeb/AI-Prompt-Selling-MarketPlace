import Ratings from "@/utils/Ratings";
import { styles } from "@/utils/styles";
import { Avatar } from "@nextui-org/react";
import React from "react";
import { format } from "timeago.js";

const ReviewCard = ({ item }: { item: any }) => {
  return (
    <div className="flex my-2">
      <div>
        <Avatar
          size="lg"
          src="https://i.pravatar.cc/150?u=a04258114e29026302d"
        />
      </div>
      <div className="pl-3">
        <div className="flex items-center">
          <span className={`${styles.label} !text-xl text-white`}>Allen</span>
          <span className={`${styles.label} pl-3`}>
            {format(item?.createdAt)}
          </span>
          <Ratings rating={item?.rating} />
        </div>
        <p className={`${styles.paragraph} whitespace-pre-line`}>
          {item?.comment}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
