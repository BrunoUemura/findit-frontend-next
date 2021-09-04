import React, { useState, useEffect } from "react";
import { HeaderPage } from "../../components/HeaderPage";
import { BodyStyled } from "../../styles/components/middleSection";
import { GetServerSideProps } from "next";
import router from "next/router";
import { Authentication } from "../../api/authentication";
import api from "../../api/baseURL";
import {
  MainContainer,
  UserName,
  MessagesContainer,
  NewMessagesContainer,
} from "../../styles/pages/messages";
import { FormatDate } from "../../utils/formatDate";
import { Chats } from "../../api/chats";
import { Users } from "../../api/users";

interface IMessage {
  id: string;
  chat_id: string;
  sender_id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  res,
}) => {
  const { id } = params;
  return {
    props: { id },
  };
};

export default function MessagesDetails({ id }) {
  const [myId, setMyId] = useState<string>("");
  const [state, setState] = useState({
    data: null,
    error: false,
    loading: true,
  });
  const [userID, setUserID] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [messages, setMessages] = useState<Array<IMessage>>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  useEffect(() => {
    const token: string = localStorage.getItem("token");
    const authenticatedID: string = Authentication.checkUserSession("");
    setMyId(authenticatedID);
    getUserName();

    const intervalId = setInterval(() => {
      setState((state) => ({ data: state.data, error: false, loading: true }));
      api
        .get(`/api/chat/messages/${id}`, {
          headers: {
            authorization: token,
          },
        })
        .then(({ data }) => {
          setMessages(data);
        })
        .then((newData) =>
          setState({ data: newData, error: false, loading: false })
        )
        .catch(function (error) {
          console.log(error);
          setState({ data: null, error: true, loading: false });
        });
    }, 1000);
    return () => clearInterval(intervalId);
  }, [state]);

  async function getUserName(): Promise<void> {
    const token: string = localStorage.getItem("token");
    const data = await Chats.getChatByID(id, token);
    const userId = data.sender_id === myId ? data.receiver_id : data.sender_id;

    setUserID(userId);

    const user = await Users.getUserByID(userId);
    setUserName(user.name);
  }

  async function sendMessage(): Promise<void> {
    const token: string = localStorage.getItem("token");
    await Chats.sendMessage(id, myId, newMessage, token);
    setNewMessage("");
  }

  function redirectToUserProfile(userId: string): void {
    if (myId === userId) {
      router.push("/profile");
      return;
    }
    router.push(`/profile/${userId}`);
  }

  return (
    <BodyStyled>
      <HeaderPage />
      <MainContainer>
        <UserName onClick={() => redirectToUserProfile(userID)}>
          <img
            src={`${process.env.BACKEND_API}/api/users/${userID}/profile-image`}
            alt={userID}
          />
          <p>{userName}</p>
        </UserName>
        <MessagesContainer>
          {messages.map((message) =>
            myId === message.sender_id ? (
              <div key={message.id} className="iam-sender">
                <p className="message">{message.content}</p>
                <p className="message-date">
                  {FormatDate.calculateDate(message.createdAt)}
                </p>
              </div>
            ) : (
              <div key={message.id} className="iamnot-sender">
                <p className="message">{message.content}</p>
                <p className="message-date">
                  {FormatDate.calculateDate(message.createdAt)}
                </p>
              </div>
            )
          )}
        </MessagesContainer>
        <NewMessagesContainer>
          <input
            className="message-input"
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button className="send-button" onClick={sendMessage}>
            Send
          </button>
        </NewMessagesContainer>
      </MainContainer>
    </BodyStyled>
  );
}
