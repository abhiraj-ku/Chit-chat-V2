import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Buffer } from "buffer";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../utils/APIRoutes";
// import { useNavigate } from "react-router-dom";

//function setAvatar
export default function SetAvatar() {
  const api = `https://api.multiavatar.com`;
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatars, setSelectedAvatars] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  //toast Options
  const toastOptions = {
    position: "bottom-right",
    autoClose: 6000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  //useEffect
  useEffect(() => {
    if (!localStorage.getItem("chit-chat-user")) {
      navigate("/login");
    }
  }, []);

  //setProfile picture function
  const setProfilePicture = async () => {
    if (selectedAvatars === undefined) {
      toast.error("select a profile picture", toastOptions);
    } else {
      const user = await JSON.parse(localStorage.getItem("chit-chat-user"));
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatars],
      });
      // console.log(data);

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("chit-chat-user", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error("Error setting avatar . Please try agin", toastOptions);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = Buffer.from(image.data); // Use Buffer.from() instead
        if (image.status === 429) {
          const retryAfter = image.headers["retry-after"];
          if (retryAfter) {
            // console.log(retryAfter);
          }
        }
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  //return the component
  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick up an avatar you like</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectedAvatars === index ? "selected" : " "
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatars"
                    onClick={() => setSelectedAvatars(index)}
                  />
                </div>
              );
            })}
          </div>
          <button className="submit-btn" onClick={setProfilePicture}>
            Set as DP
          </button>
        </Container>
      )}
      <ToastContainer />
    </>
  );
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      cursor: pointer;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;
