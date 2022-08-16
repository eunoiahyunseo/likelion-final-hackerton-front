import Layout from "@components/layout";
import SearchBar from "@components/searchBar";
import { cls } from "@libs/client/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const SearchBar_ = React.memo(SearchBar);

const menuType = ["태그", "계정"];

const MenuSelectComponent = ({
  selected,
  menu,
  ...rest
}: any) => {
  return (
    <div
      className={cls(
        `cursor-pointer text-lg font-bold`,
        selected
          ? "border-b-2 border-black text-black"
          : "text-gray-400"
      )}
      {...rest}
    >
      <span>{menu}</span>
    </div>
  );
};

interface ClubInfo {
  imgUrl?: string;
  title: string;
  subTitle?: string;
  official?: boolean;
  include: string;
}

const clubList: ClubInfo[] = [
  {
    imgUrl: "/grandchaps.jpeg",
    title: "그랜드챕스",
    subTitle: "밴드동아리",
    official: false,
    include: "경북대",
  },
  {
    imgUrl: "/KERT.png",
    title: "KERT2",
    subTitle: "보안 싸개",
    official: true,
    include: "경북대",
  },
  {
    imgUrl: "/KERT.png",
    title: "KERT",
    subTitle:
      "컴퓨터보안, 해킹을 연구하는 정보보안연구회입니다~!",
    official: true,
    include: "경북대학교",
  },
  {
    imgUrl: "/L&C.jpeg",
    title: "L&C",
    subTitle: "봉사&교육동아리",
    official: true,
    include: "경북",
  },
  {
    imgUrl: "/knu-likelion.png",
    title: "멋쟁이 사자처럼",
    subTitle:
      "전공자와 비전공자가 함께하는 웹개발 동아리입니다~!!",
    official: true,
    include: "민족 경북대학교",
  },
];

const clubTagList: Record<string, number> = {};

clubList.map((club) => {
  if (!clubTagList[club.include]) {
    clubTagList[club.include] = 1;
    console.log("0");
  } else {
    clubTagList[club.include] += 1;
  }
});

const ClubItemComponent = ({
  imgUrl,
  title,
  subTitle,
  official = false,
}: Partial<ClubInfo>) => {
  return (
    <div className="mx-4 flex cursor-pointer flex-row items-center space-x-4 rounded-md p-4 transition-colors duration-200 hover:bg-gray-200">
      <div className="relative aspect-square w-12">
        <Image
          src={imgUrl!}
          alt={`${title} preview`}
          layout="fill"
          className="h-full w-full rounded-full object-cover"
        />
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row items-center gap-[3px]">
          <span className="text-lg font-semibold text-gray-800">
            {title}
          </span>
          {official ? (
            <div className="relative aspect-square w-4">
              <Image
                src={`/official.png`}
                alt={`${title} oficial preview`}
                layout="fill"
                className="h-full w-full rounded-full object-cover"
              />
            </div>
          ) : null}
        </div>
        <span className="text-md text-gray-400">{subTitle}</span>
      </div>
    </div>
  );
};

interface TagComponentProps {
  keyWord: string;
  count: number;
}

const TagComponent = ({ keyWord, count }: TagComponentProps) => {
  return (
    <div className="flex flex-row items-center space-x-4">
      <div className="relative aspect-square w-16">
        <Image
          src={`/hashtag.png`}
          alt={`hashtag preview`}
          layout="fill"
          className="h-full w-full rounded-full object-contain"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-semibold text-gray-800">
          {keyWord}
        </span>
        <span className="text-md text-gray-300">
          {count}개의 내역
        </span>
      </div>
    </div>
  );
};

export interface SearchForm {
  search: string;
}

const Search = () => {
  const [selectedType, setSelectedType] = useState<string>(
    menuType[0]
  );
  const [filteredClubList, setFilteredClubList] = useState<
    ClubInfo[]
  >([]);

  const { register, handleSubmit } = useForm<SearchForm>();

  const onValid: SubmitHandler<SearchForm> = (
    validSearchData
  ) => {
    // 동아리 검색

    setFilteredClubList([
      ...clubList.filter((club) =>
        club.include.includes(validSearchData.search)
      ),
    ]);
  };

  return (
    <Layout hasTabBar canGoBack seoTitle="search | Monegement">
      <SearchBar_
        register={register("search", { required: false })}
        handleSubmit={handleSubmit}
        onValid={onValid}
      />
      <div className="flex flex-col ">
        <div className="m-8 flex flex-row space-x-6">
          {menuType.map((menu, index) => (
            <MenuSelectComponent
              selected={!!(selectedType === menu)}
              menu={menu}
              onClick={() => {
                setSelectedType(menuType[index]);
              }}
              key={index}
            />
          ))}
        </div>
        {selectedType === menuType[0] ? (
          <div className="ml-8">
            <span className="text-xl font-bold">
              지금 핫한 키워드
            </span>
            <div className="mt-8 flex flex-col space-y-6">
              {Object.keys(clubTagList).map((keyWord, index) => {
                return (
                  <TagComponent
                    keyWord={keyWord}
                    count={clubTagList[keyWord]}
                    key={index}
                  />
                );
              })}
            </div>
          </div>
        ) : null}
        {selectedType === menuType[1] ? (
          <div className="flex flex-col space-y-4">
            {filteredClubList.map(
              ({ imgUrl, title, subTitle, official }, index) => {
                return (
                  <ClubItemComponent
                    imgUrl={imgUrl}
                    title={title}
                    subTitle={subTitle}
                    official={official}
                    key={index}
                  />
                );
              }
            )}
          </div>
        ) : null}
      </div>
    </Layout>
  );
};

export default Search;
