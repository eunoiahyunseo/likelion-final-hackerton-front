import React, { useState } from "react";
import Layout from "@components/layout";
import Image from "next/image";
import { cls } from "@libs/client/utils";
import client from "@libs/client/client";
import { Chat, Club, Post } from "@prisma/client";
import { NextPage } from "next";
import useSWR from "swr";
import moment from "moment";
import Link from "next/link";

type ItemType = "board" | "chat";

interface PostProps extends Post {
  club: Partial<Club>;
  _count: {
    answers: number;
  };
}

interface ChatsWithClub extends Chat {
  Club: Partial<Club>;
}

interface ChatListResponse {
  ok: true;
  chats: ChatsWithClub[];
}

const Board: NextPage<{ posts: PostProps[] }> = ({ posts }) => {
  const [selectedItem, setSelectedItem] =
    useState<ItemType>("board");

  const { data: chatList, mutate } =
    useSWR<ChatListResponse>("/api/chats");

  return (
    <Layout hasTabBar canGoBack seoTitle="board | Monegement">
      <div>
        <div className="flex flex-row pt-8">
          <div
            className={cls(
              "flex flex-grow cursor-pointer justify-center border-b-2 pb-2",
              selectedItem === "board"
                ? "border-orange-400"
                : "border-gray-300"
            )}
            onClick={() => setSelectedItem("board")}
          >
            <span
              className={cls(
                "text-lg font-semibold text-gray-500",
                selectedItem === "board"
                  ? "text-black"
                  : "text-gray-500"
              )}
            >
              게시판
            </span>
          </div>
          <div
            className={cls(
              "flex flex-grow cursor-pointer justify-center border-b-2 pb-2",
              selectedItem === "chat"
                ? "border-orange-400 "
                : "border-gray-300"
            )}
            onClick={() => setSelectedItem("chat")}
          >
            <span
              className={cls(
                "text-lg font-semibold ",
                selectedItem === "chat"
                  ? "text-black"
                  : "text-gray-500"
              )}
            >
              채팅
            </span>
          </div>
        </div>
        {selectedItem === "board" ? (
          <div className="flex flex-col space-y-4">
            {posts.map(
              (
                {
                  title,
                  question,
                  solve,
                  createdAt,
                  club: { id, name },
                  _count: { answers },
                },
                index
              ) => {
                return (
                  <div
                    key={index}
                    className="m-2 border-b-2 border-gray-200 px-2 py-3"
                  >
                    <div className="flex flex-row space-x-4">
                      <span
                        className={cls(
                          "text-lg font-bold",
                          solve
                            ? "text-gray-500"
                            : "text-orange-400"
                        )}
                      >
                        {solve ? "해결" : "미해결"}
                      </span>
                      <span className="font-bold">{title}</span>
                    </div>
                    <div className="text-gray-700">
                      {question}
                    </div>
                    <div className="flex flex-row items-center justify-between text-xs text-gray-700">
                      <div>
                        <span>
                          {createdAt.toString().split("T")[0]} |
                        </span>
                        <span> {name}</span>
                      </div>
                      <div className="flex flex-row space-x-2">
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                        <span>{answers}</span>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        ) : null}

        {selectedItem === "chat" ? (
          <div className="m-8 flex flex-col space-y-2">
            {chatList &&
              chatList.chats.map((chat) => {
                return (
                  <Link
                    key={chat?.id}
                    href={`/chats/${chat?.id}`}
                  >
                    <a>
                      <div className="mt-4 flex flex-row items-center border-b-2 border-gray-200">
                        <div className="itemsc-center flex grow space-x-4 pb-4">
                          <div className="aspect-square w-14 rounded-lg bg-slate-300" />
                          <div className="flex flex-col">
                            <span className="text-lg font-semibold text-gray-600">
                              {chat?.title}
                            </span>
                            <span className="text-sm font-light text-gray-700">
                              {chat?.Club.name}
                            </span>
                          </div>
                        </div>
                        <div>
                          <span className="font-semibold">
                            {moment(chat?.createdAt).format(
                              "YYYY-MM-DD"
                            )}
                          </span>
                        </div>
                      </div>
                    </a>
                  </Link>
                );
              })}
          </div>
        ) : null}
      </div>
    </Layout>
  );
};

// on-Demand Incremental getStaticProps
export async function getStaticProps() {
  console.log("BUILDING COMUNITY STATICALLY");
  // post를 불러올 때, Post를 작성한 동아리 정보, answer의 수를 같이 잡아와야 한다.
  const posts = await client.post.findMany({
    include: {
      club: {
        select: {
          id: true,
          name: true,
        },
      },
      _count: {
        select: {
          answers: true,
        },
      },
    },
  });
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
    // revalidate: 20,
  };
}

export default Board;
