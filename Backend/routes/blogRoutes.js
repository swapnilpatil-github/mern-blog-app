import {Router} from 'express'
import blogControllers from '../controllers/blogControllers.js'

const blogRoutes = Router()

blogRoutes.get("/allblogs",blogControllers.getAllBlogs)
blogRoutes.get("/getblog/:id",blogControllers.getBlogById)
blogRoutes.get("/userblog/:id",blogControllers.getUserBlog)
blogRoutes.post("/createblog",blogControllers.createBlog)
blogRoutes.put("/updateblog/:id",blogControllers.updateBlog)
blogRoutes.delete("/deleteblog/:id",blogControllers.deleteBlog)

export default blogRoutes;