import { createTheme } from "@material-ui/core/styles";

export const theme = createTheme({
    palette: {
        primary: {
        light: '#5e6771',
        main: '#000000',
        dark: '#0e171f',
        contrastText: '#ffffff',
        },
        secondary: {
        light: '#63a4ff',
        main: '#ffffff',
        dark: '#004ba0',
        contrastText: '#ffffff',
        },
        background: {
        default: '#fafafa', // Make primary
        },
    },
    typography: {
        fontFamily: "'Roboto', sans-serif",
        useNextVariants: true,
        }
    }
);