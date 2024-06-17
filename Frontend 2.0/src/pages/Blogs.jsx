import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogCard from '../component/BlogCard.jsx';

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get('/api/blogs/allblogs');
      if (data?.success) {
        setBlogs(data.blogs);
      } else {
        setError('Failed to fetch blogs');
      }
    } catch (error) {
      setError('An error occurred while fetching blogs');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {blogs.length > 0 ? (
        blogs.map((blog) =>
          blog ? (
            <BlogCard
              key={blog._id}
              id={blog._id}
              isUser={localStorage.getItem('userId') === (blog.user?._id || '')}
              title={blog.title}
              description={blog.description}
              image={blog.image}
              username={blog.user?.username || 'Unknown'}
              time={blog.createdAt}
            />
          ) : null
        )
      ) : (
        <p>No blogs available</p>
      )}
    </div>
  );
}

export default Blogs;
