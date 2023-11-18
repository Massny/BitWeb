import { ThemeOptions, ThemeProvider, createTheme} from "@mui/material/styles";

interface childrenType {
    children: JSX.Element
}

// Create a palette first, only then create the theming for custom components
const paletteTheme = createTheme({
    palette: {
        mode: 'dark',
        text: {
            primary: "#dcf2fe",
        },
        background: {
            default: "#232323",
            paper: "#232323"
        },
        primary: {
            main: "#29b1e6",
            contrastText: "#000000",
        },
        secondary: {
            main: "#02283b",
            contrastText: "#dcf2fe",
        },
        // accent: {
        //     main: "#98dbff",
        //     textContrast: "#000000",
        // },
    },
});
  


  // Add new variants or edit existing ones below (mainly for typography)
const theme = createTheme(paletteTheme as ThemeOptions, {
  typography:{
    paragraphGray:{
      fontSize: 12,
      color: paletteTheme.palette.grey[300]
    },
    paragraphError:{
      fontSize: 12,
      color: paletteTheme.palette.error.main,
      fontWeight: '400'
    }
  },
  components:{
    MuiTypography:{
      defaultProps:{
        variantMapping:{
          paragraphGray: 'p',
          paragraphError: 'p'
        }
      }
    }
  }
})
  
// Wrapped around the the entirety of the app in app.tsx file
const AppTheme = ( {children} : childrenType ) => {
    return ( 
        <>
            <ThemeProvider theme={theme}> {children} </ThemeProvider>
        </>

     );
}
 
export default AppTheme;