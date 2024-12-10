import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Card, CardContent } from "@mui/material";
import Grid from "@mui/material/Grid2";
import OpenInBrowserOutlinedIcon from '@mui/icons-material/OpenInBrowserOutlined';

const HomePage = () => {
    const navigate = useNavigate();

    // Get user role from session storage
    const userRole = sessionStorage.getItem("role");

    // Define available dashboards
    const accessibleDashboards = [
        { label: "Admin Dashboard", path: "/admin-home", color: "primary" },
        { label: "Vendor Dashboard", path: "/vendor-home", color: "secondary" },
        { label: "Customer Dashboard", path: "/customer-home", color: "success" },
    ];

    // Determine which dashboards to show
    const dashboards =
        userRole === "admin"
            ? accessibleDashboards
            : accessibleDashboards.filter((dashboard) => dashboard.label.toLowerCase().includes(userRole));

    return (
        <Card
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "90vh",
                backgroundColor: '#327ba8',
                backgroundPosition: "center",
                padding: 2,
                margin:2
            }}
        >
            <Typography
                variant="h2"
                sx={{
                    fontWeight: "bold",
                    color: "#fff",
                    textShadow: "2px 2px 5px rgba(0,0,0,0.7)",
                    marginBottom: 4,
                }}
            >
                Welcome to Ticket Management System
            </Typography>
            <Grid container spacing={3} justifyContent="center" sx={{ width: "100%", maxWidth: "1200px" }}>
                {dashboards.length > 0 ? (
                    dashboards.map((dashboard, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4}>
                            <Card
                                sx={{
                                    minHeight: 150,
                                    padding: 3,
                                    backgroundColor: "#ffffff",
                                    color: "#000",
                                    boxShadow: 6,
                                    "&:hover": {
                                        transform: "scale(1.02)",
                                        boxShadow: 10,
                                    },
                                    transition: "transform 0.3s ease",
                                    cursor: "pointer",
                                    margin: 2,
                                }}
                                onClick={() => navigate(dashboard.path)}
                            >
                                <CardContent
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        height: "100%",
                                    }}
                                >
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontWeight: "bold",
                                            textAlign: "center",
                                            mb:3,
                                        }}
                                    >
                                        {dashboard.label}
                                    </Typography>
                                    <OpenInBrowserOutlinedIcon sx={{ fontSize: "80px" }}/>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography
                        variant="h6"
                        sx={{
                            color: "#fff",
                            textShadow: "2px 2px 5px rgba(0,0,0,0.7)",
                            marginTop: 4,
                        }}
                    >
                        No accessible dashboards available for your role.
                    </Typography>
                )}
            </Grid>
            <Button
                variant="contained"
                color="warning"
                sx={{ marginTop: 5 }}
                onClick={() => {
                    sessionStorage.clear();
                    navigate("/login");
                }}
            >
                Logout
            </Button>
        </Card>
    );
};

export default HomePage;
