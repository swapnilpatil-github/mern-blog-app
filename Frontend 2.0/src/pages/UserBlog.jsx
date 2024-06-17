import React, { useEffect, useState } from 'react';
import BlogCard from '../component/BlogCard.jsx';
import axios from 'axios';


function UserBlog() {
  const [blogs, setBlogs] = useState([]);

  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(`/api/blogs/userblog/${id}`);
      if (data?.success) {
        setBlogs(data?.userBlog.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);

  return (
    <div>
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <BlogCard
            id={blog._id}
            isUser={true}
            key={blog._id}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            username={blog.user.username}
            time={blog.createdAt}
          />
        ))
      ) : (
       <center>
         <h1>YOU HAVEN'T CREATED ANY BLOG YET</h1>
       </center>
      )}
    </div>
  );
}

export default UserBlog;
