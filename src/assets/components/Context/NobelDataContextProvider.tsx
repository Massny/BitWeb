import { useContext, useState } from 'react'
import { createContext } from "react";

interface NobelData {
  awardYear: string;
  category: {
    en: string;
    no: string;
    se: string;
  };
  categoryFullName: {
    en: string;
    no: string;
    se: string;
  };
  dateAwarded: string;
  prizeAmount: number;
  prizeAmountAdjusted: number;
  links: {
    rel: string;
    href: string;
    action: string;
    types: string;
  }[];
  laureates: Laureate[];
}

interface Laureate {
  id: string;
  knownName: {
    en: string;
  };
  fullName: {
    en: string;
  };
  portion: string;
  sortOrder: string;
  motivation: {
    en: string;
    se?: string;
  };
  links: {
    rel: string;
    href: string;
    action: string;
    types: string;
  }[];
}

type SetNobelDataState = React.Dispatch<React.SetStateAction<NobelData[] | null>>

interface NobelDataState {
  nobelData: NobelData[] | null,
  setNobelData: SetNobelDataState;
}




interface Props {
  children: React.ReactNode
}
// Skipping the need to use null, setting the proper NobelDataState later
const NobelDataContext = createContext<NobelDataState>(null as unknown as NobelDataState);

const useNobelDataContext = () => {
  return useContext(NobelDataContext)
}

const NobelDataContextProvider = ({ children }: Props) => {
  const [nobelData, setNobelData] = useState<NobelData[] | null>(null);

  return (
    <NobelDataContext.Provider value={{ nobelData, setNobelData }}>
      {children}
    </NobelDataContext.Provider>
  );
}

const updateNobelData = async (nobelData: NobelData[] | null, setNobelData: SetNobelDataState, year: string) => {
  if(nobelData && year === nobelData[0].awardYear) return
  try{
    const response = await fetch('https://api.nobelprize.org/2.1/nobelPrizes');
    const data = await response.json();

    const prizesByYear = data.nobelPrizes.filter(
      (prize: NobelData) => prize.awardYear === year
    );
    
    setNobelData(prizesByYear)

  } catch (error) {
    console.error("Error fetching Nobel prizes:", error);
    throw error;
  }
}

export { useNobelDataContext, NobelDataContextProvider, updateNobelData }