"use client";
import { styles } from "@/utils/styles";
import { Button } from "@nextui-org/react";
import { useState } from "react";

const categories = ["All", "Chatgpt", "Midjourney", "Bard", "Dalle"];

type Props = {
  totalPrompts: any;
  setPrompts: (prompts: any) => void;
};

const FilterPrompt = ({ totalPrompts, setPrompts }: Props) => {
  const [selected, setSelected] = useState("All");

  const handleFilter = (e: any) => {
    setSelected(e);
    if (e === "All") {
      setPrompts(totalPrompts);
    } else {
      const data = totalPrompts?.filter((prompt: any) => prompt.category === e);
      setPrompts(data);
    }
  };

  return (
    <div className="w-full flex rounded shadow my-5">
      {categories.map((i, index) => (
        <Button
          className={`h-[32px] px-3 rounded-2xl mr-8 ${
            selected === i ? "bg-[#3ab05b]" : "bg-[#2251ac]"
          }`}
          key={index}
          onClick={(e) => handleFilter(i)}
        >
          <p className={`${styles.paragraph} text-white`}>{i}</p>
        </Button>
      ))}
      <br />
    </div>
  );
};

export default FilterPrompt;
