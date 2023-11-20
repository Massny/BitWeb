import { ThemeOptions, ThemeProvider, createTheme} from "@mui/material/styles";

interface childrenType {
    children: JSX.Element
}

// Create a palette first, only then create the theming for custom components
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
        // accent: {
        //     main: "#98dbff",
        //     textContrast: "#000000",
        // },
    },
});
  
const AppTheme = ( {children} : childrenType ) => {
    return ( 
        <>
            <ThemeProvider theme={theme}> {children} </ThemeProvider>
        </>

     );
}
 
export default AppTheme;