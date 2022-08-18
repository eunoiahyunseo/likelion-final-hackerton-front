/* eslint-disable react-hooks/exhaustive-deps */
import Layout from "@components/layout";
import Image from "next/image";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Switch } from "@headlessui/react";
import { useClubContext } from "@components/provider/ClubContext";

interface UserType {
  avatar?: string;
  name: string;
  executives: boolean;
  dues: boolean;
}
let LikelionUserList: UserType[] = [
  {
    avatar: "남궁두희",
    name: "남궁두희",
    executives: true,
    dues: true,
  },
  {
    avatar: "도선아",
    name: "도선아",
    executives: false,
    dues: true,
  },
  {
    avatar: "사공지숙",
    name: "사공지숙",
    executives: true,
    dues: false,
  },
  {
    avatar: "지헌규",
    name: "남궁두희",
    executives: false,
    dues: true,
  },
  {
    avatar: "위현서",
    name: "남궁두희",
    executives: false,
    dues: true,
  },
];

let KertUserList: UserType[] = [
  {
    avatar: "남궁두희",
    name: "남궁두희",
    executives: true,
    dues: true,
  },
  {
    avatar: "사공지숙",
    name: "사공지숙",
    executives: true,
    dues: false,
  },
  {
    avatar: "지헌규",
    name: "남궁두희",
    executives: false,
    dues: true,
  },
  {
    avatar: "위현서",
    name: "남궁두희",
    executives: false,
    dues: false,
  },
];

let UserMappingList: Record<string, any> = {
  Likelion: LikelionUserList,
  Kert: KertUserList,
};

const MemberComponent: React.FC<UserType> = ({
  avatar,
  name,
  executives,
  dues,
}) => {
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-row items-center space-x-2">
        <div className="relative aspect-square w-10">
          <Image
            alt={`${name} detail preview`}
            src={`/${avatar}.png`}
            layout="fill"
            className="object-contain"
          />
        </div>
        <span className="text-gray-800 ">{name}</span>
      </div>
      {dues ? (
        <div className="relative aspect-square w-6">
          <Image
            alt="checke image preivew"
            src={
              executives
                ? "/check-orange.png"
                : "/check-green.png"
            }
            layout="fill"
          />
        </div>
      ) : null}
    </div>
  );
};

interface ToggleProps {
  enabled: boolean;
  setEnabled: Dispatch<SetStateAction<boolean>>;
}

const Example: React.FC<ToggleProps> = ({
  enabled,
  setEnabled,
}) => {
  return (
    <div className="mr-16 mt-2 text-right">
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${enabled ? "bg-gray-600" : "bg-gray-300"}
          relative inline-flex h-[18px] w-[34px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span
          aria-hidden="true"
          className={`${
            enabled ? "translate-x-4" : "translate-x-0"
          }
            pointer-events-none inline-block aspect-square h-[15px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  );
};

const Member = () => {
  // 지금 선택된 동아리에 따라서 보여지게 해야한다.
  const {
    state: { club: selectedClub },
  } = useClubContext();

  // Server-Side에서는 당연히 selectedClub이 이상한 값이 ( Anonymous )로 나오게 된다.
  const [userList, setUserList] = useState<UserType[]>(
    selectedClub?.name
      ? UserMappingList[selectedClub?.name]
      : null
  );

  useEffect(() => {
    if (!userList && selectedClub.name) {
      // 만약 userList가 없는경우라면 업데이트 해줘야 한다.
      setUserList([...UserMappingList[selectedClub.name]]);
    }
    if (userList) {
      const executivesMember = userList.filter(
        (user) => user.executives
      );
      const defaultMember = userList.filter(
        (user) => !user.executives
      );
      setUserList([...executivesMember, ...defaultMember]);
    }
  }, [selectedClub]);

  const [showUserList, setShowUserList] =
    useState<boolean>(true);
  return (
    <Layout hasTabBar canGoBack seoTitle="search | Monegement">
      <div className="flex flex-col items-center justify-center">
        <div className="text-xl font-bold">
          {selectedClub?.name}
        </div>
        <span className="font-semibold text-gray-400">
          ({userList?.length}명)
        </span>
      </div>

      <Example
        enabled={showUserList}
        setEnabled={setShowUserList}
      />

      {showUserList ? (
        <div className="m-auto mt-8 flex w-3/4 flex-col space-y-4 transition-all duration-200">
          {userList?.map(
            ({ avatar, name, executives, dues }, index) => {
              return (
                <MemberComponent
                  key={index}
                  avatar={avatar}
                  name={name}
                  executives={executives}
                  dues={dues}
                />
              );
            }
          )}
        </div>
      ) : null}
    </Layout>
  );
};

export default Member;
