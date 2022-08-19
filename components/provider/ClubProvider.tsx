import {
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import ClubContext from "@components/provider/ClubContext";
import { Club } from "@prisma/client";
import { useRouter } from "next/router";
import useMutation from "@libs/client/useMutation";

const ClubProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const router = useRouter();

  // 그냥 기본값을 이걸로 설정
  const [club, setClub] = useState<Club>({
    id: 1,
    name: "",
  });

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      router?.pathname !== "/enter"
    ) {
      const importedClub = localStorage.getItem("clubs");
      setClub(JSON.parse(importedClub!)[0]);
    }
  }, []);

  const [mutation, { loading }] = useMutation(`/api/clubs`);

  // 이제 iron-session에서 session에 club을 저장하고 싶으니까 이를 핸들링하기 위한 함수를 작성해 주자
  const setClubOnSession = useCallback(
    (club: number) => {
      // if (loading) return;
      mutation({ club });
    },
    [loading, mutation]
  );

  const value = {
    state: { club },
    actions: { setClub, setClubOnSession },
  };
  return (
    <ClubContext.Provider value={value}>
      {children}
    </ClubContext.Provider>
  );
};

export default ClubProvider;
