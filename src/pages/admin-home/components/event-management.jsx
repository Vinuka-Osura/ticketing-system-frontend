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
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid2";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    eventName: "",
    description: "",
    ticketCount: 0,
  });

  // Fetch the event list
  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:8081/common/get-events");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // Open/Close the Create Event Dialog
  const handleDialogOpen = () => setOpen(true);
  const handleDialogClose = () => {
    setOpen(false);
    setFormData({
      eventName: "",
      description: "",
      ticketCount: 0,
    });
  };

  // Handle form input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Add a new event
  const handleAddEvent = async () => {
    try {
      await axios.post("http://localhost:8081/admin/create-event", formData);
      fetchEvents();
      handleDialogClose();
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  // Remove an event
  const handleRemoveEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:8081/admin/delete-event?eventId=${eventId}`);
      fetchEvents(); // Refresh event list
    } catch (error) {
      console.error("Error removing event:", error);
    }
  };

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Event List</Typography>
        <Tooltip title="Add Event">
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
            <TableCell>Description</TableCell>
            <TableCell>Ticket Count</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.eventId}>
              <TableCell>{event.eventId}</TableCell>
              <TableCell>{event.eventName}</TableCell>
              <TableCell>{event.description}</TableCell>
              <TableCell>{event.ticketCount}</TableCell>
              <TableCell>
                <Tooltip title="Remove Event">
                  <IconButton
                    color="error"
                    onClick={() => handleRemoveEvent(event.eventId)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add Event Dialog */}
      <Dialog open={open} onClose={handleDialogClose}>
        <DialogTitle>Add Event</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Event Name"
            name="eventName"
            value={formData.eventName}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Ticket Count"
            name="ticketCount"
            type="number"
            value={formData.ticketCount}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddEvent} color="primary" variant="contained">
            Add Event
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EventManagement;
