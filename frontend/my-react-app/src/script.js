import axios from "axios";
import { API_BASE_URL } from "./config";

// const API=axios.create({
//   baseURL:API_BASE_URL,
// });

export const handleSignin = async ({ Email, Pass }, navigate, setMessage) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/Signin`, {
      Email,
      Pass,
    });

    if (res.data.redirectTo === "/Users") {
      navigate("/Users");
    } else if (res.data.redirectTo === "/UserInterface") {
      navigate(`/UserInterface/${Email}`);
    }
  } catch (err) {
    console.error(err);
    setMessage(err.response.data.Message);
  }
};
export const handleSignup = async (
  { firstname, lastname, Email, Pass },
  navigate,
  setMessage
) => {
  try {
    const Name = firstname + lastname;
    const res = await axios.post(`${API_BASE_URL}/Signup`, {
      Name,
      Email,
      Pass,
    });
    if (res.data.redirectTo) {
      navigate(res.data.redirectTo);
    }
    console.log(res);
    setMessage(res.data.Message);
  } catch (err) {
    console.log(err);
    setMessage(err.response.data.Message);
  }
};

export const getUserByEmail = async (email, setUser) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/Users/${email}`);
    setUser(res.data.user);
  } catch (err) {
    console.error(err);
  }
};

export const updateUser = async (email, userData, navigate) => {
  try {
    await axios.put(`${API_BASE_URL}/Users/${email}`, userData);
    navigate("/Users");
  } catch (err) {
    console.error(err);
  }
};

export const fetchUsers = async (setUsers, setTotal) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/Users`);
    setUsers(res.data.users);
    setTotal(res.data.users.length);
  } catch (err) {
    console.error(err);
  }
};

export const deleteUser = async (email, fetchUsers) => {
  try {
    await axios.delete(`${API_BASE_URL}/${email}`);
    fetchUsers();
  } catch (err) {
    console.error(err);
  }
};
