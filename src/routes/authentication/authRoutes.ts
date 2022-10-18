import express from "express";
import { allUsers } from "../../controllers/authentication/allUsers";
import { updateAccInfo } from "../../controllers/authentication/updateAccInfo";
import {
  userSignin,
  userSignUp,
} from "../../controllers/authentication/userAuth";
import { isAuthentic } from "../../middleware/authentication";

const router = express.Router();

// all authentication router here
router.route("/all_users").get(allUsers);
router.route("/signup").post(userSignUp);
router.route("/signin").post(userSignin);
router.route("/update_details/:uid").put(isAuthentic, updateAccInfo);

export default router;
