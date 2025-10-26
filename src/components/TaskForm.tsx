import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  MenuItem,
} from "@mui/material";
import api from "../api/axios";

export default function TaskForm({ open, onClose, initial, onSaved }: any) {
  const [title, setTitle] = useState(initial?.title || "");
  const [desc, setDesc] = useState(initial?.description || "");
  const [status, setStatus] = useState(initial?.status || "pending");

  useEffect(() => {
    setTitle(initial?.title || "");
    setDesc(initial?.description || "");
    setStatus(initial?.status || "pending");
  }, [initial, open]);

  const save = async () => {
    if (!title) return;
    if (initial?._id) {
      await api.put(`/tasks/${initial._id}`, {
        title,
        description: desc,
        status,
      });
    } else {
      await api.post("/tasks", { title, description: desc, status });
    }
    onSaved?.();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { borderRadius: 3, p: 2 } }}
    >
      <DialogTitle>{initial?._id ? "Edit Task" : "Add Task"}</DialogTitle>
      <DialogContent>
        <TextField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          label="Title"
          fullWidth
          margin="dense"
        />
        <TextField
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          label="Description"
          fullWidth
          margin="dense"
          multiline
          rows={3}
        />
        <TextField
          select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          label="Status"
          fullWidth
          margin="dense"
        >
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={save}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
