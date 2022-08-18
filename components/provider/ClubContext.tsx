import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import { Club } from "@prisma/client";

interface ClubContextType {
  state: {
    club: Club;
  };
  actions: {
    setClub: Dispatch<SetStateAction<Club>>;
  };
}

// AuthContext의 목적은 전역으로 선택한 동아리를 관리하기 위함이 크다.
const ClubContext = createContext<ClubContextType>({
  state: {
    club: {
      id: 1,
      name: "",
    },
  },
  actions: {
    setClub: () => {},
  },
});

// 자손에서 이를 통해서 전역 상태에 접근을 할 수 있게 된다.
export function useClubContext() {
  return useContext(ClubContext);
}

export default ClubContext;
