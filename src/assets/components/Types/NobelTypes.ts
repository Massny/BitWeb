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

interface NobelPrizeSubset {
    dateAwarded: string;
    awardYear: string;
    category: {
      en: string;
      no: string;
      se: string;
    };
    prizeAmount: number;
  }

export type {NobelData, NobelPrizeSubset}
