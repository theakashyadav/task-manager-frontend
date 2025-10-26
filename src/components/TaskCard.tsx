import React from 'react';
import { Card, CardContent, Typography, CardActions, Button, Box, Chip } from '@mui/material';
import api from '../api/axios';

export default function TaskCard({ task, onEdit, onDeleted }: any) {
  const userStr = localStorage.getItem('tm_user');
  const user = userStr ? JSON.parse(userStr) : null;
  const isAdmin = user?.role === 'admin';

  const remove = async () => {
    if (!confirm('Delete this task?')) return;
    await api.delete(`/tasks/${task._id}`);
    onDeleted?.();
  };

  return (
    <Card sx={{ borderRadius: 2, boxShadow: 3, '&:hover': { boxShadow: 6 } }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>{task.title}</Typography>
        <Typography variant="body2" sx={{ mb:1 }}>{task.description}</Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Chip 
            label={task.status} 
            color={task.status === 'completed' ? 'success' : 'warning'} 
            size="small" 
          />
          <Typography variant="caption">{new Date(task.createdAt).toLocaleString()}</Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button size="small" onClick={()=>onEdit(task)}>Edit</Button>
        {isAdmin && <Button size="small" color="error" onClick={remove}>Delete</Button>}
      </CardActions>
    </Card>
  );
}
