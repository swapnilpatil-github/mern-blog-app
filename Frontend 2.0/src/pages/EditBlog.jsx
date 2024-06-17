import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/EditBlog.css';
import toast from 'react-hot-toast';
function EditBlog() {
  const [blog, setBlog] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    image: ''
  });

  const getBlogDetails = async () => {
    try {
      const { data } = await axios.get(`/api/blogs/getblog/${id}`);
      if (data?.success) {
        setBlog(data.blog);
        setInputs({
          title: data.blog.title,
          description: data.blog.description,
          image: data.blog.image
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/blogs/updateblog/${id}`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: blog.user // Use the original blog's user ID
      });
      if (data?.success) {
        toast.success("Blog updated successfully");
        navigate('/myblogs'); // Navigate to the user's blogs page
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogDetails();
  }, [id]);

  return (
    <div className="edit-blog-container">
      <h1>Edit Blog</h1>
      <form onSubmit={handleSubmit} className="edit-blog-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={inputs.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={inputs.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image URL</label>
          <input
            type="text"
            id="image"
            name="image"
            value={inputs.image}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="update-button">Update Blog</button>
      </form>
    </div>
  );
}

export default EditBlog;
