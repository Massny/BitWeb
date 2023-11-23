// COMPONENTS
import { Typography, Box } from '@mui/material';

// TYPES
import { Languages } from '../Types/NobelTypes';

interface Props {
    lang: Languages
    year: string | undefined
}

// FLAVOUR TEXTS
const sorryFlavour = {
    en: 'Sorry, nothing there.',
    no: 'Beklager, ingenting der.',
    se: 'Tyvärr, inget där.'
};

const nothingFoundFlavour = {
    en: 'No Nobel Prizes found for the year ',
    no: 'Ingen Nobelpriser funnet for året ',
    se: 'Inga Nobelpris hittade för året '
};


const NoDataFound = ({ lang, year }: Props) => {

    return (
        <Box sx={{ width: '100%'}}>
            <Typography variant="h2" component="h1" gutterBottom textAlign='center'>
                {sorryFlavour[lang]}
            </Typography>
            <Typography variant="h6" component="p" textAlign='center'>
                {nothingFoundFlavour[lang] + ` ${year}.`}
            </Typography>
        </Box>

    )
}
export default NoDataFound