import React, { useCallback, useEffect, useState } from "react";
import { readdirSync } from "fs";
import matter from "gray-matter";
import { NextPage } from "next";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";
import Image from "next/image";
import { useRouter } from "next/router";

interface NoticeProps {
  title: string;
  date: Date;
  img?: string;
  content: string;
  ad: boolean;
}

const Blog: NextPage<{ notices: NoticeProps[] }> = ({
  notices,
}) => {
  const router = useRouter();
  const onClick = useCallback(() => router.back(), [router]);

  const [selectedNotice, setSelectedNotice] =
    useState<boolean>(false);

  const [noticeList, setNoticeList] =
    useState<NoticeProps[]>(notices);

  return (
    <div>
      <div className="relative min-h-screen pt-4">
        <div className="relative flex flex-row  items-center justify-center text-center text-xl font-bold">
          <span>알림</span>
          <button onClick={onClick} className="absolute left-8">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </button>
        </div>
        <div className="m-8 space-y-4 pb-10">
          {noticeList.map(
            ({ title, date, img, content, ad }, index) => {
              if (selectedNotice && ad) {
                return null;
              }
              return (
                <div
                  key={index}
                  className="flex flex-row space-x-4"
                >
                  <div className="relative h-16 w-16">
                    <Image
                      src={`/${img}`}
                      alt={`${title} image preview`}
                      layout="fill"
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div className="relative top-4 flex-grow">
                    <span>{ad ? `(광고)${title}` : title}</span>
                    <div
                      className="notice-content rounded-lg bg-slate-100 py-1 px-2 shadow-md"
                      dangerouslySetInnerHTML={{
                        __html: content,
                      }}
                    />
                    <div className="mt-2 flex flex-row items-center justify-between">
                      {ad ? (
                        <span className="font-md ml-2 rounded-sm bg-slate-100 text-xs shadow-md">
                          AD
                        </span>
                      ) : (
                        <span />
                      )}
                      <span className="text-sm font-semibold text-gray-300">
                        {Math.round(
                          (new Date().getTime() -
                            new Date(date).getTime()) /
                            1000 /
                            60 /
                            60 /
                            24
                        )}
                        일 전
                      </span>
                    </div>
                  </div>
                </div>
              );
            }
          )}
          <div className="h-20 w-full" />
        </div>
        <div className="fixed inset-x-0 bottom-0 h-14 w-screen rounded-t-[30px] bg-slate-100 shadow-md">
          <div className="absolute top-2 flex w-full flex-row items-center justify-center space-x-4">
            <input
              type="checkbox"
              className="appearance-none rounded-md focus:ring-0"
              checked={selectedNotice}
              onChange={() => {
                setSelectedNotice((prev) => !prev);
              }}
            />
            <span className="text-lg font-medium text-gray-300">
              이벤트 및 광고 알림 제외하고 보기
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps(context: any) {
  const noticeList = await Promise.all(
    readdirSync("./notice").map(async (file) => {
      const { content, data } = matter.read(`./notice/${file}`);

      const { value } = await unified()
        .use(remarkParse)
        .use(remarkHtml)
        .process(content);

      return { ...data, content: value };
    })
  );

  return {
    props: {
      notices: JSON.parse(JSON.stringify(noticeList)),
    },
  };
}

export default Blog;
