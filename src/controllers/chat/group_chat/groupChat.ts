import { Request, Response } from "express";
import Chat from "../../../models/Chat";

/**
 *
 * @description   create group chat controller
 * @route         POST /api/v1/chats/group_chat/create_chat/:uid
 * @access        protected
 */

export const createGroupChat = async (req: Request, res: Response<any>) => {
  const { uid } = req.params;

  if (!req.body.users || !req.body.group_name) {
    return res.status(400).json({ error: "Please Fill all the feilds" });
  }

  var users = req.body.users;

  if (users.length < 2) {
    return res
      .status(400)
      .json({ error: "More than 2 users are required to form a group chat" });
  }

  users.push(uid);

  try {
    const groupChat: any = await Chat.create({
      chatName: req.body.group_name,
      group_pic: req.body.group_pic,
      users,
      isGroupChat: true,
      groupAdmin: uid,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-user_password")
      .populate("groupAdmin", "-user_password");

    res.status(200).json(fullGroupChat);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

/**
 * @description   add member to group controller
 * @route         PUT /api/v1/chats/group_chat/add_member
 * @access        protected
 */

export const addToGroup = async (
  req: Request,
  res: Response<any>
): Promise<void> => {
  const { chatId, userId }: { chatId: string; userId: string } = req.body;

  // check if the requester is admin
  const added = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-user_password")
    .populate("groupAdmin", "-user_password");

  if (!added) {
    res.status(202).json({ error: "Chat Not Found!" });
  } else {
    res.status(200).json({ successMssg: "Group member successfully added!" });
  }
};

/**
 * @description   remove member from group controller
 * @route         PUT /api/v1/chats/group_chat/remove_memberd
 * @access        protected
 */

export const removeFromGroup = async (
  req: Request,
  res: Response<any>
): Promise<void> => {
  const { chatId, userId }: { chatId: string; userId: string } = req.body;

  // check if the requester is admin

  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-user_password")
    .populate("groupAdmin", "-user_password");

  if (!removed) {
    res.status(202).json({ error: "Chat Not Found" });
  } else {
    res.status(200).json({ successMssg: "Group member successfully removed!" });
  }
};

/**
 *
 * @description   rename group name controller
 * @route         PUT /api/v1/chats/group_chat/rename_group
 * @access        protected
 */

export const renameGroup = async (
  req: Request,
  res: Response<any>
): Promise<void> => {
  const { chatId, chatName } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName: chatName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-user_password")
    .populate("groupAdmin", "-user_password");

  if (!updatedChat) {
    res.status(202).json({ error: "Chat Not Found!" });
  } else {
    res.status(200).json({ successMssg: "Group name successfully changed!" });
  }
};
