import React, { useEffect, useState } from "react";
import api from "../api/axios";
import {
  Container,
  Box,
  Button,
  Grid,
  Pagination,
  Typography,
  AppBar,
  Toolbar,
} from "@mui/material";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import { useThemeToggle } from "../ThemeProvider";

export default function Dashboard() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const limit = 8;
  const { toggle } = useThemeToggle();

  const load = async (p = 1) => {
    const res = await api.get(`/tasks?page=${p}&limit=${limit}`);
    setTasks(res.data.tasks || []);
    setTotal(res.data.total || 0);
    setPage(res.data.page || 1);
  };

  useEffect(() => {
    load(1);
  }, []);

  const logout = () => {
    localStorage.removeItem("tm_token");
    localStorage.removeItem("tm_user");
    window.location.href = "/signin";
  };

  return (
    <>
      <AppBar position="static" elevation={3}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Task Manager
          </Typography>
          <Button
            color="inherit"
            variant="outlined"
            size="small"
            onClick={toggle}
            sx={{ mr: 1 }}
          >
            Toggle Theme
          </Button>
          <Button
            color="inherit"
            variant="outlined"
            size="small"
            onClick={logout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 3 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          my={2}
        >
          <Typography variant="h5">Tasks</Typography>
          <Button
            variant="contained"
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
          >
            Add Task
          </Button>
        </Box>
        <Grid container spacing={3}>
          {tasks.map((t) => (
            <Grid item xs={12} md={6} lg={4} key={t._id}>
              <Box
                sx={{
                  transition: "transform 0.2s",
                  "&:hover": { transform: "translateY(-3px)" },
                }}
              >
                <TaskCard
                  task={t}
                  onEdit={(task: any) => {
                    setEditing(task);
                    setOpen(true);
                  }}
                  onDeleted={() => load(page)}
                />
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={Math.max(1, Math.ceil(total / limit))}
            page={page}
            onChange={(_, p) => load(p)}
            sx={{
              "& .Mui-selected": {
                backgroundColor: "primary.main",
                color: "#fff",
              },
            }}
          />
        </Box>

        <TaskForm
          open={open}
          initial={editing}
          onClose={() => setOpen(false)}
          onSaved={() => load(1)}
        />
      </Container>
    </>
  );
}
