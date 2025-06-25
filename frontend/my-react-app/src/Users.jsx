import {useEffect,useState} from 'react'
import { Box, Table, TableHead, TableCell, TableContainer,Paper, Button,TableRow,TableBody} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { deleteUser,fetchUsers} from './script';
function Users() {
    const [users,setUsers]=useState([])
    const [Total,setTotal]=useState()
    const navigate=useNavigate();
    useEffect(() => {
      fetchUsers(setUsers,setTotal);
    }, []);
    
    const handleDelete=(email)=>{
      deleteUser(email, () => fetchUsers(setUsers, setTotal));
    };
    const handleEdit=(email)=>{
      navigate(`/Edit/${email}`)
    }
  return (
    <>
      <h2>Total numbers of users is {Total}</h2>
      <TableContainer component={Paper}>
        <Box display="flex" justifyContent="center" alignContent="center">
          <Table sx={{ minWidth: 700 }} maxwidth="xs">
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Password</TableCell>
                <TableCell align='center'>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user,idx) => {
                return (
                  <TableRow key={idx}>
                    <TableCell align="center">{user.Name}</TableCell>
                    <TableCell align="center">{user.Email}</TableCell>
                    <TableCell align="center">{user.Pass}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleEdit(user.Email)}
                        sx={{ marginRight: "10px" }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDelete(user.Email)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </TableContainer>
    </>
  );
}

export default Users