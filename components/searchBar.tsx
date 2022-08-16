import Image from "next/image";
import React, { useState } from "react";
// import { SearchIcon } from "@heroicons/react/solid";
import type {
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegisterReturn,
} from "react-hook-form";
import type { SearchForm } from "../pages/search";

interface InputProps {
  register: UseFormRegisterReturn;
  handleSubmit: UseFormHandleSubmit<SearchForm>;
  onValid: SubmitHandler<SearchForm>;
}

const SearchBar: React.FC<InputProps> = ({
  register,
  handleSubmit,
  onValid,
}) => {
  const [text, setText] = useState("");

  return (
    <>
      <div className="mt-4">
        <form
          onSubmit={handleSubmit(onValid)}
          className="relative flex flex-row items-center"
        >
          <input
            type="text"
            className="text-md focus:border-1 ml-6 mr-6 w-full rounded-full bg-gray-100 py-4 pl-16 text-gray-800 outline-none focus:border-orange-400 focus:ring-0"
            placeholder="키워드로 검색해 보세요."
            {...register}
          />
          <button
            type="submit"
            className="absolute left-10 aspect-square w-8 "
          >
            <Image
              src={`/lenz.png`}
              alt="lenz preview"
              layout="fill"
            />
          </button>
        </form>
      </div>
    </>
  );
};

export default SearchBar;
