import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid2';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";


const SignInSide = () => {
  const navigate = useNavigate();

  const [account, setAccount] = React.useState({
    username: "",
    password: "",
  });

  const handleInputChange = (property, event) => {
    setAccount((prevAccount) => ({
      ...prevAccount,
      [property]: event.target.value,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
  
    try {

      const requestBody = {
        username: account.username,
        password: account.password,
      };
  
      const response = await fetch("http://localhost:8081/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
  
      const data = await response.json();
  
      if (response.ok && data.token) {
        sessionStorage.setItem("authToken", data.token);
        sessionStorage.setItem("username", account.username);
        sessionStorage.setItem("role", data.role )
        console.log(data.role)
        navigate("/home");

      } else {

        alert(data.token || "Invalid Username or Password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <Grid
      container
      component="main"
      sx={{
        height: "100vh",
        backgroundcolor: "white",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CssBaseline />
      <Grid component={Paper}
        elevation={6}
        square
        sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 3, margin: 2, 
          width: "90%",
          maxWidth: "600px", 
          maxHeight: "500px"
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={account.username}
            onChange={(event) => handleInputChange("username", event)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={account.password}
            onChange={(event) => handleInputChange("password", event)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
            sx={{
              justifyContent: "flex-start",
              width: "100%",
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 1, mb: 1 }}
            onClick={handleLogin}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          <Box mt={3}>
            <Typography variant="body2" color="textSecondary" align="center">
              {"Copyright © "}
              <Link color="inherit" href="https://voa.com/">
                VOA Developments
              </Link>{" "}
              {new Date().getFullYear()}
              {"."}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default SignInSide;