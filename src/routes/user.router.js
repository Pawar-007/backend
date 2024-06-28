import { Router } from "express";
import { logOutUser, regesterUser,userLogin,refreshAccessToken } from "../controllers/user.controllers.js";
import { newApi } from "../controllers/news.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";
import {verifyJwt} from "../middlewares/auth.middlewares.js";

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

router.route("/login").post(userLogin);

router.route("/logout").post(verifyJwt,logOutUser);

router.route("/refresh-token").post(refreshAccessToken);

export default router;