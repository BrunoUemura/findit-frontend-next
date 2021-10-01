import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { HeaderPage } from "../../../components/HeaderPage";
import { BodyStyled } from "../../../styles/components/middleSection";
import {
  MainContainer,
  Filters,
  Feed,
  Title,
} from "../../../styles/pages/posts";
import { FormatDate } from "../../../utils/formatDate";
import { Services } from "../../../api/services";
import { Categories } from "../../../api/categories";
import { Authentication } from "../../../api/authentication";

export default function Posts() {
  const router = useRouter();
  const [myId, setMyId] = useState<string>("");

  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const id: string = Authentication.checkUserSession("");
      setMyId(id);
      const data = await Services.getServiceByUserID(id);
      const allCategories = await Categories.getAllCategories();
      setCategories(allCategories);
      setPosts(data);
      setFilter(false);
      console.log(data);
    })();
  }, [filter]);

  function formatImageName(category: string): string {
    return category.replace(/ /g, "-").replace("&", "e").toLowerCase();
  }

  async function deleteService(service_id: string): Promise<void> {
    const token: string = localStorage.getItem("token");
    await Services.deleteService(service_id, token);
    document.location.reload();
  }

  return (
    <BodyStyled>
      <HeaderPage />
      <MainContainer>
        <div style={{ width: "100%", marginTop: "35px" }}>
          <h1>My posts</h1>
        </div>
        {posts.length != 0 ? (
          posts.map((post) => (
            <Feed key={post.id}>
              {categories.map((c) =>
                c.category === post.category ? (
                  <div
                    key={c.id}
                    className="category-image"
                    style={{
                      backgroundImage: `url(icons/categories/${formatImageName(
                        c.category
                      )}.png)`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                    }}
                  ></div>
                ) : (
                  <div key={c.id}></div>
                )
              )}
              <div className="category-container">
                <h2>{post.title}</h2>
                <div>
                  <div>
                    <h3>Category: {post.category}</h3>
                    <p>
                      {post.city}, {post.state} - {post.country}
                    </p>
                  </div>
                  <div>
                    <h3>R$ {post.price}</h3>
                    <p>
                      <strong>Posted by: </strong>
                      {post.user.name}
                    </p>
                  </div>
                  <div>
                    <p>{FormatDate.calculateDate(post.created_at)}</p>
                  </div>
                  <button onClick={() => router.push(`/posts/${post.id}`)}>
                    Show
                  </button>
                  <button
                    onClick={() => router.push(`/posts/my-posts/${post.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      deleteService(post.id);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </Feed>
          ))
        ) : (
          <Title>
            <h1>No service posted yet</h1>
          </Title>
        )}
      </MainContainer>
    </BodyStyled>
  );
}