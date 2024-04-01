import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const GetSingleData = () => {
  const [post, setPost] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7000/blogLy/title/${id}`
        );
        setPost(response.data);
        console.log(response.data, "dd"); // Assuming the response.data is an array of blog posts
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, [id]); // Fetch data on component mount

  return (
    <div>
      <h1>Blog Posts</h1>
      {post ? (
        <div key={post._id}>
          {/* Render post title */}
          <h2>{post.title}</h2>
          {/* Parse and render content */}
          {post.content && (
            <div>
              {JSON.parse(post.content).blocks.map((block, index) => {
                switch (block.type) {
                  case "header":
                    return <h3 key={index}>{block.data.text}</h3>;
                  case "image":
                    return (
                      <div key={index}>
                        <img
                          src={block.data.file.url}
                          alt={block.data.caption}
                        />
                        <p>{block.data.caption}</p>
                      </div>
                    );
                  case "list":
                    return (
                      <ul key={index}>
                        {block.data.items.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    );
                  case "paragraph":
                    return <p key={index}>{block.data.text}</p>;
                  default:
                    return null;
                }
              })}
            </div>
          )}
          {/* Render other post details */}
          <p>Status: {post.status}</p>
          {post.image && <img src={post.image} alt="Banner" />}
          <p>Banner Caption: {post.bannerCaption}</p>
          <p>
            Category:{" "}
            {post.categoryId?.categoryName
              ? post.categoryId.categoryName
              : null}
          </p>
          <p>
            Author: {post.authorId?.firstName} {post.authorId?.lastName}
          </p>
        </div>
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};

export default GetSingleData;
