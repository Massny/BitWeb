// COMPONENTS
import EnhancedTable from './EnhancedTable';
import { Container, Stack } from '@mui/material';

// TECHNICAL
import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'

// TYPES
import { LangOutletContext, NobelData, NobelPrizeSubset } from '../Types/NobelTypes';

const Table = () => {
  // Hooks
  const { language, year } = useParams();
  const navigate = useNavigate();
  const { lang, setLang } = useOutletContext<LangOutletContext>();
  const [nobelData, setNobelData] = useState<NobelPrizeSubset[] | null>(null)

  // Use Effects
  useEffect(() => {

    // Setting the language if user comes from "z palca"
    setLang(language === 'en' || language === 'no' || language === 'se' ? language : 'en')

    // Checking if year is provided, if not - back to the Home page
    if (!year) {
      navigate('/', { replace: true })
      return
    }

    const updateNobelData = async (nobelData: NobelPrizeSubset[] | null, year: string) => {
      try {
        const response = await fetch('https://api.nobelprize.org/2.1/nobelPrizes');
        const data = await response.json();

        const prizesByYear = data.nobelPrizes.filter(
          (prize: NobelData) => (prize.awardYear === year)
        ).map((prize: NobelData) => ({
            dateAwarded: prize.dateAwarded ?
              new Date(prize.dateAwarded).toLocaleString('pl-PL', { year: 'numeric', day: 'numeric', month: 'numeric' }) :
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

    updateNobelData(nobelData, year)
  }, [])

  return (
    <Stack direction='column' sx={{ height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
      <Container maxWidth="lg">
        {nobelData ? <EnhancedTable nobelData={nobelData} language={lang} /> : <div></div>}
      </Container>
    </Stack>

  );
}

export default Table;