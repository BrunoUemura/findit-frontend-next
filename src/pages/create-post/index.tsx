import api from "../../services/api";
import React, { useState, useEffect } from "react";
import { HeaderPage } from "../../components/HeaderPage";
import { BodyStyled } from "../../styles/components/middleSection";
import {
  MainContainer,
} from "../../styles/pages/create-post";
import authentication from "../../services/authentication";

export default function Posts() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  let id: string;

  const postService = () => {
    const token: string = localStorage.getItem("token");
    id = authentication.checkUserSession("");

    api
      .post(
        "/api/services",
        {
          user_id: id,
          title,
          category,
          description,
          price,
          city,
          state,
          country,
        },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then(({ data }) => {
        alert("Your service was posted successfully!");
      })
      .catch((err) => {
        alert(
          "Unable to post service. Check the information and try again later!"
        );
      });
  };

  useEffect(() => {
    id = authentication.checkUserSession("");
  }, []);

  return (
    <BodyStyled>
      <HeaderPage />
      <MainContainer>
        <div className="title container">
          <span>Service title*</span>
          <input
            type="text"
            name="title"
            placeholder="Web Site Development"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="category container">
          <span>Category* </span>
          <input
            type="text"
            name="service-category"
            placeholder="Software Development"
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="description container">
          <span>Description* </span>
          <textarea
            name="service-description"
            placeholder="I need a web site development for my company"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="price container">
          <span>Price* </span>
          <input
            type="number"
            name="service-price"
            placeholder="R$ 500,00"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="location container">
          <span>Location* </span>
          <div>
            <input
              type="text"
              name="service-city"
              placeholder="Campinas"
              id="city"
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              type="text"
              name="service-state"
              placeholder="SP"
              id="state"
              maxLength={2}
              onChange={(e) => setState(e.target.value.toLocaleUpperCase())}
            />
            <input
              type="text"
              name="service-country"
              placeholder="Brazil"
              id="country"
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
        </div>
        <div className="buttons  divisions">
          <button className="discart" onClick={postService}>
            Cancel
          </button>
          <button className="save" onClick={postService}>
            Post Service
          </button>
        </div>
      </MainContainer>
    </BodyStyled>
  );
}
