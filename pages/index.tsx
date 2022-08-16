import Layout from "@components/layout";
import FloatingButton from "@components/FloatingButton";
import {
  Dispatch,
  Fragment,
  SetStateAction,
  useState,
} from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
} from "@heroicons/react/solid";
import Image from "next/image";
import { cls } from "@libs/client/utils";
import { useClubContext } from "@components/provider/ClubContext";

interface selectionItem {
  name: string;
  [key: string]: any;
}

const club: selectionItem[] = [
  { name: "Likelion" },
  { name: "Kert" },
  { name: "L&C" },
  { name: "GET IT" },
  { name: "GET-P" },
  { name: "Gru" },
];

interface ExampleProps {
  item: selectionItem[];
  smallVersion?: boolean;
  selected: selectionItem;
  setSelected: Dispatch<SetStateAction<selectionItem>>;
}

function Example({
  item,
  smallVersion = false,
  selected,
  setSelected,
}: ExampleProps) {
  // const {}
  return (
    <div
      className={cls(
        `flex-grow-1 top-16 z-10`,
        smallVersion ? "w-50" : "w-72"
      )}
    >
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-3 pl-3 pr-10 text-center focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300">
            <span className="block truncate text-xl font-semibold text-gray-600">
              {selected.name}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {item.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active
                        ? "bg-amber-100 text-amber-900"
                        : "text-gray-900"
                    }`
                  }
                  value={person}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected
                            ? "font-medium"
                            : "font-normal"
                        }`}
                      >
                        {person.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

interface CharInfoType {
  type: string;
  value: number;
}

const ChartInfo: Partial<CharInfoType>[] = [
  {
    type: "자산",
    value: 137,
  },
  {
    type: "수입",
    value: 251,
  },
  {
    type: "지출",
    value: 114,
  },
];

const monthExpenditure: selectionItem[] = [
  { name: "1월 지출", expenditure: { total: 776300 } },
  { name: "2월 지출", expenditure: { total: 992100 } },
  { name: "3월 지출", expenditure: { total: 646100 } },
  { name: "4월 지출", expenditure: { total: 576700 } },
  { name: "5월 지출", expenditure: { total: 1076300 } },
  { name: "6월 지출", expenditure: { total: 246300 } },
  { name: "7월 지출", expenditure: { total: 186300 } },
  { name: "8월 지출", expenditure: { total: 932100 } },
  { name: "9월 지출", expenditure: { total: 611300 } },
  { name: "10월 지출", expenditure: { total: 1176300 } },
  { name: "11월 지출", expenditure: { total: 456700 } },
  { name: "12월 지출", expenditure: { total: 376100 } },
];

interface expenditureDetail {
  name: string;
  ratio: number;
  color: string;
}

const expenditureDetail: expenditureDetail[] = [
  { name: "식음료", ratio: 45, color: "bg-green-500" },
  { name: "숙박", ratio: 34, color: "bg-blue-500" },
  { name: "교통", ratio: 13, color: "bg-yellow-500" },
  { name: "교육", ratio: 5, color: "bg-indigo-500" },
];

const ChartComponent = ({
  infoIdx,
  type,
  value,
  selected,
  ...rest
}: any) => {
  return (
    <div
      className={cls(
        `h-20 w-40 cursor-pointer rounded-md border-2 px-2 py-1`,
        selected ? "border-black" : "border-gray-300"
      )}
      {...rest}
    >
      <span
        className={cls(
          `text-sm font-semibold`,
          selected ? "text-black" : "text-gray-300"
        )}
      >
        {type}
      </span>
      <div
        className={cls(
          `text-center text-xl font-bold`,
          selected ? "text-black" : "text-gray-300"
        )}
      >
        {value} 만
      </div>
    </div>
  );
};

const Home = () => {
  const [selectedClub, setSelectedClub] =
    useState<selectionItem>(club[0]);
  const [expenditure, setExpenditure] = useState<selectionItem>(
    monthExpenditure[0]
  );
  const [selectedChart, setSelectedChart] = useState<
    Partial<CharInfoType>
  >(ChartInfo[0]);

  const [totalAssets, setTotalAssets] =
    useState<number>(1373240);
  return (
    <Layout title="홈" hasTabBar seoTitle="home | Monegement">
      <div className="px-10">
        <div className="mt-2 flex items-center justify-between">
          <Example
            item={club}
            selected={selectedClub}
            setSelected={setSelectedClub}
          />
          <div className="relative top-[4px] flex cursor-pointer items-center justify-center gap-5">
            <div className="relative rounded-md p-[6px] hover:bg-gray-200">
              <Image
                src={"/calender.png"}
                width={25}
                height={25}
              />
            </div>
            <div className="relative top-[2px] cursor-pointer rounded-md p-[6px] hover:bg-gray-200">
              <Image
                src={"/hambuger.png"}
                width={25}
                height={25}
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-row items-center space-x-6">
          {ChartInfo.map(({ type, value }, infoIdx) => {
            return (
              <ChartComponent
                type={type}
                value={value}
                infoIdx={infoIdx}
                selected={!!(type === selectedChart.type)}
                onClick={() => {
                  setSelectedChart(ChartInfo[infoIdx]);
                }}
                key={infoIdx}
              />
            );
          })}
        </div>

        {selectedChart.type === "자산" ? (
          <div className="mt-8 flex flex-col items-center">
            <span className="font-semibold">
              {selectedChart.type}
            </span>
            <div className="mt-6 text-[30px] font-bold">
              {totalAssets.toLocaleString("ko-KR")} 원
            </div>
            <div className="relative mt-6 aspect-square w-full">
              <Image
                layout="fill"
                alt="graph2 props"
                src={`/graph2.png`}
                className="z-0 object-contain"
                // placeholder="blur"
              />
            </div>
          </div>
        ) : null}

        {selectedChart.type === "지출" ? (
          <div>
            <div className="mt-10 flex flex-col items-center">
              <div className="flex items-center justify-center gap-40">
                <span className="relative -right-6 text-xl font-bold text-gray-300">
                  총지출
                </span>
                <Example
                  item={monthExpenditure}
                  smallVersion
                  selected={expenditure}
                  setSelected={setExpenditure}
                />
              </div>
              <div className="mt-6 text-[30px] font-bold">
                {expenditure.expenditure.total.toLocaleString(
                  "ko-KR"
                )}{" "}
                원
              </div>
              <div className="relative mt-8 aspect-square w-3/4">
                <Image
                  layout="fill"
                  alt="graph props"
                  src={`/graph.png`}
                  className="z-0 object-contain"
                />
              </div>
            </div>
            <div className="mt-10 mb-4 space-y-4">
              {expenditureDetail.map(
                ({ name, ratio, color }, detailIdx) => {
                  return (
                    <div
                      className="flex flex-row space-x-2"
                      key={detailIdx}
                    >
                      <div
                        className={cls(
                          "mr-6 aspect-square w-6 rounded-md",
                          color
                        )}
                      />
                      <span className="font-bold">{name}</span>
                      <span className="font-semibold text-gray-300">
                        {ratio}%
                      </span>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        ) : null}

        <div className="p flex flex-col space-y-5 py-2">
          <FloatingButton href="/">
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
        </div>
      </div>
    </Layout>
  );
};

export default Home;
