import express from "express";
import {
  addToGroup,
  createGroupChat,
  removeFromGroup,
  renameGroup,
} from "../../controllers/chat/group_chat/groupChat";
import { isAuthentic } from "../../middleware/authentication";

const router = express.Router();

router.route("/create_chat/:uid").post(isAuthentic, createGroupChat);
router.route("/rename").put(isAuthentic, renameGroup);
router.route("/remove_member").put(isAuthentic, removeFromGroup);
router.route("/add_member").put(isAuthentic, addToGroup);

export default router;
