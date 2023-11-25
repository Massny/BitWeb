// COMPONENTS
import { Typography, Box } from '@mui/material';

// TYPES
import { Languages } from '../Types/NobelTypes';

interface Props {
    lang: Languages
    year: string | undefined
}

// FLAVOUR TEXTS
import { NotFoundFlavour } from '../FlavourTexts/FlavourTexts';

const { sorryFlavour, nothingFoundFlavour } = NotFoundFlavour

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