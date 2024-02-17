import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../index.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";
import chitChatLogo from "../assets/chit-chat-logo.png";

function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  //toast Options
  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  // useEffect hook for directing to particluar users login
  // useEffect(() => {
  //   if (localStorage.getItem("chit-chat-user")) {
  //     navigate("/");
  //   }
  // }, [navigate]);

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

  //handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      console.log("in validation", registerRoute);
      const { username, email, password } = values;

      //post method
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem("chit-chat-user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };

  //onChange input actions
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <>
      <FormContainer>
        <form onSubmit={(e) => handleSubmit(e)} className="magicpattern">
          <div className="small-blob"></div>
          <div className="brand">
            <img src={chitChatLogo} alt="" />
            <h1>Chit Chat</h1>
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
          <button type="submit">Get Started Now!</button>
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
  position: relative;
  margin-top: 50px;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background: url("data:image/svg+xml;utf8,%3Csvg viewBox=%220 0 1000 1000%22 xmlns=%22http:%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cdefs%3E%3CclipPath id=%22b%22%3E%3Cpath fill=%22currentColor%22 d=%22M625 716.5Q250 933 250 500t375-216.5q375 216.5 0 433Z%22%2F%3E%3C%2FclipPath%3E%3Cfilter id=%22a%22 x=%22-50vw%22 y=%22-50vh%22 width=%22100vw%22 height=%22100vh%22%3E%3CfeFlood flood-color=%22%23fff%22 result=%22neutral-gray%22%2F%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%222.5%22 numOctaves=%22100%22 stitchTiles=%22stitch%22 result=%22noise%22%2F%3E%3CfeColorMatrix in=%22noise%22 type=%22saturate%22 values=%220%22 result=%22destaturatedNoise%22%2F%3E%3CfeComponentTransfer in=%22desaturatedNoise%22 result=%22theNoise%22%3E%3CfeFuncA type=%22table%22 tableValues=%220 0 0.3 0%22%2F%3E%3C%2FfeComponentTransfer%3E%3CfeBlend in=%22SourceGraphic%22 in2=%22theNoise%22 mode=%22soft-light%22 result=%22noisy-image%22%2F%3E%3C%2Ffilter%3E%3C%2Fdefs%3E%3Cg filter=%22url(%23a)%22 clip-path=%22url(%23b)%22%3E%3Cpath fill=%22%23f74555%22 d=%22M625 716.5Q250 933 250 500t375-216.5q375 216.5 0 433Z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E");
  // background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    h1 {
      font-size: 2.5rem;
      color: #333;
      text-transform: uppercase;
      letter-spacing: 2px;
      text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.3);
      margin-bottom: 1rem;
    }
    img {
      width: 60px;
      border: 1px solid black;
      padding: 1px;
      border-radius: 50%;
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
    position: relative;

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
  }
`;

export default Register;
