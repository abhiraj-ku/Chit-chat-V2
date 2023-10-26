import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import chitChatLogo from "../assets/chit-chat-logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
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

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={chitChatLogo} alt="logo" />
            <h1>Chit Chat</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Log In</button>
          <span>
            Dont have an account ? <Link to="/register">Create One.</Link>
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
  // background: url("data:image/svg+xml;utf8,%3Csvg viewBox=%220 0 1000 1000%22 xmlns=%22http:%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cdefs%3E%3CclipPath id=%22b%22%3E%3Cpath fill=%22currentColor%22 d=%22M625 716.5Q250 933 250 500t375-216.5q375 216.5 0 433Z%22%2F%3E%3C%2FclipPath%3E%3Cfilter id=%22a%22 x=%22-50vw%22 y=%22-50vh%22 width=%22100vw%22 height=%22100vh%22%3E%3CfeFlood flood-color=%22%23fff%22 result=%22neutral-gray%22%2F%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%222.5%22 numOctaves=%22100%22 stitchTiles=%22stitch%22 result=%22noise%22%2F%3E%3CfeColorMatrix in=%22noise%22 type=%22saturate%22 values=%220%22 result=%22destaturatedNoise%22%2F%3E%3CfeComponentTransfer in=%22desaturatedNoise%22 result=%22theNoise%22%3E%3CfeFuncA type=%22table%22 tableValues=%220 0 0.3 0%22%2F%3E%3C%2FfeComponentTransfer%3E%3CfeBlend in=%22SourceGraphic%22 in2=%22theNoise%22 mode=%22soft-light%22 result=%22noisy-image%22%2F%3E%3C%2Ffilter%3E%3C%2Fdefs%3E%3Cg filter=%22url(%23a)%22 clip-path=%22url(%23b)%22%3E%3Cpath fill=%22%23f74555%22 d=%22M625 716.5Q250 933 250 500t375-216.5q375 216.5 0 433Z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E");
  // background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  .brand {
    display: flex;
    align-items: center;
    jus
    gap: 1.2rem;
    justify-content:center;
    h1 {
      font-size: 2.5rem;
      color: black;
      text-transform: uppercase;
      letter-spacing: 2px;
      text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.3);
      margin-bottom: 1rem;
    }
    img {
      width: 90px;
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
      color: #fff;
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
