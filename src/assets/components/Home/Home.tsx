import { Paper, Box, Button, Typography, Stack } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


// HOOKS
import { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom'



interface nobelPrizeEntry {
    awardYear: string
}

const languages = ['en','no','se']

const Home = () => {

    // States 
    const [year, setYear] = useState('');
    const [yearFetched, setYearFetched] = useState<string[] | null>(null)
    const [lang, setLang] = useState<string>('en');
    const navigate = useNavigate();

    // Handlers
    const handleSelectChange = (event: SelectChangeEvent) => {
        setYear(event.target.value as string);
    };

    const handleSubmit = () => {
        navigate(`/nagrody/${lang}/${year}`)
    }

    const handleChangeLang = () => {
        setLang(languages[(languages.indexOf(lang)+1)%languages.length])
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.nobelprize.org/2.1/nobelPrizes');
                const data = await response.json();
                const yearFetchedSet:Set<string> = new Set();
                //   dane posortowane, bo taka struktura danych i jest sztywno
                data.nobelPrizes.forEach((item:nobelPrizeEntry) => {
                    yearFetchedSet.add(item.awardYear)
                })
                setYearFetched(Array.from(yearFetchedSet))

            } catch (error) {
                console.error('Error fetching Years:', error);
            }
        };
        
        fetchData();
    }, [])

    return (
        <>  
            <Box>
                <Button variant="text" sx={{
                    position: "absolute",
                    top: '0px',
                    right: '0px',
                    margin: '20px',
                    aspectRatio: '1/1',
                    zIndex: 3
                }} onClick={handleChangeLang}>
                    <Typography variant="h6">{lang}</Typography>
                </Button>
            </Box>
            <Box style={{ width: '100%' }}>
                <Stack
                    direction='column'
                    spacing={2}
                    sx={{
                        justifyContent: "flex-start",
                        alignItems: "center",
                        position: 'relative',
                        overflowX: 'hidden',
                    }}
                >

                    <Box>
                        <Paper elevation={3} sx={{
                            width: '80vw',
                            height: '70vh',
                        }}>
                            <Stack direction='column' spacing={2}>
                                <Typography >Welcome</Typography>
                                <FormControl fullWidth>
                                    {/* Zmienić nazwy id */}
                                    <InputLabel id="demo-simple-select-label">Year</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={year}
                                        label="Year"
                                        onChange={handleSelectChange}
                                    >
                                        {
                                            yearFetched?.map((item,index) => (
                                                <MenuItem key={index} value={item}><span>{item}</span></MenuItem>
                                            ))
                                        }

                                    </Select>

                                    <Button variant="contained" disabled={year === ''} onClick={handleSubmit}>
                                        Wyszukaj
                                    </Button>
                                </FormControl>
                            </Stack>
                        </Paper>
                    </Box>
                </Stack>
            </Box>
        </>
        
    );
}

export default Home;