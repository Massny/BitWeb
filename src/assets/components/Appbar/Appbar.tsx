// COMPONENTS
import { Box, Button, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// TECHNICAL
import { useState } from 'react'
import { Outlet, useLocation, useNavigate } from "react-router-dom";

// TYPES
import { LangOutletContext, Languages } from "../Types/NobelTypes";


const languages:Languages[] = ['en','no','se']

const Appbar = () => {

    // States
    const [lang, setLang] = useState<Languages>('en');
    const location = useLocation();
    const navigate = useNavigate();

    // Handlers
    const handleChangeLang = () => {
        setLang(languages[(languages.indexOf(lang)+1)%languages.length])
    }

    const handleGoBack = () => {
        navigate('/')
    }

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
                
                <Button 
                    disabled={!location.pathname.includes('/nagrody')}
                    variant="text" 
                    onClick={handleGoBack} 
                    sx={{
                        position: "absolute",
                        top: '0px',
                        left: '0px',
                        margin: '20px',
                        aspectRatio: '1/1',
                        zIndex: 3
                    }}
                >
                    <ArrowBackIcon fontSize='large'/>
                </Button>    
            </Box>
            <Outlet context={{lang: lang, setLang: setLang} satisfies LangOutletContext}/>
        </>
        
     );
}
 
export default Appbar;