import Layout from "@components/layout";
import { useCallback, useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { withSsrSession } from "@libs/server/withSession";
import client from "@libs/client/client";
import {
  DetailHashTag,
  Finance,
  FinanceDetail,
} from "@prisma/client";
import { NextPage } from "next";
import useSWR, { SWRConfig } from "swr";
import { cls } from "@libs/client/utils";
import FloatingButton from "@components/FloatingButton";

type ItemType = "calender" | "deal";

interface FinanceResponse {
  ok: true;
  finance: Partial<Finance>[];
}

interface HashTagWithFinanceDetail extends FinanceDetail {
  hashtags: DetailHashTag[];
}
interface DetailResponse extends Finance {
  FinanceDetail: HashTagWithFinanceDetail;
}
interface FinanceDetailResponse {
  ok: true;
  finance: Partial<DetailResponse>[];
}

const Calender = () => {
  const [selectedItem, setSelectedItem] =
    useState<ItemType>("calender");

  const [value, onChange] = useState(
    new Date("2022-08-19T13:11:13.677Z")
  );

  const { data } = useSWR<FinanceResponse>("/api/finance");

  const { data: detailFinanceData } =
    useSWR<FinanceDetailResponse>("/api/finance/detail");

  const [expenditure, setExpenditure] = useState<number>(0);
  const [income, setIncome] = useState<number>(0);

  const onClick = useCallback(() => setSelectedItem("deal"), []);

  useEffect(() => {
    data?.finance.map((eachValue) => {
      if (eachValue?.out) {
        setExpenditure(expenditure + eachValue.money!);
      } else {
        setIncome(income + eachValue.money!);
      }
    });
    // eslint-disable-next-line
  }, [data]);

  return (
    <Layout hasTabBar canGoBack seoTitle="calender | Monegement">
      <div className="mb-4 flex flex-row pt-8">
        <div
          className={cls(
            "flex flex-grow cursor-pointer justify-center border-b-2 pb-2",
            selectedItem === "calender"
              ? "border-orange-400"
              : "border-gray-300"
          )}
          onClick={() => setSelectedItem("calender")}
        >
          <span
            className={cls(
              "text-lg font-semibold text-gray-500",
              selectedItem === "calender"
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
            selectedItem === "deal"
              ? "border-orange-400 "
              : "border-gray-300"
          )}
          onClick={() => setSelectedItem("deal")}
        >
          <span
            className={cls(
              "text-lg font-semibold ",
              selectedItem === "deal"
                ? "text-black"
                : "text-gray-500"
            )}
          >
            채팅
          </span>
        </div>
      </div>

      <div className="mr-10 mb-10 flex flex-row items-center justify-between">
        <div className="mx-8 my-4 flex flex-col">
          <div className="flex flex-row space-x-2">
            <span className="text-lg font-bold text-gray-500">
              지출
            </span>
            <span className="text-lg font-semibold text-orange-400">
              {data &&
                data?.finance
                  .reduce(
                    (previousValue, currentValue) =>
                      currentValue.out
                        ? previousValue + currentValue.money!
                        : previousValue,
                    0
                  )
                  .toLocaleString("ko-KR")}
            </span>
          </div>
          <div className="flex flex-row space-x-2">
            <span className="text-lg font-bold text-gray-500">
              수입
            </span>
            <span className="text-lg font-semibold text-black">
              {data &&
                data?.finance
                  .reduce(
                    (previousValue, currentValue) =>
                      !currentValue.out
                        ? previousValue + currentValue.money!
                        : previousValue,
                    0
                  )
                  .toLocaleString("ko-KR")}
            </span>
          </div>
        </div>
        <button onClick={onClick}>
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
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {selectedItem === "calender" ? (
        <div>
          <Calendar
            value={value}
            onChange={onChange}
            formatDay={(locale, date) =>
              moment(date).format("DD")
            }
            minDetail="month"
            maxDetail="month"
            navigationLabel={undefined}
            showNeighboringMonth={false}
            // showNavigation={false}
            locale="ko-KR"
            className="mx-auto w-full rounded-md border-b text-sm shadow-lg"
            tileContent={({ date, view }) => {
              // 추가할 html 태그 변수 초기화
              let html: any = [];
              // 현재 날짜가 지출리스트에 있다면
              if (data) {
                data.finance.map((item) => {
                  if (
                    moment(item.createdAt).format(
                      "YYYY-MM-DD"
                    ) === moment(date).format("YYYY-MM-DD")
                  ) {
                    // 만약에 동아리의 지출이라면
                    if (item.out && item.money) {
                      html.push(
                        <div
                          className="text-xs font-semibold text-orange-400 "
                          key={new Date(
                            item.createdAt!
                          ).toISOString()}
                        >
                          -{item.money.toLocaleString("ko-KR")}
                        </div>
                      );
                    }

                    if (!item.out && item.money) {
                      html.push(
                        <div
                          className="text-xs font-semibold text-gray-600"
                          key={new Date(
                            item.createdAt!
                          ).toISOString()}
                        >
                          +{item.money.toLocaleString("ko-KR")}
                        </div>
                      );
                    }
                  }
                });
              }
              return (
                <>
                  <div
                    className="mt-2 flex flex-col items-center justify-center"
                    key={moment(date).format("YYYY-MM-DD")}
                  >
                    {html}
                  </div>
                </>
              );
            }}
          />
        </div>
      ) : null}

      {selectedItem === "deal" ? (
        <div className="mx-6 mb-8 flex flex-col space-y-4">
          {detailFinanceData &&
            detailFinanceData.finance.map((data, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col space-y-2 border-b-2 border-gray-200 pb-4"
                >
                  <span className="text-sm font-semibold text-gray-600">
                    {moment(data?.createdAt).format(
                      "YYYY-MM-DD"
                    )}
                  </span>
                  <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center space-x-2">
                      <div className="aspect-square w-12 rounded-md bg-slate-300" />
                      <div className="flex flex-col">
                        <span className="text-lg font-normal text-black">
                          {data?.FinanceDetail?.title}
                        </span>
                        <div className="flex flex-row items-center space-x-2">
                          {data?.FinanceDetail?.hashtags?.map(
                            ({ content, color }) => {
                              return (
                                <span
                                  key={`${content}-${color}`}
                                  style={{
                                    backgroundColor: color,
                                    opacity: 0.8,
                                  }}
                                  className={cls(
                                    `rounded-2xl px-2 text-xs font-semibold`
                                  )}
                                >
                                  #{content}
                                </span>
                              );
                            }
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row items-center space-x-4 pr-6">
                      <span
                        className={cls(
                          "font-bold",
                          data?.out
                            ? "text-orange-400"
                            : "text-gray-600"
                        )}
                      >
                        {data?.out
                          ? `-${data?.money?.toLocaleString(
                              "ko-KR"
                            )}`
                          : `+${data?.money?.toLocaleString(
                              "ko-KR"
                            )}`}
                      </span>
                      <div>
                        <svg
                          className="h-4 w-4 text-gray-700"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      ) : null}
      <FloatingButton href="/bill">
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </FloatingButton>
    </Layout>
  );
};

const Page: NextPage<{ finance: Partial<Finance>[] }> = ({
  finance,
}) => {
  return (
    <SWRConfig
      value={{
        fallback: {
          "/api/finance": {
            ok: true,
            finance,
          },
        },
      }}
    >
      <Calender />
    </SWRConfig>
  );
};

export const getServerSideProps = withSsrSession(
  async function ({ req }: any) {
    const finance = await client.finance.findMany({
      where: {
        clubId: req.session.club.id,
      },
      select: {
        createdAt: true,
        id: true,
        money: true,
        out: true,
      },
      take: 10,
    });

    // console.log(finance);

    return {
      props: {
        finance: JSON.parse(JSON.stringify(finance)),
      },
    };
  }
);

export default Page;

// 가상으로 지출내역을 만들어 보자
