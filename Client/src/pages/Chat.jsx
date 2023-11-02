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
  // const [currentChat, setCurrentChat] = useState(undefined);

  //getting user from localStorage session
  useEffect(() => {
    if (!localStorage.getItem("chit-chat-user")) {
      navigate("/login");
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem("chit-chat-user")));
    }
  }, []);

  //api calling
  useEffect(() => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        const data = axios.get(`${allUsersRoute}/${currentUser._id}`);
        console.log(data.data);
        setContacts(data.data);
      } else {
        navigate("/setAvatar");
      }
    }
  }, []);
  const handleChatChange = (chat) => {};
  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts} currentUser={currentUser} />
      </div>
    </Container>
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
