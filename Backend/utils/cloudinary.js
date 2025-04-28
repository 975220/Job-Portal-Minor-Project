import {v2 as cloudinary} from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
    cloud_name:"dbnac6hgo",
    api_key:"588357133749178",
    api_secret:"4tMuwuD0l_KCPmKX8E9fdo-Oudk"
});
export default cloudinary;