// COMPONENTS
import { Typography, Stack, Box } from "@mui/material";
import AnimateWrapper from '../Animation/AnimateWrapper';


const PageNotFound = () => {
    return ( 
        <Box sx={{width: '100%', overflow: 'hidden'}}>
            <AnimateWrapper direction="left">
                <Stack sx={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100vh',

                }}>
                    <Typography variant="h1" gutterBottom>
                        Page Not Found
                    </Typography>
                </Stack>
            </AnimateWrapper>
        </Box>
        
        
     );
}
 
export default PageNotFound;