import React, { useEffect, useState } from "react";

function AdminBlogList() {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:7000/blogLy/blog", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data, "dd");
          setBlogs(data);
        } else {
          console.log("Failed to fetch blog Data");
        }
      } catch (error) {
        console.log(error, "error");
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>Blog List</h1>
      {blogs.map((blog) => (
        <div key={blog._id}>
          <h2>
            {blog.title}
            <super>
              <div key={blog.authorId}>{blog.firstName}</div>
            </super>
          </h2>
          <h3>{blog.image}</h3>
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>
      ))}
    </div>
  );
}

export default AdminBlogList;
