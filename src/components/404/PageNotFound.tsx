// COMPONENTS
import { Typography, Stack } from "@mui/material";

const PageNotFound = () => {
    return ( 
        <div style={{ height:'100%' }}>
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
        </div>
        
        
     );
}
 
export default PageNotFound;