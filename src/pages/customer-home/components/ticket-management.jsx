import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  CircularProgress,
  IconButton,
} from "@mui/material";
import StopIcon from "@mui/icons-material/Stop";
import axios from "axios";

const CustomerTicketManagement = () => {
  
  const [activeCustomers, setActiveCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [customerData, setCustomerData] = useState({
    customerId: "",
    eventId: "",
    purchaseRate: "",
  });

  // Fetch active customers
  const fetchActiveCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:8081/customer/list");
      setActiveCustomers(response.data);
    } catch (error) {
      console.error("Error fetching active customers:", error);
    } finally {
      setLoading(false);
    }
  };

  // Open/Close Dialog
  const handleDialogOpen = () => setOpen(true);
  const handleDialogClose = () => {
    setOpen(false);
    setCustomerData({ customerId: "", eventId: "", purchaseRate: "" });
  };

  // Handle Input Change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCustomerData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Start Customer
  const handleStartCustomer = async () => {
    const { customerId, eventId, purchaseRate } = customerData;
    if (!customerId || !eventId || !purchaseRate) {
      alert("All fields are required.");
      return;
    }
    try {
      await axios.post("http://localhost:8081/customer/start", null, {
        params: {
          customerId: parseInt(customerId),
          eventId: parseInt(eventId),
          purchaseRate: parseInt(purchaseRate),
        },
      });
      alert("Customer started successfully.");
      fetchActiveCustomers();
      handleDialogClose();
    } catch (error) {
      console.error("Error starting customer:", error);
      alert("Failed to start customer. Check your input or try again.");
    }
  };

  // Stop a Specific Customer
  const handleStopCustomer = async (customerId) => {
    try {
      await axios.delete(`http://localhost:8081/customer/stop/${customerId}`);
      alert(`Customer ${customerId} stopped successfully.`);
      fetchActiveCustomers();
    } catch (error) {
      console.error(`Error stopping customer ${customerId}:`, error);
    }
  };

  // Stop All Customers
  const handleStopAllCustomers = async () => {
    try {
      await axios.post("http://localhost:8081/customer/stop-all");
      alert("All customer threads stopped.");
      fetchActiveCustomers();
    } catch (error) {
      console.error("Error stopping all customers:", error);
    }
  };

  // Fetch data on mount
  useEffect(() => {
    fetchActiveCustomers();
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Active Customers Table */}
          <Typography variant="h6" sx={{ mt: 3 }}>
            Active Customers
          </Typography>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Customer ID</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {activeCustomers.map((customerId) => (
                  <TableRow key={customerId}>
                    <TableCell>{customerId}</TableCell>
                    <TableCell>
                      <IconButton
                        color="error"
                        onClick={() => handleStopCustomer(customerId)}
                      >
                        <StopIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Actions */}
          <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
            <Button variant="contained" color="primary" onClick={handleDialogOpen}>
              Start Customer
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleStopAllCustomers}>
              Stop All Customers
            </Button>
          </Box>

          {/* Start Customer Dialog */}
          <Dialog open={open} onClose={handleDialogClose}>
            <DialogTitle>Start Customer</DialogTitle>
            <DialogContent>
              <TextField
                fullWidth
                margin="normal"
                label="Customer ID"
                name="customerId"
                value={customerData.customerId}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Event ID"
                name="eventId"
                value={customerData.eventId}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Purchase Rate"
                name="purchaseRate"
                value={customerData.purchaseRate}
                onChange={handleInputChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} color="secondary">
                Cancel
              </Button>
              <Button onClick={handleStartCustomer} color="primary" variant="contained">
                Start
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Box>
  );
};

export default CustomerTicketManagement;
