// import React from 'react';
// import { Typography, Card } from '@mui/material';

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  IconButton,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const VendorManagement = () => {
  const [vendors, setVendors] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    username: "",
    password:"",
    email: "",
  });

  const fetchVendors = async () => {
    try {
      const response = await axios.get("http://localhost:8081/common/vendors");
      setVendors(response.data);
    } catch (error) {
      console.error("Error fetching vendors:", error);
    }
  };

  const handleDialogOpen = () => setOpen(true);
  const handleDialogClose = () => {
    setOpen(false);
    setFormData({
      userId: "",
      name: "",
      username: "",
      password:"",
      email: "",
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddVendor = async () => {
    try {
      const vendorData = {
        ...formData,
        role: "vendor",
      };
      await axios.post("http://localhost:8081/admin/add-vendor", vendorData);
      fetchVendors();
      handleDialogClose();
    } catch (error) {
      console.error("Error adding vendor:", error);
    }
  };

  // Remove a vendor
  const handleRemoveVendor = async (vendorId) => {
    try {
      await axios.delete(`http://localhost:8081/admin/remove-vendor?userId=${vendorId}`);
      fetchVendors();
    } catch (error) {
      console.error("Error removing vendor:", error);
    }
  };

  // Fetch vendors on component mount
  useEffect(() => {
    fetchVendors();
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Vendor List</Typography>
        <Tooltip title="Add Vendor">
          <Fab color="primary" onClick={handleDialogOpen}>
            <AddIcon />
          </Fab>
        </Tooltip>
      </Grid>
      <Table sx={{ mt: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vendors.map((vendor) => (
            <TableRow key={vendor.userId}>
              <TableCell>{vendor.userId}</TableCell>
              <TableCell>{vendor.name}</TableCell>
              <TableCell>{vendor.username}</TableCell>
              <TableCell>{vendor.email}</TableCell>
              <TableCell>
                <Tooltip title="Remove Vendor">
                  <IconButton
                    color="error"
                    onClick={() => handleRemoveVendor(vendor.userId)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add Vendor Dialog */}
      <Dialog open={open} onClose={handleDialogClose}>
        <DialogTitle>Add Vendor</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Vendor Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddVendor} color="primary" variant="contained">
            Add Vendor
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default VendorManagement;
