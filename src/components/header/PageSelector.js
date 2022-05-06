import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { theme } from 'styles/Theme.js';
import { ThemeProvider } from '@emotion/react';

function PageSelector(props) {
    return(
        <Box>
            <ThemeProvider theme={theme}>
                <Tabs value={props.page} onChange={(e, newPageNum) => props.onPageChange(newPageNum)}>
                    <Tab label="About" />
                    <Tab label="Vault" />
                    <Tab label="Contact" />
                </Tabs>
            </ThemeProvider>
        </Box>
    );
}

export default PageSelector;