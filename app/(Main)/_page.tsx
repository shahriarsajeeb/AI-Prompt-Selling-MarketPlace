"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/Layout/Header";
import Hero from "@/components/Route/Hero";
import About from "@/components/Route/About";
import Image from "next/image";
import { styles } from "@/utils/styles";
import PromptCard from "@/components/Prompts/PromptCard";
import BestSellers from "@/components/Shop/BestSellers";
import Future from "@/components/Route/Future";
import Partners from "@/components/Route/Partners";
import SellersBanner from "@/components/Shop/SellersBanner";
import Footer from "@/components/Layout/Footer";
import { Divider } from "@nextui-org/react";
import { User } from "@clerk/nextjs/server";
import PromptCardLoader from "@/utils/PromptCardLoader";

type Props = {
  user: User | undefined;
  isSellerExist: boolean | undefined;
};

const RoutePage = ({ user, isSellerExist }: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  const [prompts, setPrompts] = useState<any>();
  const [loading, setLoading] = useState(true);

  const fetchPromptsData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/get-prompts`);
      const data = await response.json();
      setPrompts(data.prompts);
    } catch (error) {
      console.error("Failed to fetch prompts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromptsData();
  }, []);

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    }
  }, [isMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <div>
        <div className="banner">
          <Header activeItem={0} user={user} isSellerExist={isSellerExist} />
          <Hero />
        </div>
        <Image
          src={"https://pixner.net/aikeu/assets/images/footer/shape-two.png"}
          width={120}
          height={120}
          alt=""
          className="absolute right-[-30px]"
        />
        <br />
        <div className="w-[95%] md:w-[90%] xl:w-[80%] 2xl:w-[75%] m-auto">
          <About />
          <div>
            <h1 className={`${styles.heading} p-2 font-Monserrat`}>
              Latest Prompts
            </h1>
            <div className="w-full flex flex-wrap mt-5">
              {loading ? (
                [...new Array(8)].map((i) => (
                  <>
                    <PromptCardLoader />
                  </>
                ))
              ) : (
                <>
                  {prompts &&
                    prompts.map((item: any) => (
                      <PromptCard prompt={item} key={item.id} />
                    ))}
                </>
              )}
            </div>
            <br />
            <BestSellers />
            <Future />
            <Partners />
            <SellersBanner />
            <br />
            <br />
            <Divider className="bg-[#ffffff23]" />
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default RoutePage;
