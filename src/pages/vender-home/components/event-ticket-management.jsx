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

const VendorTicketManagement = () => {
  const [activeVendors, setActiveVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [vendorData, setVendorData] = useState({
    vendorId: "",
    eventId: "",
    releaseRate: "",
  });

  // Fetch active vendors
  const fetchActiveVendors = async () => {
    try {
      const response = await axios.get("http://localhost:8081/vendor/list");
      setActiveVendors(response.data);
    } catch (error) {
      console.error("Error fetching active vendors:", error);
    } finally {
      setLoading(false);
    }
  };

  // Open/Close Dialog
  const handleDialogOpen = () => setOpen(true);
  const handleDialogClose = () => {
    setOpen(false);
    setVendorData({ vendorId: "", eventId: "", releaseRate: "" });
  };

  // Handle Input Change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setVendorData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Start Vendor
  const handleStartVendor = async () => {
    const { vendorId, eventId, releaseRate } = vendorData;
    if (!vendorId || !eventId || !releaseRate) {
      alert("All fields are required.");
      return;
    }
    try {
      await axios.post("http://localhost:8081/vendor/start", null, {
        params: {
          vendorId: parseInt(vendorId),
          eventId: parseInt(eventId),
          releaseRate: parseInt(releaseRate),
        },
      });
      alert("Vendor started successfully.");
      fetchActiveVendors();
      handleDialogClose();
    } catch (error) {
      console.error("Error starting vendor:", error);
      alert("Failed to start vendor. Check your input or try again.");
    }
  };

  // Stop a Specific Vendor
  const handleStopVendor = async (vendorId) => {
    try {
      await axios.delete(`http://localhost:8081/vendor/stop/${vendorId}`);
      alert(`Vendor ${vendorId} stopped successfully.`);
      fetchActiveVendors();
    } catch (error) {
      console.error(`Error stopping vendor ${vendorId}:`, error);
    }
  };

  // Stop All Vendors
  const handleStopAllVendors = async () => {
    try {
      await axios.post("http://localhost:8081/vendor/stop-all");
      alert("All vendor threads stopped.");
      fetchActiveVendors();
    } catch (error) {
      console.error("Error stopping all vendors:", error);
    }
  };

  // Fetch data on mount
  useEffect(() => {
    fetchActiveVendors();
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Active Vendors Table */}
          <Typography variant="h6" sx={{ mt: 3 }}>
            Active Vendors
          </Typography>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Vendor ID</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {activeVendors.map((vendorId) => (
                  <TableRow key={vendorId}>
                    <TableCell>{vendorId}</TableCell>
                    <TableCell>
                      <IconButton
                        color="error"
                        onClick={() => handleStopVendor(vendorId)}
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
              Start Vendor
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleStopAllVendors}>
              Stop All Vendors
            </Button>
          </Box>

          {/* Start Vendor Dialog */}
          <Dialog open={open} onClose={handleDialogClose}>
            <DialogTitle>Start Vendor</DialogTitle>
            <DialogContent>
              <TextField
                fullWidth
                margin="normal"
                label="Vendor ID"
                name="vendorId"
                value={vendorData.vendorId}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Event ID"
                name="eventId"
                value={vendorData.eventId}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Release Rate"
                name="releaseRate"
                value={vendorData.releaseRate}
                onChange={handleInputChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} color="secondary">
                Cancel
              </Button>
              <Button onClick={handleStartVendor} color="primary" variant="contained">
                Start
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Box>
  );
};

export default VendorTicketManagement;
