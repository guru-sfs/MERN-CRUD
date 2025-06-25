import axios from "axios";

export const handleSignin = async ({ Email, Pass }, navigate, setMessage) => {
  try {
    const res = await axios.post("http://localhost:5000/Signin", {
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
    const res = await axios.post("http://localhost:5000/Signup", {
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
    const res = await axios.get(`http://localhost:5000/Users/${email}`);
    setUser(res.data.user);
  } catch (err) {
    console.error(err);
  }
};

export const updateUser = async (email, userData, navigate) => {
  try {
    await axios.put(`http://localhost:5000/Users/${email}`, userData);
    navigate("/Users");
  } catch (err) {
    console.error(err);
  }
};

export const fetchUsers = async (setUsers, setTotal) => {
  try {
    const res = await axios.get("http://localhost:5000/Users");
    setUsers(res.data.users);
    setTotal(res.data.users.length);
  } catch (err) {
    console.error(err);
  }
};

export const deleteUser = async (email, fetchUsers) => {
  try {
    await axios.delete(`http://localhost:5000/Users/${email}`);
    fetchUsers();
  } catch (err) {
    console.error(err);
  }
};
