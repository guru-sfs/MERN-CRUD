import React,{useState} from 'react'
import {Container,Box,Paper,TextField,Button,Typography} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { handleSignup } from './script';

function Signup() {
  const navigate = useNavigate();
    const goToSignin = () => {
      navigate("/Signin");
    };
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [Email, setEmail] = useState("");
    const [Pass, setPassword] = useState("");
    const [Message,setMessage]=useState("");
    const handleSubmit = (e) => {
          e.preventDefault();
          handleSignup(
            { firstname, lastname, Email, Pass },
            navigate,
            setMessage
          );
        }
  return (
    <>
      <Container maxWidth="xs" display="flex" >
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
                <h2>Get Started absolutely free</h2>
              </div>
              <p>
                Already have an account?
                <span
                  style={{ color: "Green", textDecoration: "none" }}
                  onClick={goToSignin}
                >
                  Sign in
                </span>
              </p>
            </Box>
            <Box display="flex" flexDirection="columns" style={{ gap: 10 }}>
              <TextField
                label="First Name"
                variant="outlined"
                margin="normal"
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
                style={{ width: "49%" }}
              ></TextField>
              <TextField
                label="Last Name"
                variant="outlined"
                margin="normal"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
                style={{ width: "49%" }}
              ></TextField>
            </Box>
            <TextField
              label="Email address"
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
              </Typography>)}
            <Button
              variant="contained"
              color="primary"
              type='submit'
              //onClick={goToSignin}
              style={{
                width: "100%",
                marginTop: "4%",
                color: "White",
                background: "black",
                borderRadius: "8px",
              }}
            >
              Create Account
            </Button>
          </form>
          <p>
            By signing up, I agree{" "}
            <a href="#" style={{ color: "black" }}>
              Terms of service
            </a>{" "}
            and{" "}
            <a href="#" style={{ color: "black" }}>
              Privacy Policy
            </a>
          </p>
        </Paper>
      </Container>
    </>
  );
}
export default Signup