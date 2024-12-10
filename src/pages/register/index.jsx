import React from 'react';
import { Card } from '@mui/material';
import SignUp from './components/register.jsx'
import Box from "@mui/material/Box";

const RegisterPage = () => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center", 
                mt:3
            }}
        >
            <SignUp />

        </Box>
    );
};

export default RegisterPage;

