import { ReactNode, useEffect, useState } from "react";
import ClubContext from "@components/provider/ClubContext";
import { Club } from "@prisma/client";
import { useRouter } from "next/router";

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
    if (typeof window !== "undefined") {
      const importedClub = localStorage.getItem("clubs");
      setClub(JSON.parse(importedClub!)[0]);
    }
  }, []);

  const value = {
    state: { club },
    actions: { setClub },
  };
  return (
    <ClubContext.Provider value={value}>
      {children}
    </ClubContext.Provider>
  );
};

export default ClubProvider;
