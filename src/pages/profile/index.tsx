import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Authentication } from "../../api/authentication";
import { Users } from "../../api/users";
import { Portfolios } from "../../api/portfolio";

import { HeaderPage } from "../../components/HeaderPage";
import { BodyStyled } from "../../styles/components/middleSection";
import {
  MainContainer,
  MainSection,
  PersonalInfo,
  AboutMe,
  Portfolio,
} from "../../styles/pages/profile";

interface UserType {
  name: string;
  email: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  occupation: string;
  about_me: string;
  user_photo: string;
}

export default function Profile() {
  const [myId, setMyId] = useState<string>("");
  const [hasPhoto, setHasPhoto] = useState<boolean>(false);
  const [profilePhoto, setProfilePhoto] = useState<string>("");
  const [user, setUser] = useState<UserType>({
    name: "",
    email: "",
    city: "",
    state: "",
    country: "",
    phone: "",
    occupation: "",
    about_me: "",
    user_photo: "",
  });
  const [workdDone, setWorkdDone] = useState(0);
  const [portfolios, setPortfolios] = useState([]);

  const hasNoPhoto = "/icons/user-icon.png";

  const divStyleHasPhoto = {
    backgroundImage: "url(" + profilePhoto + ")",
  };

  const divStyleHasNoPhoto = {
    backgroundImage: "url(" + hasNoPhoto + ")",
  };

  useEffect(() => {
    (async () => {
      const id: string = Authentication.checkUserSession("");
      const data = await Users.getUserByID(id);
      const completedServices = await Users.getUserCompletedServices(id);
      const portfolioImages = await Portfolios.getUserPortfolios(id);

      setMyId(id);
      setHasPhoto(false);
      setUser(data);
      setWorkdDone(completedServices);

      if (portfolioImages.length > 0) {
        setPortfolios(portfolioImages[0].userPortfolios);
      }

      if (data.user_photo) {
        setHasPhoto(true);
        setProfilePhoto(
          `${process.env.BACKEND_API}/api/users/${id}/profile-image`
        );
      }
    })();
  }, []);

  const setImageDescription = (alt) => {
    var my_p = document.getElementById(
      "image-description"
    ) as HTMLParagraphElement;
    return (my_p.innerHTML = alt);
  };

  const cleanImageDescription = (alt) => {
    var my_p = document.getElementById(
      "image-description"
    ) as HTMLParagraphElement;
    return (my_p.innerHTML = "");
  };

  return (
    <BodyStyled>
      <HeaderPage />
      <MainContainer>
        <MainSection>
          <div className="profile-photos">
            {hasPhoto ? (
              <div className="user-photo" style={divStyleHasPhoto}></div>
            ) : (
              <div className="user-photo" style={divStyleHasNoPhoto}></div>
            )}
            <div className="title">
              <h1>{user.name}</h1>
              <h3>{user.occupation}</h3>
              <Link href="/profile/edit">
                <a href="">
                  <img src="icons/edit-property-64.png"></img>Edit Profile
                </a>
              </Link>
            </div>
          </div>
          <PersonalInfo>
            <div>
              <p>
                <strong>Works Done: </strong>
                {workdDone}
              </p>
            </div>
            <div>
              <p>
                <strong>Local:</strong> {user.city}, {user.state} -{" "}
                {user.country}
              </p>
              <p>
                <strong>Phone:</strong> {user.phone}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
            </div>
          </PersonalInfo>

          <AboutMe>
            <h2>About me</h2>
            <p>{user.about_me}</p>
          </AboutMe>

          <Portfolio>
            <h2>Portfolio</h2>
            <div>
              {portfolios.map((portfolio) => (
                /*<img
                  className="portfolio-image"
                  key={portfolio._id}
                  src={`${process.env.BACKEND_API}/api/users/${myId}/portfolios-image/${portfolio._id}`}
                  alt={`${process.env.BACKEND_API}/api/users/${myId}/portfolios-image/${portfolio._id}`}
                />*/
                <div className="portfolio-container">
                  <div
                    className="portfolio-image"
                    style={{
                      backgroundImage: `url(${process.env.BACKEND_API}/api/users/${myId}/portfolios-image/${portfolio._id})`,
                    }}
                  ></div>
                  <p className="image-description">{`${process.env.BACKEND_API}/api/users/${myId}/portfolios-image/${portfolio._id}`}</p>
                </div>
              ))}
            </div>
          </Portfolio>
        </MainSection>
      </MainContainer>
    </BodyStyled>
  );
}
