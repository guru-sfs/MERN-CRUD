import React from 'react'
import {useState,useEffect} from 'react';
import { useParams,useNavigate } from "react-router-dom";
import { Paper, Typography, Box, Button, Divider } from "@mui/material";
import { getUserByEmail } from './script';

function UserInterface() {
    const [user,setUser]=useState();
    const navigate=useNavigate();
    const { email } = useParams();
    useEffect(() => {
      if (!email) {
        navigate("/Signin");
        return;
      }
      getUserByEmail(email, setUser);
    }, [email, navigate]);
    if (!user) {
      return <p>Loading...</p>;
    }
  return (
    <>
      <Box display="flex" justifyContent="center" mt={4}>
        <Paper elevation={4} sx={{ padding: 4, width: 500 }}>
          <Typography variant="h5" gutterBottom>
            Welcome! {user.Name}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography>
            <strong>Email:</strong> {user.Email || ""}
          </Typography>
          <Typography>
            <strong>Phone:</strong> {user.Phone}
          </Typography>
          <Typography>
            <strong>Company:</strong> {user.Company || ""}
          </Typography>
          <Typography>
            <strong>Role:</strong> {user.Role || ""}
          </Typography>
          <Typography>
            <strong>Address:</strong> {user.Address || ""}
          </Typography>
          <Typography>
            <strong>Account Created:</strong>{" "}
            {new Date(user.createdAt).toLocaleString()}
          </Typography>
          <Typography>
            <strong>Account Updated:</strong>{" "}
            {new Date(user.updatedAt).toLocaleString()}
          </Typography>

          <Box mt={3} display="flex" justifyContent="center">
            <Button
              variant="outlined"
              color="error"
              onClick={() => navigate("/Signin")}
            >
              Logout
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
}

export default UserInterface