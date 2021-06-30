import axios from "axios";
import React, { useState, useEffect } from "react";
import { HeaderPage } from "../components/HeaderPage";

import { BodyStyled } from "../styles/components/middleSection";
import {
  MainContainer,
  MainSection,
  PersonalInfo,
  AboutMe,
  Portfolio,
} from "../styles/pages/profile";

interface IUser {
  name: string;
  email: string;
  location: string;
  phone: string;
  occupation: string;
  about_me: string;
  user_photo: string;
}

export default function Profile() {
  const [hasPhoto, setHasPhoto] = useState<boolean>(false);
  const [user, setUser] = useState<IUser>({
    name: "",
    email: "",
    location: "",
    phone: "",
    occupation: "",
    about_me: "",
    user_photo: "",
  });

  //
  const userId = "65c22e8a-344a-4271-a80e-31a9097b8a79";
  const userId2 = "7c6c9436-e6eb-46d4-a6e6-eea3c9d361ff";
  const userId3 = "2e0313fb-fe0f-4dfb-a3e1-df0692762973";
  const userId4 = "2a4748d1-3614-4848-be8e-25ec14cb811a";

  useEffect(() => {
    setHasPhoto(false);
    axios
      .get(`http://localhost:4000/api/users/${userId4}`)
      .then(({ data }) => {
        setUser(data);

        if (data.user_photo) {
          setHasPhoto(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <BodyStyled>
      <HeaderPage />
      <MainContainer>
        <MainSection>
          <div className="profile-photos">
            {hasPhoto ? (
              <img src={user.user_photo} alt="photo" className="user-photo"/>
            ) : (
              <img src="icons/user-icon.png" alt="photo" className="user-photo"/>
            )}
          </div>

          <div className="title">
            <h1>{user.name}</h1>
            <h3>{user.occupation}</h3>
            <a href=""><img src="icons/edit-property-64.png"></img>Edit Profile</a>
          </div>

          <PersonalInfo>
            <div>
              <p><strong>Works Done:</strong>{" "}</p>
              <p><strong>Works Done in Time:</strong>{" "}</p>
              <p><strong>Works Done Within Budget:</strong>{" "}</p>
            </div>
            <div>
              <p><strong>Local:</strong> {user.location}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
          </PersonalInfo>

          <AboutMe>
            <h2>About me</h2>
            <p>{user.about_me}</p>
          </AboutMe>

          <Portfolio>
            <h2>Portfolio</h2>
            <div>
              <div className="div-img-portifolio d01"></div>
              <div className="div-img-portifolio d02"></div>              
            </div>
          </Portfolio>
        </MainSection>
      </MainContainer>
    </BodyStyled>
  );
}
