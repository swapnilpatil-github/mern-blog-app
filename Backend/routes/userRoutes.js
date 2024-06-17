import express from 'express';
import { Router } from 'express';
import userControllers from '../controllers/userControllers.js';
const userRoutes = Router()

userRoutes.get("/allusers",userControllers.getAllUsers)
userRoutes.post("/register",userControllers.registerUser)
userRoutes.post("/login",userControllers.loginUser)

export default userRoutes;