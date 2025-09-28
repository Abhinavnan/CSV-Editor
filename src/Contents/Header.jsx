import React from 'react';
import { Typography, Box, Button, AppBar, Toolbar  } from '@mui/material';

const Header = () => {
  return (
    <Box sx={{width: '100%'}}>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h4" sx={{ flexGrow: 1 }}>
                    CSV Editor
                </Typography>
            </Toolbar>
        </AppBar>
    </Box>
  )
}

export default Header;
