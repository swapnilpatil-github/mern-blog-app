import React, { useState } from 'react'
import '../style/CreateBlog.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'
function CreateBlog() {
  const id = localStorage.getItem("userId")
  const [inputs,setInputs] = useState({
    title:'',
    description:'',
    image:''
  });
  const handleChange = (e) => {
    setInputs(prevState => ({
      ...prevState,
      [e.target.name]:e.target.value
    }) )
  }
  const navigate = useNavigate();

  const handleSubmit =async (e) => {
    e.preventDefault()
   try {
     const {data} = await axios.post("/api/blogs/createblog",{
      title:inputs.title,
      description:inputs.description,
      image:inputs.image,
      user:id
     })
     if(data?.success){
      toast.success("blog created successfully");
      navigate('/');
     }
   } catch (error) {
    console.log(error)
   }
  }

  return (
    
   <div className="create-blog-container">
      <h1>Create New Blog</h1>
      <form onSubmit={handleSubmit} className="create-blog-form">
        <div>
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
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={inputs.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
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
        <button type="submit">Create Blog</button>
      </form>
    </div>
        

  )
}

export default CreateBlog