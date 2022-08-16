import { ReactNode } from "react";
import ClubContext from "@components/provider/ClubContext";

const ClubProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const value = { club: "" };

  return (
    <ClubContext.Provider value={value}>
      {children}
    </ClubContext.Provider>
  );
};

export default ClubProvider;
