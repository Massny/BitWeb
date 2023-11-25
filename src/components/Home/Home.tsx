// COMPONENTS
import { Paper, Box, Button, Typography, Stack, Container } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import AnimationWrapper from "../Animation/AnimationWrapper";

// TECHNICAL
import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from 'react-router-dom'

// TYPES
import { NobelData, LangOutletContext } from "../Types/NobelTypes";

// FLAVOUR TEXTS
import { HomeFlavour } from "../FlavourTexts/FlavourTexts";
const { welcomeFlavour, textFlavour, searchFlavour, yearFlavour  } = HomeFlavour


const Home = () => {

    // Hooks 
    const [year, setYear] = useState('');
    const [yearFetched, setYearFetched] = useState<string[] | null>(null)
    const { lang } = useOutletContext<LangOutletContext>();
    const navigate = useNavigate();

    // Handlers
    const handleSelectChange = (event: SelectChangeEvent) => {
        setYear(event.target.value as string);
    };

    const handleSubmit = () => {
        navigate(`/nagrody/${lang}/${year}`)
    }

    // UseEffects
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.nobelprize.org/2.1/nobelPrizes');
                const data = await response.json();
                const yearFetchedSet: Set<string> = new Set();
                // No need for additional sorting, because data already sorted after fetch
                data.nobelPrizes.forEach((item: NobelData) => {
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
            <Box style={{ width: '100%' }}>
                <Stack
                    direction='column'
                    spacing={2}
                    sx={{
                        justifyContent: "center",
                        alignItems: "center",
                        overflowX: 'hidden',
                        height: '100vh'
                    }}
                >
                    <Container maxWidth='sm'>
                        <AnimationWrapper direction="right">
                            <Paper
                                elevation={3}
                                sx={{
                                    height: 'fit-content',
                                    borderRadius: '10px',
                                    border: (theme) => (`solid 0.5px ${theme.palette.grey[800]}`),
                                    padding: '3rem'
                                }}>
                                <Stack direction='column' sx={{ height: '100%' }} spacing={8}>

                                    <Box>
                                        <Typography gutterBottom variant="h3" component='h1' textAlign="center">
                                            {welcomeFlavour[lang]}
                                        </Typography>
                                        <Typography variant="subtitle1" component='div' textAlign="center">
                                            {textFlavour[lang]}
                                        </Typography>
                                    </Box>

                                    <FormControl sx={{ height: '100%' }}>
                                        {/* Spacing on stack breaks select label */}
                                        <Stack direction="column" sx={{ alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>

                                            <InputLabel id="select-year">{yearFlavour[lang]}</InputLabel>

                                            <Select
                                                fullWidth
                                                labelId="select-year"
                                                id="select-year"
                                                value={year}
                                                label="Year"
                                                onChange={handleSelectChange}
                                                sx={{ marginBottom: "30px" }}
                                            >
                                                {
                                                    yearFetched?.map((item, index) => (
                                                        <MenuItem key={index} value={item}><span>{item}</span></MenuItem>
                                                    ))
                                                }

                                            </Select>

                                            <Button fullWidth variant="contained" size="large" disabled={year === ''} onClick={handleSubmit}>
                                                {searchFlavour[lang]}
                                            </Button>
                                        </Stack>
                                    </FormControl>

                                </Stack>
                            </Paper>
                        </AnimationWrapper>
                    </Container>
                </Stack>
            </Box>
        </>

    );
}

export default Home;