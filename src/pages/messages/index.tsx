import router from "next/router";
import React, { useEffect, useState } from "react";
import { HeaderPage } from "../../components/HeaderPage";
import api from "../../services/api";
import authentication from "../../services/authentication";
import { BodyStyled } from "../../styles/components/middleSection";
import { MainContainer, ChatContainer } from "../../styles/pages/messages";

interface IUserInfo {
  id: string;
  name: string;
}

interface IChatRooms {
  id: string;
  sender_id: string;
  receiver_id: string;
  createdAt: string;
  updatedAt: string;
  userInfo: IUserInfo;
}

export default function Messages() {
  const [myId, setMyId] = useState<string>("");
  const [chatRoom, setChatRoom] = useState<Array<IChatRooms>>([]);

  useEffect(() => {
    const id: string = authentication.checkUserSession("");
    const token: string = localStorage.getItem("token");
    setMyId(id);

    api
      .get(`/api/chatsByUser/${id}`, {
        headers: {
          authorization: token,
        },
      })
      .then(({ data }) => {
        setChatRoom(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function lastMessage(chatId: string): string {
    const token: string = localStorage.getItem("token");
    let message: string = "Last Message";
    api
      .get(`/api/chat/messages/${chatId}`, {
        headers: {
          authorization: token,
        },
      })
      .then(({ data }) => {
        message = data[data.length - 1].content;
      })
      .catch((err) => {
        console.log(err);
      });

    return message;
  }

  function redirectToConversation(chatId: string): void {
    router.push(`/messages/${chatId}`);
  }

  return (
    <BodyStyled>
      <HeaderPage />
      <MainContainer>
        {chatRoom.map((chat) => (
          <ChatContainer
            key={chat.id}
            onClick={() => redirectToConversation(chat.id)}
          >
            <img
              src={`${process.env.BACKEND_API}/api/users/${chat.userInfo.id}/profile-image`}
              alt={chat.userInfo.id}
            />
            <div>
              <h2>{chat.userInfo.name}</h2>
              <p>{lastMessage(chat.id)}</p>
            </div>
          </ChatContainer>
        ))}
        <div></div>
      </MainContainer>
    </BodyStyled>
  );
}
