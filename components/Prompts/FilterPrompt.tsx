"use client";
import { styles } from "@/utils/styles";
import { Button } from "@nextui-org/react";
import { useState } from "react";

const categories = ["All", "Chatgpt", "Midjourney", "Bard", "Dalle"];

const FilterPrompt = () => {
  const [selected, setSelected] = useState("All");

  return (
    <div className="w-full flex rounded shadow my-5">
      {categories.map((i, index) => (
        <Button
          className={`h-[32px] px-3 rounded-2xl mr-8 ${
            selected === i ? "bg-[#3ab05b]" : "bg-[#2251ac]"
          }`}
          key={index}
          onClick={(e) => setSelected(i)}
        >
          <p className={`${styles.paragraph} text-white`}>{i}</p>
        </Button>
      ))}
      <br />
    </div>
  );
};

export default FilterPrompt;
