import { ThemeProvider, createTheme} from "@mui/material/styles";

interface Props {
    children: JSX.Element
}

const theme = createTheme({
    palette: {
        mode: 'dark',
        text: {
            primary: "#ffffff",
        },
        background: {
            default: "#18191B",
            paper: "#18191B"
        },
        primary: {
            main: "#2B8CCD",
            contrastText: "#ffffff",
        },
        secondary: {
            main: "#202E36",
            contrastText: "#ffffff",
        },
    },
    typography:{
        fontFamily: [
            'Poppins',
            'Roboto'
        ].join(',')
    }
});
  
const AppTheme = ( {children} : Props ) => {
    return ( 
            <ThemeProvider theme={theme}> {children} </ThemeProvider>
     );
}
 
export default AppTheme;