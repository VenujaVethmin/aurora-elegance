import { Router } from "express";
import {  deleteGallery, gallery, uploadImage } from "../controllers/cloudinary.controller.js";


const cloudinaryRoute = Router();

cloudinaryRoute.post("/upload", uploadImage);
cloudinaryRoute.get("/gallery", gallery);
cloudinaryRoute.delete("/deleteGallery/:id", deleteGallery);



export default cloudinaryRoute;
