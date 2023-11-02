import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { allUsersRoute } from "../utils/APIRoutes.js";
import axios from "axios";
import Contacts from "../components/Contacts";

function Chat() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const getUserFromLocalStorage = () => {
      const user = JSON.parse(localStorage.getItem("chit-chat-user"));
      if (!user) {
        navigate("/login");
      } else {
        setCurrentUser(user);
      }
    };

    getUserFromLocalStorage();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        console.log(currentUser);
        if (currentUser.isAvatarImageSet) {
          try {
            const response = await axios.get(
              `${allUsersRoute}/${currentUser._id}`
            );
            console.log(response);
            setContacts(response);
          } catch (error) {
            console.error("Error fetching data: ", error);
          }
        } else {
          navigate("/setAvatar");
        }
      }
    };

    fetchData();
  }, [currentUser, navigate]);

  return (
    <>
      <Container>
        <div className="container">
          <Contacts contacts={contacts} currentUser={currentUser} />
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }

    @media screen and (max-width: 719px) {
      grid-template-columns: 100%;
    }
  }
`;

export default Chat;
