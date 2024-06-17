import React from 'react';
import '../style/BlogCard.css';
import { useNavigate } from 'react-router-dom';
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from 'axios';
import toast from 'react-hot-toast';

function BlogCard({ title, description, image, username, time, id, isUser }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/editblog/${id}`);
  }

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`/api/blogs/deleteblog/${id}`);
      if (data.success) {
        toast.success("Deleted successfully");
        window.location.reload();
      } else {
        console.log("Delete operation failed:", data.message);
      }
    } catch (error) {
      console.error("Error deleting blog:", error.response?.data?.message || error.message);
      alert("Failed to delete the blog. Please try again.");
    }
  }

  return (
    <div className="blog-card">
      <img src={image} alt={title} className="blog-card-image" />
      <div className="blog-card-content">
        {isUser && (
          <div className="blog-card-actions">
            <FiEdit className="icon" onClick={handleEdit} />
            <RiDeleteBin6Line className="icon" onClick={handleDelete} />
          </div>
        )}
        <h2>{title}</h2>
        <p>{description}</p>
        <p><strong>Author:</strong> {username}</p>
        <p><strong>Posted:</strong> {new Date(time).toLocaleString()}</p>
      </div>
    </div>
  );
}

export default BlogCard;
