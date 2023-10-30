import { styles } from "@/utils/styles";
import { useAuth } from "@clerk/nextjs";
import {
  Button,
  Input,
  Select,
  SelectItem,
  Selection,
  Textarea,
} from "@nextui-org/react";
import { IoDocumentAttachOutline } from "react-icons/io5";
import Image from "next/image";
import React, { ChangeEvent, DragEvent, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

type Props = {};

type PromptData = {
  name: string;
  shortDescription: string;
  description: string;
  images: string[];
  attachments: string[];
  estimatedPrice: string;
  price: string;
  tags: string;
};

const categorieItem = [
  {
    title: "Chatgpt",
  },
  {
    title: "Midjourney",
  },
  {
    title: "Bard",
  },
  {
    title: "Dalle",
  },
];

const UploadPrompt = (props: Props) => {
  const [promptData, setPromptData] = useState<PromptData>({
    name: "",
    shortDescription: "",
    description: "",
    images: [],
    attachments: [],
    estimatedPrice: "",
    price: "",
    tags: "",
  });
  const [dragging, setDragging] = useState<Boolean>(false);
  const { userId } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState<Selection>(new Set([]));

  const handleImageFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setPromptData((prevData) => ({
              ...prevData,
              images: [...prevData.images, reader.result as string],
            }));
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleAttachmentFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setPromptData((prevData) => ({
              ...prevData,
              attachments: [...prevData.attachments, reader.result as string],
            }));
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleImageDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);

    if (e.dataTransfer.files) {
      const files = Array.from(e.dataTransfer.files);

      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setPromptData((prevData) => ({
              ...prevData,
              images: [...prevData.images, reader.result as string],
            }));
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleAttachmentDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files) {
      const files = Array.from(e.dataTransfer.files);

      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setPromptData((prevData) => ({
              ...prevData,
              attachments: [...prevData.attachments, reader.result as string],
            }));
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const categoryString = Array.from(category).join(",");
    await axios
      .post("/api/upload-prompt", {
        ...promptData,
        category: categoryString,
        sellerId: userId,
      })
      .then((res) => {
        setIsLoading(false);
        toast.success("Prompt uploaded successfully");
        setPromptData({
          name: "",
          shortDescription: "",
          description: "",
          images: [],
          attachments: [],
          estimatedPrice: "",
          price: "",
          tags: "",
        });
        redirect("/shop/prompts");
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        // toast.error(error.data.message);
      });
  };

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(new Set([e.target.value]));
  };

  return (
    <div>
      <h1 className={`${styles.heading} text-center py-5`}>
        Upload Your Prompt
      </h1>
      <br />
      <form className="w-[90%] m-auto" onSubmit={handleSubmit}>
        <Input
          type="text"
          label="Title"
          value={promptData.name}
          onChange={(e) =>
            setPromptData({ ...promptData, name: e.target.value })
          }
          variant="bordered"
          required
          placeholder="Enter your prompt title"
        />
        <br />
        <Input
          type="text"
          label="Short Description"
          value={promptData.shortDescription}
          onChange={(e) =>
            setPromptData({ ...promptData, shortDescription: e.target.value })
          }
          variant="bordered"
          required
          placeholder="Enter a short Description for your prompt *"
        />
        <br />
        <Textarea
          variant={"bordered"}
          value={promptData.description}
          onChange={(e) =>
            setPromptData((prevData) => ({
              ...prevData,
              description: e.target.value,
            }))
          }
          required
          size="lg"
          placeholder="Write one detailed description for your prompt *"
        />
        <br />
        <div className="md:flex md:w-full">
          <Input
            type="number"
            label="Propmt estimated price"
            variant="bordered"
            value={promptData.estimatedPrice}
            onChange={(e) =>
              setPromptData((prevData) => ({
                ...prevData,
                estimatedPrice: e.target.value,
              }))
            }
            placeholder="US$40"
            required
            className="mb-6 md:mb-0"
          />
          <Input
            type="number"
            label="Propmt price *"
            value={promptData.price}
            onChange={(e) =>
              setPromptData((prevData) => ({
                ...prevData,
                price: e.target.value,
              }))
            }
            variant="bordered"
            placeholder="US$29.99"
            className="md:ml-10"
            required
          />
        </div>
        <br />
        <div className="md:flex md:w-full">
          <Select
            label="Choose one category"
            variant="bordered"
            placeholder="Select one category"
            selectedKeys={category}
            className="max-w-full mb-5 md:mb-[0]"
            onChange={handleSelectionChange}
          >
            {categorieItem.map((item) => (
              <SelectItem
                key={item.title}
                value={item.title}
                className="text-black"
              >
                {item.title}
              </SelectItem>
            ))}
          </Select>
          <Input
            type="text"
            label="Propmt tags *"
            value={promptData.tags}
            onChange={(e) =>
              setPromptData((prevData) => ({
                ...prevData,
                tags: e.target.value,
              }))
            }
            required
            variant="bordered"
            placeholder="AI,Photo,Arts"
            className="md:ml-10"
          />
        </div>
        <br />
        <div className="w-full">
          <input
            type="file"
            required
            accept="image/*"
            multiple
            id="file"
            className="hidden"
            onChange={handleImageFileChange}
          />
          <label
            htmlFor="file"
            className={`w-full rounded-md min-h-[15vh] border-white p-3 border  flex items-center justify-center ${
              dragging ? "bg-blue-500" : "bg-transparent"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleImageDrop}
          >
            {promptData.images.length !== 0 ? (
              <div className="w-full flex flex-wrap">
                {promptData.images.map((item) => (
                  <Image
                    src={item}
                    alt=""
                    width={500}
                    height={400}
                    key={item}
                    className="w-full md:w-[48%] object-cover md:m-2 my-2"
                  />
                ))}
              </div>
            ) : (
              <span className="text-white">
                Drag and drop your prompt images here or click to browse
              </span>
            )}
          </label>
        </div>
        <br />
        <br />
        <div className="w-full">
          <input
            type="file"
            required
            accept=".txt, .pdf"
            multiple
            id="attachment"
            className="hidden"
            onChange={handleAttachmentFileChange}
          />
          <label
            htmlFor="attachment"
            className={`w-full rounded-md min-h-[15vh] border-white p-3 border  flex items-center justify-center ${
              dragging ? "bg-blue-500" : "bg-transparent"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleAttachmentDrop}
          >
            {promptData.attachments.length !== 0 ? (
              <div className="flex items-center">
                <IoDocumentAttachOutline className="text-3xl" />
                <span className={`${styles.label} pl-2 !text-2xl pt-1`}>
                  {promptData?.attachments?.length}{" "}
                  {promptData?.attachments?.length > 1 ? "files" : "file"}
                </span>
              </div>
            ) : (
              <span className="text-white">
                Drag and drop your prompt files here or click to browse
              </span>
            )}
          </label>
        </div>
        <br />
        <br />
        <div className="w-full flex items-center justify-center">
          <Button
            color="primary"
            className={`${styles.button}`}
            type="submit"
            disabled={isLoading}
            disableAnimation={isLoading}
          >
            Upload your prompt
          </Button>
        </div>
        <br />
        <br />
      </form>
    </div>
  );
};

export default UploadPrompt;
