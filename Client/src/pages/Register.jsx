import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import "../index.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";

function Register() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  //handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { username, email, password, confirmPassword } = values;

      //post method
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
    }
  };

  //toast Options
  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  //handleValidation for register button
  const handleValidation = () => {
    const { username, email, password, confirmPassword } = values;
    if (password != confirmPassword) {
      toast.error("Password and confirm password should be same", toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error("username should be greater than 3 characters", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error("Password should be greater than 8 characters", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("email is required", toastOptions);
    }

    return true;
  };

  //onChange input actions
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <>
      <FormContainer>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="brand">
            {/* <img src={logo} alt="" /> */}
            <h1 className="logo">Chit Chat v2</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link to="/login">Login</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // background: linear-gradient(180deg, #0d6efd 0%, #007bff 100%);
  // background: linear-gradient(45deg, #ff6b6b 0%, #ffa07a 100%);
  // background: linear-gradient(45deg, #5e35b1 0%, #7e57c2 100%);
  // background: linear-gradient(45deg, #26a69a 0%, #00bcd4 100%);
  background: linear-gradient(180deg, #f3d2e7 0%, #f3e9e6 100%);

  padding: 1rem;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    img {
      height: 4rem;
      border: 1px solid rgba(255, 255, 255, 0.5);
      border-radius: 50%;
    }
    .logo {
      font-family: "Arial", sans-serif; /* Choose a modern font */
      font-size: 2.5rem;
      color: #0d6efd; /* Choose a modern, contrasting color */
      text-transform: uppercase;
      letter-spacing: 2px;
      text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.3); /* Adds a subtle shadow */
      margin-bottom: 1rem; /* Adjust as needed */
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.4);
    border-radius: 10px;
    padding: 2rem;
    backdrop-filter: blur(10px);
    width: 100%;
    max-width: 400px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);
  }

  input {
    padding: 1rem;
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.4);
    border-radius: 5px;
    font-size: 1rem;
    color: #333;
    &:focus {
      border: 1px solid #0d6efd;
      outline: none;
    }
  }

  button {
    background: #0d6efd;
    color: white;
    padding: 1rem;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
      background: #002c91;
    }
  }

  span {
    font-size: 0.9rem;
    text-align: center;
    color: black;
    a {
      color: #0d6efd;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default Register;
