import { Router } from "express";
import { regesterUser } from "../controllers/user.controllers.js";
import { newApi } from "../controllers/news.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";


const router=Router();
router.route("/regester").post(
   upload.fields([
      {
          name:"avatar",
          maxcount:1
      },
      {
          name:"coverimage",
          maxCount:1
      }
   ]),
   regesterUser);
router.route("/newApi").post(newApi);

export default router;