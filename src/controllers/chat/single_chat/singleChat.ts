import { Request, Response } from "express";
import Chat from "../../../models/Chat";
import User from "../../../models/User";

/**
 *
 * @description  Create or fetch One to One Chat
 * @route        POST /api/v1/chats/single_chat/create_chat/:uid
 * @access       protected
 */

interface ICUser {
  _id: string;
  createdAt: string;
  updatedAt: string;
  user_email: string;
  user_name: string;
  user_pic: string;
  user_role: boolean;
  __v: number;
}

interface IOneOneChat {
  _id: string;
  chatName: string;
  createdAt: string;
  isGroupChat: boolean;
  updatedAt: string;
  groupAdmin?: ICUser;
  users: ICUser[];
  __v: number;
}

export const createChat = async (req: Request, res: Response) => {
  // id dependency
  const { user_id } = req.body;
  const { uid } = req.params;

  // validate user id
  if (!user_id) {
    return res.status(202).json({ error: "User id not sent!" });
  }

  // find chat
  var isChat: any = await Chat.find({
    isGroupChat: false,
    $and: [
      // { users: { _id: uid } },
      // { users: { _id: user_id } },
      { users: { $elemMatch: { $eq: uid } } },
      { users: { $elemMatch: { $eq: user_id } } },
    ],
  })
    .populate("users", "-user_password")
    .populate("last_message");

  isChat = await User.populate(isChat, {
    path: "last_message.sender",
    select: "user_name user_pic, user_email",
  });

  // chek is chat
  if (isChat.length > 0) {
    res.status(202).json({
      error: "Chat is already exist!",
    });
  } else {
    var chatData: any = {
      chatName: "sender",
      isGroupChat: false,
      users: [uid, user_id],
    };

    // create chat
    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({
        _id: createdChat._id,
      }).populate("users", "-user_password");

      res.status(200).json(FullChat);
    } catch (err: any) {
      res.status(202).json({ error: err.message });
    }
  }
};

/**
 *
 * @description  fetch all chats for a user
 * @route        get /api/v1/chats/single_chat/fetch_chat/:uid
 * @access       protected
 */

export const allChat = async (
  req: Request,
  res: Response<IOneOneChat[] | { error: string }>
): Promise<void> => {
  const { uid } = req.params;

  if (uid) {
    const all_chats: IOneOneChat[] | never[] | any[] = await Chat.find({
      users: { _id: uid },
    })
      .populate("users", "-user_password")
      .populate("groupAdmin", "-user_password")
      .populate("last_message")
      .sort({ updatedAt: -1 });

    if (all_chats?.length) {
      res.status(200).json(all_chats);
    }
  } else {
    res.status(400).json({ error: "User id not provided!" });
  }
};
