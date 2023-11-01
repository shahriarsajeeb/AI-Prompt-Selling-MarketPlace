"use client";
import Ratings from "@/utils/Ratings";
import { styles } from "@/utils/styles";
import { Button, Chip } from "@nextui-org/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { IoCloseOutline } from "react-icons/io5";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const PromptDetailsCard = ({
  promptData,
  clientSecret,
  stripePromise,
}: {
  promptData: any;
  clientSecret: string;
  stripePromise: any;
}) => {
  const [activeImage, setactiveImage] = useState(promptData?.images[0]?.url);
  const [open, setOpen] = useState(false);
  const tags = promptData?.tags;

  const tagsList = tags.split(",").map((tag: string) => tag.trim());


  const percentageDifference = ((promptData?.estimatedPrice - promptData?.price) / promptData?.estimatedPrice) * 100;

  const promptDiscount = percentageDifference?.toFixed(0);
  

  return (
    <div className="bg-[#1211023] p-3 w-full min-h-[50vh] shadow rounded-xl mt-8">
      <div className="w-full flex flex-wrap">
        <div className="md:w-[48%] w-full m-2">
          <div>
            <Image
              src={activeImage}
              width={500}
              height={500}
              className="rounded-xl w-full object-contain"
              alt=""
            />
          </div>
          <br />
          <div className="w-full flex">
            <Marquee>
              {promptData.images.map((image: any) => (
                <Image
                  src={image.url}
                  key={image.url}
                  onClick={() => setactiveImage(image.url)}
                  width={250}
                  height={250}
                  alt=""
                  className="m-2 cursor-pointer rounded-md"
                />
              ))}
            </Marquee>
          </div>
        </div>
        <div className="md:w-[48%] w-full m-2 p-2">
          <h1 className={`${styles.label} !text-2xl font-Monserrat`}>
            {promptData?.name}
          </h1>
          <br />
          <Chip className="bg-[#1f2d2b] rounded-md p-3 h-[35px]">
            <span
              className={`${styles.label} !text-2xl !text-[#64ff4b] font-Monserrat`}
            >
              {promptDiscount}%
            </span>
          </Chip>
          <span
            className={`${styles.label} !text-2xl pl-2 text-white font-Monserat`}
          >
            Off
          </span>
          <div className="w-full flex items-center my-2 justify-between">
            <div>
              <span
                className={`${styles.label} inline-block pt-4 !text-xl line-through`}
              >
                ${promptData?.estimatedPrice}
              </span>
              <span
                className={`${styles.label} inline-block pt-4 !text-xl text-white pl-3`}
              >
                ${promptData?.price}
              </span>
            </div>
            <Ratings rating={promptData?.rating} />
          </div>
          <br />
          <p className={`${styles.paragraph}`}>
            {promptData?.shortDescription}
          </p>
          <br />
          <div className="w-full">
            <span
              className={`${styles.label} !text-2xl pl-2 text-white font-Monserrat`}
            >
              Tags
            </span>
            <br />
            <div className="w-full flex items-center flex-wrap my-2">
              {tagsList.map((tag: string) => (
                <Chip
                  className="bg-[#1e1c2f] rounded-full h-[35px] mr-2 my-2 2xl:mr-4 cursor-pointer"
                  key={tag}
                >
                  <span
                    className={`${styles.label} !text-xl text-white font-Monserrat`}
                  >
                    {tag}
                  </span>
                </Chip>
              ))}
            </div>
            <br />
            <Button
              onClick={() => setOpen(!open)}
              radius="full"
              className={`${styles.button} h-[45px] font-[400] bg-[#64ff4b] !text-indigo-900 md:ml-2`}
            >
              Buy now ${promptData?.price}
            </Button>
          </div>
        </div>
      </div>
      {open && (
        <div className="w-full h-screen bg-[#00000036] fixed top-0 left-0 z-50 flex items-center justify-center">
          <div className="w-[500px] min-h-[500px] bg-white rounded-xl shadow p-3">
            <div className="w-full flex justify-end">
              <IoCloseOutline
                size={40}
                className="text-black cursor-pointer"
                onClick={() => setOpen(!open)}
              />
            </div>
            <div className="w-full">
              {stripePromise && clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <CheckoutForm
                    setOpen={setOpen}
                    open={open}
                    promptData={promptData}
                  />
                </Elements>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromptDetailsCard;
