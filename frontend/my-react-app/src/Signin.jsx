import React,{useState} from 'react'
import {Container,Box,Paper,TextField,Button,Typography} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { handleSignin } from './script';

function Signin() {
  const navigate = useNavigate();
  const goToSignup = () => {
    navigate("/Signup");
  }
    const [Email, setEmail] = useState("");
    const [Pass, setPassword] = useState("");
    const [Message, setMessage]=useState("");
    const handleSubmit = (e) => {
      e.preventDefault();
      handleSignin({ Email, Pass }, navigate, setMessage); 
    }
      
  return (
    <>
      <Container maxWidth="xs" display="flex">
        <Paper elevation={0}>
          <form onSubmit={handleSubmit}>
            <Box
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  width: "100%",
                }}
              >
                <h2>Sign In</h2>
              </div>
              <p>
                New User?
                <span
                  onClick={goToSignup}
                  style={{ color: "Green", textDecoration: "none" }}
                >
                  Create an account
                </span>
              </p>
            </Box>
            <TextField
              label="Email Adress"
              variant="outlined"
              margin="normal"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "100%" }}
            ></TextField>
            <TextField
              label="Password"
              variant="outlined"
              margin="normal"
              value={Pass}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%" }}
            ></TextField>
            {Message && (
              <Typography
                sx={{ mt: 2 }}
                color={Message === "Sucessful" ? "success.main" : "error"}
              >
                {Message}
              </Typography>
            )}
            <Box display="flex" justifyContent="flex-end">
              <a href="#" style={{ color: "black", marginTop: "5px" }}>
                Forgot Password?
              </a>
            </Box>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{
                width: "100%",
                marginTop: "4%",
                color: "White",
                background: "black",
                borderRadius: "8px",
              }}
            >
              Login
            </Button>
          </form>
        </Paper>
      </Container>
    </>
  );
}
export default Signin