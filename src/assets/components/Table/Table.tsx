import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { NobelData, NobelPrizeSubset } from '../Types/NobelTypes';

import EnhancedTable from './EnhancedTable';

const Table = () => {
    const { language, year } = useParams();
    const lang = language === 'en' || language === 'no' || language === 'se' ? language : 'en'

    console.log(lang)

    const [nobelData, setNobelData] = useState<NobelPrizeSubset[]|null>(null)

    useEffect(() => {
        if(!year) return

        const updateNobelData = async (nobelData: NobelPrizeSubset[]|null, year:string) => {
            try{
              const response = await fetch('https://api.nobelprize.org/2.1/nobelPrizes');
              const data = await response.json();
          
              const prizesByYear = data.nobelPrizes.filter(
                (prize: NobelData) => prize.awardYear === year
              ).map((prize: NobelData) => ({
                dateAwarded: prize.dateAwarded ? 
                             new Date(prize.dateAwarded).toLocaleString('pl-PL', {year: 'numeric', day: 'numeric', month: 'numeric'}) : 
                             'Unknown',
                awardYear: prize.awardYear,
                category: prize.category,
                prizeAmount: prize.prizeAmountAdjusted.toLocaleString().replace(/,/g, ' '),
              }));
              
              setNobelData(prizesByYear)
          
            } catch (error) {
              console.error("Error fetching Nobel prizes:", error);
              throw error;
            }
          }

          updateNobelData(nobelData,year)
    }, [])

    return ( 
        <div>
            {nobelData ? <EnhancedTable nobelData={nobelData} language={lang}/> : ''}
        </div>
     );
}
 
export default Table;