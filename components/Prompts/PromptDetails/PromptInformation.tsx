"use client";
import { styles } from "@/utils/styles";
import { Avatar, Divider, Tab, Tabs } from "@nextui-org/react";
import React from "react";
import ReviewCard from "./ReviewCard";

type Props = {
  promptData: any;
};

let tabs = [
  {
    title: "Description",
  },
  {
    title: "Reviews",
  },
  {
    title: "Author",
  },
];

const PromptInformation = ({ promptData }: Props) => {
  return (
    <div>
      <div className="flex w-full flex-col bg-slate-900 p-3 rounded-md">
        <Tabs items={tabs} color="primary" variant="light">
          {(item) => (
            <Tab key={item.title} title={item.title} className="text-[18px]">
              <Divider className="bg-[#ffffff18]" />
              <div className="py-2">
                {item.title === "Description" && (
                  <p
                    className={`${styles.paragraph} whitespace-pre-line w-full overflow-hidden`}
                  >
                    {promptData.description}
                  </p>
                )}
                {item.title === "Author" && (
                  <>
                    <div className="flex w-full my-2">
                      <Avatar size="lg" src={promptData?.shop?.avatar} />
                      <div>
                        <span
                          className={`${styles.label} pl-3 !text-xl text-white`}
                        >
                          @{promptData?.shop?.name}
                        </span>
                        <br />
                        <span className={`${styles.label} pl-3`}>
                          Prompts: {promptData?.shop?.allProducts}
                        </span>
                        <br />
                        <span className={`${styles.label} pl-3`}>
                          Reviews: {promptData?.shop?.ratings} / 5
                        </span>
                      </div>
                    </div>
                  </>
                )}

                {item.title === "Reviews" && (
                  <div className="">
                    {promptData &&
                      promptData.reviews.map((item:any, index:number) => (
                        <ReviewCard item={item} key={index} />
                      ))}

                      {
                        promptData?.reviews?.length === 0 && (
                          <h5 className={`${styles.paragraph} text-center py-5`}>
                            No Reviews have to show!
                          </h5>
                        )
                      }
                  </div>
                )}
              </div>
            </Tab>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default PromptInformation;
