import { ReactNode, useState } from "react";
import ClubContext from "@components/provider/ClubContext";
import {
  selectionItem,
  club as importedClub,
} from "../../pages";

const ClubProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [club, setClub] = useState<selectionItem>(
    importedClub[0]
  );

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
