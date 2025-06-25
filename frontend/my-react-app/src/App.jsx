import React from "react";
import Signup from "./Signup";
import Signin from "./Signin";
import Users from './Users';
import Edit from "./Edit";
import UserInterface from "./UserInterface";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Users" element={<Users />} />
          <Route path="/Edit/:email" element={<Edit />} />
          <Route path='/UserInterface/:email' element={<UserInterface />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
