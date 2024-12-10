import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  Button,
  TextField,
  Typography,
  Tooltip,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import axios from "axios";

const SystemConfig = () => {
  const [config, setConfig] = useState({
    totalTickets: 100,
    ticketReleaseRate: 5,
    customerRetrievalRate: 2,
    maxTicketCapacity: 1000,
  });
  const [originalConfig, setOriginalConfig] = useState(null);
  const [isChanged, setIsChanged] = useState(false);
  const [errors, setErrors] = useState({});

  // Fetch the current configuration
  const fetchConfiguration = async () => {
    try {
      const response = await axios.get("http://localhost:8081/config/current");
      setConfig(response.data);
      setOriginalConfig(response.data);
      setIsChanged(false);
    } catch (error) {
      console.error("Error fetching configuration:", error);
    }
  };

  // Handle input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (!/^\d*$/.test(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "Only integers are allowed" }));
      return;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    setConfig((prevConfig) => ({
      ...prevConfig,
      [name]: value ? parseInt(value, 10) : "",
    }));
    setIsChanged(true);
  };

  const handleSave = async () => {
    try {
      await axios.post("http://localhost:8081/config/save", config);
      setOriginalConfig(config);
      setIsChanged(false);
      alert("Configuration saved successfully!");
    } catch (error) {
      console.error("Error saving configuration:", error);
    }
  };

  const handleReset = () => {
    if (originalConfig) {
      setConfig(originalConfig);
      setIsChanged(false);
    }
  };

  useEffect(() => {
    fetchConfiguration();
  }, []);

  return (
    <Card sx={{mt:2, p:3}}>
    <Box sx={{ p: 2 }}>
      <Typography variant="b2" sx={{ mb: 2 }}>
        If want to change the configuration parameters change numbers and save.
      </Typography>
      <Box container spacing={3} sx={{display: "flex", justifyContent: "space-between", mt: 4 }}>
        {/* Each parameter as a TextField */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Total Tickets"
            name="totalTickets"
            value={config.totalTickets}
            onChange={handleInputChange}
            error={!!errors.totalTickets}
            helperText={errors.totalTickets}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Release Rate"
            name="releaseRate"
            value={config.ticketReleaseRate}
            onChange={handleInputChange}
            error={!!errors.ticketReleaseRate}
            helperText={errors.ticketReleaseRate}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Customer Rate"
            name="customerRate"
            value={config.customerRetrievalRate}
            onChange={handleInputChange}
            error={!!errors.customerRetrievalRate}
            helperText={errors.customerRetrievalRate}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Max Ticket Capacity"
            name="maxTicketCapacity"
            value={config.maxTicketCapacity}
            onChange={handleInputChange}
            error={!!errors.maxTicketCapacity}
            helperText={errors.maxTicketCapacity}
          />
        </Grid>
      </Box>

      {/* Action Buttons */}
      <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <Button variant="outlined" color="secondary" onClick={handleReset}>
          Reset
        </Button>
        <Tooltip title={isChanged ? "" : "Make changes to enable"}>
          <span>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              disabled={!isChanged}
            >
              Save
            </Button>
          </span>
        </Tooltip>
      </Box>
    </Box>
    </Card>
  );
};

export default SystemConfig;

