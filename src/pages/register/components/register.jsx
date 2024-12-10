import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { Card } from '@mui/material';
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: ""
    });
    const [error, setError] = useState("");

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        // Perform basic validation
        if (!formData.email || !formData.password || !formData.name || !formData.username) {
            setError("All fields are required.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8081/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert("Registration successful! Please log in.");
                navigate("/login"); // Redirect to login page
            } else {
                const data = await response.json();
                setError("Registration failed. Please try again.");
            }
        } catch (error) {
            console.error("Error during registration:", error);
            setError("Something went wrong. Please try again later.");
        }
    };

    return (
        <Card component={Paper}
            elevation={3}
            sx={{
                display: "flex", flexDirection: "column", alignItems: "flex-center",
                padding: 3,
                width: "100%",
                maxWidth: "600px",
                maxHeight: "700px",
            }}
        >

            <CssBaseline />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    border: "none",
                    outline: "none",
                }}
            >
                <Avatar sx={{ bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ mt: 3 }}
                >
                    <Grid container spacing={2}>
                        <TextField
                            autoComplete="given-name"
                            name="name"
                            variant="outlined"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            autoFocus
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="username"
                            label="User Name"
                            name="username"
                            autoComplete="username"
                            value={formData.username}
                            onChange={handleInputChange}
                        />
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                        <FormControlLabel
                            control={<Checkbox value="allowExtraEmails" color="primary" />}
                            label="I want to receive inspiration, marketing promotions and updates via email."
                        />
                    </Grid>
                    {error && (
                        <Typography color="error" sx={{ mt: 2 }}>
                            {error}
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-start">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Box mt={5}>
                <Typography variant="body2" color="textSecondary" align="center">
                    {"Copyright © "}
                    <Link color="inherit" href="https://voa.com/">
                        VOA Developments
                    </Link>{" "}
                    {new Date().getFullYear()}
                    {"."}
                </Typography>
            </Box>
        </Card>
    );
}
